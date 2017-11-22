/**
* 用户管理
* Created by zhaowei on 2017/8/23.
*/

<template>
  <div class="User">
    <Loading v-show="loading"></Loading>

    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
        <Row type="flex" justify="start" :gutter="15" v-if="!isOrganizationUser">
          <Col>
            <span>机构名称:</span>
            <span style="display: inline-block; width: 200px;">
              <Select v-model="ad_org_id" filterable>
                <Option v-for="item in organizationList" :value="item.org.ad_org_id" :key="item.org.ad_org_id"
                        :label="item.org.name"></Option>
              </Select>
            </span>
          </Col>
          <Col>
            <span>用户名称:</span>
            <span style="display: inline-block; width: 200px;">
              <Input v-model="username" placeholder="输入用户名称">

              </Input>
            </span>
          </Col>
          <Col>
            <Button type="success" icon="search" @click="search">搜索</Button>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" v-if="isOrganizationUser">
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>
                <router-link :to="{name:'organization'}">组织机构管理</router-link>
              </BreadcrumbItem>
              <BreadcrumbItem v-text="ad_org_name"></BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </Col>
      <Col :xs="6">
        <Row type="flex" justify="end" :gutter="16" >
          <Col style="float: right;">
            <Button type="info" icon="plus-round" @click="add">添加用户</Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"></Page>
    <Modal
      v-model="addModal"
      title="添加用户"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-ok="addSave"
      width="900">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
        <FormItem  v-if="!isOrganizationUser" label="选择组织机构：" prop="ad_org_id">
          <Select v-model="ad_org_id" filterable v-on:on-change="organizationChange">
            <Option v-for="item in organizationList" :value="item.org.ad_org_id" :key="item.org.ad_org_id"
                    :label="item.org.name"></Option>
          </Select>
        </FormItem>
        <FormItem label="登录手机号：" prop="phone">
          <Input v-model="formCustom.phone" placeholder="请输入登录手机号"></Input>
        </FormItem>
        <FormItem label="身份证号：" prop="value">
          <Input type="text" v-model="formCustom.value" placeholder="请输入身份证号"></Input>
        </FormItem>
        <FormItem label="登录名称：" prop="name">
          <Input type="text" v-model="formCustom.name" placeholder="请输登录名称"></Input>
        </FormItem>
        <FormItem label="真实姓名：" prop="realname">
          <Input type="text" v-model="formCustom.realname" placeholder="请输真实姓名"></Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input type="text" v-model="formCustom.password" placeholder="请输密码"></Input>
        </FormItem>
        <FormItem label="选择权限：" prop="checkbox" v-if="activeEdit">
          <CheckboxGroup v-model="activeListRoles">
            <Checkbox v-for="item in listRoles" :key="item.ad_role_id" :label="item.ad_role_id">
              <span v-text="item.name"></span>
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>

  </div>
</template>

<script>
  import organizationServer from 'rs/organizationServer';
  import userServer from 'rs/userServer';
  import otherServer from 'rs/otherServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'User',
    data () {
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'));
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
          return callback(new Error('电话格式错误'));
        }
        callback();
      };
      return {
        activeListRoles: [],
        activeOldListRoles: [],
        listRoles: [],
        username: "",
        ad_org_id: "",
        ad_org_name: "",
        isOrganizationUser: false,
        organizationList: [],
        organizationTypeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        addLoading: true,
        formCustom: {
          ad_user_id: '',
          phone: '',
          name: '',
          realname: '',
          ad_org_id: '',
          password: '',
          value: ''
        },
        ruleCustom: {
          /*ad_org_id: [
           {required: true, message: '组织机构不能为空', trigger: 'blur'}
           ],*/
          name: [
            {required: true, message: '登录名不能为空', trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '真实姓名不能为空', trigger: 'blur'}
          ],
          value: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur'},

          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        addModal: false,
        tableHeard: [
          {
            title: '用户名称',
            render: (h, params) => {
              if (params.row.user.name)return h('span', params.row.user.name);
            }
          },
          {
            title: '所属机构',
            render: (h, params) => {
              if (params.row && params.row.org && params.row.org.name)return h('span', params.row.org.name);
            }
          },
          {
            title: '创建时间',
            render: (h, params) => {
              return h('span', formatDate(params.row.user.created));
            }
          },
          {
            title: '是否有效',
            render: (h, params) => {
              return h('span', params.row.user.isactive);
            }

          },
          {
            title: '描述',
            render: (h, params) => {
              return h('span', params.row.user.description);
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {

              var btn2 = h('Button', {
                props: {
                  type: params.row.user.isactive == "Y" ? 'warning' : 'primary',
                  size: 'small',
                  icon: params.row.user.isactive == "Y" ? 'locked':'unlocked'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    userServer.updateUserActive({},
                      {
                        ad_user_id: params.row.user.ad_user_id,
                        isactive: params.row.user.isactive == "Y" ? 'N' : 'Y'
                      }, function () {
                        params.row.user.isactive = params.row.user.isactive == "Y" ? 'N' : 'Y';
                      });
                  }
                }
              }, params.row.user.isactive == "Y" ? '禁用' : '启用');


              return h('div', [
                h('Button', {
                  style: {
                    'margin-right': '10px'
                  },
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.add(params.row)
                    }
                  }
                }, '编辑'),
                btn2
              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true,
        activeEdit: "",

      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.username) this.username = this.$route.query.username;
      if (this.$route.params.ad_org_id != null && this.$route.params.ad_org_id != undefined) {
        this.ad_org_id = this.$route.params.ad_org_id;
        this.ad_org_name = this.$route.params.ad_org_name
        this.isOrganizationUser = true;
      }
      this.getTableData();
      this.getOrganizationList();
      this.getListRoles();

    },
    watch: {
      '$route': ["getTableData"]
    },
    methods: {
      getOrganizationList(){
        let that = this;
        organizationServer.listOrgs({}, {
          pageIndex: 1,
          pageSize: 20,
          name: '成都'
        }, function (response) {
          that.organizationList = response.data;
        }, function (err) {

        })
      },
      getListRoles(){
        let that = this;
        userServer.listRoles({}, {}, function (response) {
          that.listRoles = response.data;
        }, function (err) {

        })
      },
      pageChange (current){
        this.current = current;
        this.getTableData();

      },
      pageSizeChange (pageSize){
        this.current = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      search(key){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
        let that = this;
        that.loading = true;
        let json = {
          pageIndex: this.current,
          pageSize: this.pageSize,
          ad_org_id: this.ad_org_id
        };

        if (this.$route.name == "organizationUser") {
          this.isOrganizationUser = true;
        } else {
          this.isOrganizationUser = false;
          json.username = this.username;
        }

        this.$router.push({
          path: '?current=' + this.current + "&pageSize=" + this.pageSize +
          "&username=" + this.username, params: {}
        });


        userServer.listUsers({}, json, function (response) {
          that.tableData = response.data;
          that.total = response.total;
          that.loading = false;
        }, function (err) {
          that.loading = false;
        })
      },
      add(data){
        this.activeEdit = "";
        this.$refs.formCustom.resetFields();
        if (data.user) this.editInit(data);
        this.addModal = true;
      },
      editInit(data){
        let that = this;
        this.activeEdit = data;
        this.formCustom = {
          ad_user_id: data.user.ad_user_id,
          phone: data.user.phone,
          name: data.user.name,
          realname: data.user.realname,
          ad_org_id: data.org.ad_user_id,
          password: data.user.password,
          value: data.user.value
        };
        this.activeListRoles = [];
        this.activeOldListRoles = [];
        userServer.listUserRoles({}, {ad_user_id: data.user.ad_user_id},
          function (data) {

            if (data.data.length) {
              data.data.forEach(function (item) {
                that.activeOldListRoles.push(item.ad_role_id)
                that.activeListRoles.push(item.ad_role_id)
              })
            }
          })


      },
      getOrganizationTypeList(){
        let that = this;
        that.loadingMo = true;
        organizationServer.getOrganizationTypeList({}, {}, function (response) {
          that.organizationTypeList = response.data;
          that.loadingMo = false;
        }, function (err) {
          that.loadingMo = false;
        })
      },
      addSave () {
        let that = this;
        this.addLoading = true;
        if (this.$route.name == "organizationUser") {
          this.formCustom.ad_org_id = this.ad_org_id;
          this.formCustom.ad_user_id=null;
        }

        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            if (!this.activeEdit) {
              userServer.addUser({}, $.extend(this.formCustom,
                {ad_org_id: this.ad_org_id}), function (data) {
                if (data.code == '1') {
                  that.$refs.formCustom.resetFields();
                  that.addModal = false;
                  that.$Message.success('添加成功!');
                } else {
                  that.addLoading = false;
                  that.$Message.error('添加失败失败!');
                }
              }, function (err) {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
              })
            } else {
              userServer.updateUserInfo({}, $.extend(this.formCustom,
                {ad_org_id: this.ad_org_id}), function (data) {
                if (data.code == '1') {
                  that.$refs.formCustom.resetFields();
                  that.addModal = false;
                  that.$Message.success('添加成功!');
                } else {
                  that.addLoading = false;
                  that.$Message.error('添加失败失败:' + data.msg);
                }
              }, function (err) {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
              })


              that.activeListRoles.forEach(function (item) {
                let has = false;
                that.activeOldListRoles.forEach(function (obj) {
                  if (item == obj) has = true;
                });
                if (!has) {
                  userServer.addRoleForUser({}, {
                    ad_user_id: that.activeEdit.user.ad_user_id,
                    ad_role_id: item
                  }, function (data) {

                  })
                }
              })
              that.activeOldListRoles.forEach(function (item) {
                let has = false;
                that.activeListRoles.forEach(function (obj) {
                  if (item == obj) has = true;
                });
                if (!has) {
                  userServer.removeRoleForUser({}, {
                    ad_user_id: that.activeEdit.user.ad_user_id,
                    ad_role_id: item
                  }, function (data) {

                  })
                }
              })

            }
          } else {
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })

      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      getCityById(id, callBack){

        organizationServer.getCityById({}, {
          parentId: id
        }, function (response) {
          callBack(response);
        }, function (err) {
        })
      },
      organizationChange(name){
        let that = this;
        this.organizationTypeList.forEach(function (item) {
          if (item.name == name) {
            that.formCustom.ad_orgtype_id = item.ad_orgtype_id + "";

          }
        });
      },
      updateUserActive(data, k){
        userServer.updateUserActive({},
          {
            ad_user_id: data.user.ad_user_id,
            isactive: k
          }, function () {
            data.user.isactive = k;
          })
      }
    }
  }
</script>

<style scoped lang='less'>
  .User {

  }
</style>
