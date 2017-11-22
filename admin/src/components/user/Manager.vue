/**
* 管理员用户管理
* Created by zhaowei on 2017/8/24.
*/

<template>
  <div class="Manager">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
        <span>登录名:</span>
        <span style="display: inline-block; width: 150px;">
                <Input v-model="loginName" placeholder="输入登录名称"></Input>
            </span>
        </Col>
        <Col>
        <span>所属区域:</span>
        <span style="display: inline-block; width: 200px;">
            <GetCity @onChange="adminDivisionIdChange" :setValue="adminDivisionId"></GetCity>
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
        <Button type="info" icon="plus-round" @click="add(1)">添加管理员用户</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page v-if="total" :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
  </div>

</template>

<script>
  import userServer from 'rs/userServer';
  // import UserAddNom from '@/components/user/UserAddNom';
  // import UserAddEnterprise from '@/components/user/UserAddEnterprise';
  export default {
    name: 'Manager',
    data () {
      return {
        modalTitle: "添加金融机构",
        isMom: 0,
        orgActiveItem: {},
        organizationTypeList: [],
        addLoading: true,
        loginName: "",
        parentId: "",
        adminDivisionId: "",
        addModal: false,
        tableHeard: [
          {
            title: '登录名',

            render: (h, params) => {
              return h('span', params.row.loginName);
            }
          },
          {
            title: '手机号',
            render: (h, params) => {
              return h('span', params.row.mobile);
            }
          },
          {
            title: '名称',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },

          {
            title: '所属区域',
            render: (h, params) => {
              return h('span', params.row.adminDivisionName);
            }

          },

          {
            title: '最后登陆时间',
            render: (h, params) => {
              return h('span', params.row.lastLoginTime);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 390,
            align: 'center',

            render: (h, params) => {
              let name = "禁用";
              let icon = "locked";
              let accountState = 1403;
              let type = "warning";
              if (params.row.accountState == 1403) {
                name = "起用";
                icon = "unlocked";
                accountState = 1401;
                type = "success";
              }


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
                      this.editInit(params.row)
                    }
                  }
                }, '编辑'),

                h('Button', {
                  props: {
                    type: type,
                    size: 'small',
                    icon: icon
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      userServer.updateAccountState({}, {
                        ids: [params.row.id],
                        accountState: accountState
                      }, data => {
                        this.getTableData();
                        this.$Message.success(name + '成功!');
                      }, err => {
                        this.$Message.error(name + '失败!');
                      });
                    }
                  }
                }, name)

              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true

      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.loginName) this.loginName = this.$route.query.loginName;
      if (this.$route.query.adminDivisionId) this.adminDivisionId = this.$route.query.adminDivisionId;
      this.getTableData();
      this.$Modal.remove();
    },
    // components: {
    //   'UserAddNom': UserAddNom,
    //   'UserAddEnterprise': UserAddEnterprise
    // },
    methods: {
      adminDivisionIdChange(data){
        this.adminDivisionId = null;
        if (data && data.length) this.adminDivisionId = data[data.length - 1];
      },
      remoteMethod1 (query) {
        if (query !== '') {
          this.loading1 = true;

          userServer.findOrgList({
            params3: 1,
            params4: 50,
          }, {
            name: query
          }, response => {
            this.loading1 = false;
            if (response.errorCode == 0) {
              this.parentList = response.data.pageData;
            } else {
              this.$Message.error('获取数据失败!');
            }

          }, err => {
            this.loading1 = false;
            this.$Message.error('获取数据失败!');
          });
        } else {
          this.loading1 = false;
          this.parentList = [];
        }
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
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
        this.tableData = [];
        this.loading = true;
        this.$router.push('manager?current=' + this.current + "&pageSize=" + this.pageSize
          + "&adminDivisionId=" + this.adminDivisionId + "&loginName=" + this.loginName);
        userServer.getUser({
          params3: this.current,
          params4: this.pageSize,
        }, {
          userType: '201',
          loginName: this.loginName,
          adminDivisionId: this.adminDivisionId
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) this.tableData = response.data.pageData;
            if (response.data) this.total = response.data.totalCount;
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {
          this.loading = false;
        })
      },
      add(){
        let obj = {
          type: "new"
        };
        this.session.set("userObj", JSON.stringify(obj));
        this.$router.push('./manager/add')
      },
      editInit(data){
        let obj = {
          data,
          type: "edit"
        };
        this.session.set("userObj", JSON.stringify(obj));
        this.$router.push('./manager/add')
      },
      getOrganizationTypeList(){
        this.loadingMo = true;
        userServer.getOrganizationTypeList({}, {}, response => {
          response.data.forEach(function (item) {
            item.parentId += "";
          });
          this.organizationTypeList = response.data;
          this.loadingMo = false;
        }, err => {
          this.loadingMo = false;
        })
      },

      handleReset (name) {
        this.$refs[name].resetFields();
      },

    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .Manager {

  }
</style>
