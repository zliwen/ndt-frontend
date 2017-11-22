/**
* 权限管理
* Created by zhaowei on 2017/8/23.
*/
<template>
  <div class="Role">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;" type="flex" justify="end">
      <Col>
      <Button type="info" icon="plus-round" @click="edit">添加角色</Button>
      </Col>
    </Row>
    <Modal v-model="addModal"
           title="添加角色"
           :loading="addLoading"
           :mask-closable="false"
           :styles="{top: '20px'}"
           @on-ok="save"
           width="900">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
        <FormItem label="角色名称：" prop="name">
          <Input v-model="formCustom.name" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色描述：" prop="description">
          <Input type="textarea" v-model="formCustom.description" placeholder="请输入角色描述"></Input>
        </FormItem>
        <FormItem label="选择菜单：" prop="checkbox" v-if="activeEdit">
          <CheckboxGroup v-model="activeListRoles">
            <Checkbox v-for="item in allMenu" :key="item.ad_menu_id" :label="item.ad_menu_id">
              <span v-text="item.name"></span>
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Modal>
    <Table border :columns="columns1" :data="roleList"></Table>
  </div>
</template>

<script>
  import roleServer from 'rs/roleServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'Role',
    data () {
      return {
        addLoading: false,
        description: '',
        allMenu: [],
        roleList: [],
        activeListRoles: [],
        activeOldListRoles: [],
        addModal: false,
        loading: true,
        activeEdit: false,
        formCustom: {
          name: "",
          description: ""
        },
        ruleCustom: {
          name: [
            {required: true, message: '角色名不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '描述不能为空', trigger: 'blur'}
          ]
        },
        columns1: [
          {
            title: '角色名称',
            key: 'name'
          },
          {
            title: '创建时间',
            render: (h, params) => {
              return h('span', formatDate(params.row.created));
            }
          },
          {
            title: '角色描述',
            key: 'description'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'close'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      }
    },
    created: function () {
      this.getDataList();
      //获取所有的菜单
      roleServer.getAllMenu({}, {}, result => {
        if (result.code !== "1") {
          this.$Message.success('获取菜单失败');
        }
        result.data.forEach(function (obj) {
          obj.selected = false
        });
        this.allMenu = result.data;
      })
    },
    watch: {
      allMenu: {
        deep: true,
        handler: function (val, oldVal) { /* ... */
        },
      }
    },
    methods: {
      //获取角色列表
      getDataList(){
        this.loading = true;
        roleServer.listRoles({}, {}, result => {
          this.loading = false;
          this.roleList = result.data;
        }, err => {
          this.loading = false;
        });
      },
      save () {
        this.addLoading = true;
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            if (!this.activeEdit) {
              //添加用户
              this.saveRole('addRole');
            } else {
              //编辑用户
              this.saveRole("updateRoleInfo",{ad_role_id: this.activeEdit.ad_role_id});
              //添加菜单
              this.activeListRoles.forEach(item => {
                let has = false;
                this.activeOldListRoles.forEach(obj => {
                  if (item == obj) has = true;
                });
                if (!has) {
                  roleServer.addMenuForRole({}, {
                    ad_menu_id: item,
                    ad_role_id: this.activeEdit.ad_role_id
                  })
                }
              });
              //删除菜单
              this.activeOldListRoles.forEach(item => {
                let has = false;
                this.activeListRoles.forEach(function (obj) {
                  if (item == obj) has = true;
                });

                if (!has) {
                  roleServer.removeMenuForRole({}, {
                    ad_menu_id: item,
                    ad_role_id: this.activeEdit.ad_role_id
                  })
                }
              });

            }
          } else {
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })
      },
      saveRole(key,json){

        roleServer[key]({}, Object.assign(this.formCustom, json), result => {
          if (result.code == "1") {
            this.$Message.success('添加成功');
            this.getDataList();
          } else {
            this.$Message.success('添加失败');
          }
          this.addLoading = false;
        }, function (err) {
          this.$Message.success('网络异常');
          this.addLoading = false;
        });

      },
      edit(params){
        this.addModal = true;
        this.activeEdit = false;
        this.formCustom = {};
        if (params && params.ad_role_id != undefined) {
          this.activeEdit = params;
          this.activeListRoles = [];
          this.activeOldListRoles = [];
          this.formCustom = {
            name: params.name,
            description: params.description
          };
          roleServer.getMenuById({}, {ad_role_id: params.ad_role_id}, result => {
            if (result.code == '1') {
              result.data.forEach(item => {
                this.activeListRoles.push(item.ad_menu_id);
                this.activeOldListRoles.push(item.ad_menu_id);
              })
            } else {
              this.$Message.error('获取当前用户菜单失败');
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  .Role {
  }
</style>
