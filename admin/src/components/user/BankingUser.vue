/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="BankingUser">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem v-if="orgType=='3005'||orgType=='3006'||orgType=='3007'"
                      href="/user/banking">金融机构管理
      </BreadcrumbItem>
      <BreadcrumbItem href="/user/village" v-if="orgType=='3301'"> 村站管理</BreadcrumbItem>
      <BreadcrumbItem href="/user/government" v-if="orgType=='901'"> 政府机构管理</BreadcrumbItem>
      <BreadcrumbItem>{{orgName}}</BreadcrumbItem>
    </Breadcrumb>
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
        <span>用户名搜索:</span>
        <span style="display: inline-block; width: 200px;">
                <Input v-model="loginName" placeholder="输入用户名称"></Input>
            </span>
        </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16">
        <Col>
        <Button type="info" icon="plus-round" @click="add">添加用户</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page v-if="total" :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
    <Modal
      v-model="addModal"
      :title="title"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      width="900">
      <BankingUserEdit :org-item-data.sync="orgActiveItem" v-on:close="closeModal"
                       :parent-obj="orgDetail" :user-type="userType"
                       :org-type="orgType"></BankingUserEdit>
      <div slot="footer" style="display: none;"></div>
    </Modal>
    <Modal
      class-name="EditPasswordBo"
      v-model="editPasswordModal"
      :title="editPasswordTitle"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      width="900">
      <EditPassword :org-item-data.sync="orgActiveItem" v-on:close="closeModal"></EditPassword>
    </Modal>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import orgTypeList from '@/services/orgType';
  import BankingUserEdit from '@/components/user/BankingUserEdit';
  import EditPassword from '@/components/user/EditPassword';
  export default {
    name: 'BankingUser',
    data () {
      return {
        editPasswordModal:false,
        editPasswordTitle:"修改密码",
        title:"添加用户",
        userType:this.$route.params.userType,
        total: 0,
        current: 1,
        pageSize: 10,
        orgId: this.$route.params.orgId,
        orgName: this.$route.params.orgName,
        orgType: this.$route.params.orgType,
        orgTypeList: orgTypeList,
        orgDetail: {},
        orgActiveItem: {},
        organizationTypeList: [],
        addLoading: true,
        loginName: "",
        parentId: "",
        adminDivisionId: "",
        addModal: false,
        tableHeard: [
          {
            title: '登陆名称',

            render: (h, params) => {
              return h('span', params.row.loginName);
            }
          },

          {
            title: '全名',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '用户角色',
            render: (h, params) => {
              let str = '';
              params.row.roleVos.forEach((item, index) => {
                str += item.name;
                if (index != params.row.roleVos.length - 1) str += ","
              });

              return h('span', str);
            }

          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.accountState=='1402'?"临时锁定":"正常");
            }
          },
          {
            title: '更新时间',
            render: (h, params) => {
              return h('span', params.row.updateAt);
            }
          },
          {
            title: '更新人',
            render: (h, params) => {
              return h('span', params.row.updateName);
            }
          },
          {
            title: '上次登陆时间',
            render: (h, params) => {
              return h('span', params.row.lastLoginTime);
            }
          },

          {
            title: '操作',
            key: 'action',
            width: 290,
            align: 'center',

            render: (h, params) => {
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
                      this.editPassword(params.row)
                    }
                  }
                }, '修改密码'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'close'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      userServer.deleteUser({}, {
                        ids: [params.row.id]
                      }, data => {
                        this.getTableData();
                        this.$Message.success('删除成功!');
                      }, err => {
                        this.$Message.error('删除失败!');
                      });
                    }
                  }
                }, '删除')

              ]);
            }
          }
        ],
        tableData: [],
        loading: true,
        loadingMo: true

      }
    },
    created: function () {
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.loginName) this.loginName = this.$route.query.loginName;
      this.getTableData();
      this.getOrgDetail();
      this.setUserType();
    },
    components: {
      'BankingUserEdit': BankingUserEdit,
      'EditPassword':EditPassword
    },
    methods: {
      setUserType(){
        switch (this.orgType) {
          case 901:
          case 3003:
          case 3007:
            this.userType = '204';
            break;
          case 3004:
            this.userType = '205';
            break;
          case 3005:
            this.userType = '206';
            break;
          case 3006:
            this.userType = '207';
            break;

        }
      },
      closeModal(){
        this.getTableData();
        this.addModal = false;
        this.editPasswordModal=false;
      },
      getOrgDetail (){

        userServer.findOrgById({
          id: this.orgId
        }, {}, response => {

          if (response.errorCode == 0) {
            this.orgDetail = response.data;
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {

        })
      },
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
        this.loading = true;
        this.$router.push('?current=' + this.current + "&pageSize=" + this.pageSize
        +"&loginName="+this.loginName);
        userServer.getUser({
          params3: this.current,
          params4: this.pageSize,
        }, {
          orgId: this.orgId,
          loginName: this.loginName ? this.loginName : null
        }, response => {

          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) this.tableData = response.data.pageData;
            if (response.data) this.total = response.data.totalCount;
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {

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
      add(data){
        this.orgActiveItem = {};
        if (data.name) {
          this.orgActiveItem = data;
          this.title="编辑用户";
        }else {
          this.title="添加用户";
        }
        this.addModal = true;
      },
      editPassword(data){
        this.orgActiveItem = data;
        this.editPasswordModal=true;
      }
    }
  }
</script>

<style lang='less'>
  .BankingUser {
  }
  .EditPasswordBo{
    .ivu-modal-footer{ display: none;}
  }
</style>
