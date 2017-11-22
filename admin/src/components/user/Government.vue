/**
* Created by zhaowei on 2017/9/28.
*/
<template>
  <div class="Government">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
        <span>关键字搜索:</span>
        <span style="display: inline-block; width: 150px;">
                <Input v-model="name" placeholder="输入机构名称"></Input>
            </span>
        </Col>
        <Col>
        <span>所属行政区划:</span>
        <span style="display: inline-block; width: 240px;">
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
        <Button type="info" icon="plus-round" @click="add()">添加政府机构</Button>
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
  export default {
    name: 'Government',
    data () {
      return {
        modalTitle: "添加金融机构",
        orgActiveItem: {},
        organizationTypeList: [],
        addLoading: true,
        name: "",
        parentId: "",
        orgType: 901,
        adminDivisionId: "",
        addModal: false,
        tableHeard: [
          {
            title: '政府名称',

            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '机构管辖地区',
            render: (h, params) => {
              var arr = [];
              if (params.row.divisionNames && params.row.divisionNames.length) {
                for (var i = 0; i < params.row.divisionNames.length; i++) {
                  arr.push(h('p', params.row.divisionNames[i]))
                }
              }
              return arr;
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
            title: '操作',
            key: 'action',
            width: 390,
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
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'governmentUser',
                        params: {
                          orgId: params.row.id,
                          orgName: params.row.name,
                          orgType: params.row.orgSubtype,
                          userType: 204
                        }
                      })
                    }
                  }
                }, '查看用户'),
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
                      userServer.deleteOrg({}, {
                        ids: [params.row.id]
                      }, data => {
                        if (data.errorCode == 0) {
                          this.getTableData();
                          this.$Message.success('删除成功!');
                        } else {
                          this.$Message.error(
                            {
                              content: '机构存在子机构或者机构存在用户！请先删除子机构或机构用户',
                              duration: 10,
                              closable: true
                            });
                        }
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
      if (this.$route.query.name) this.name = this.$route.query.name;
      if (this.$route.query.adminDivisionId) this.adminDivisionId = this.$route.query.adminDivisionId;
      this.getTableData();
      this.$Modal.remove();
    },
    components: {},
    methods: {
      adminDivisionIdChange(data){
        this.adminDivisionId = "";
        if (data && data.length) this.adminDivisionId = data[data.length - 1];
      },
      closeModal(){
        this.getTableData();
        this.addModal = false;
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
        this.$router.push('government?current=' + this.current + "&pageSize=" + this.pageSize + "&name=" + this.name +
          "&adminDivisionId=" + this.adminDivisionId);
        userServer.findOrgList({
          params3: this.current,
          params4: this.pageSize,
        }, {
          status: 1,
          name: this.name,
          parentId: this.parentId,
          orgType: this.orgType,
          orgSubtypes: ['3001'],
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
      add(data){
        let isParent = {isParent: false};
        this.session.set("orgObj", data ? JSON.stringify(Object.assign(isParent, data)) : JSON.stringify(isParent));
        this.$router.push({name: "governmentAdd"})
      },
      editInit(data){
        this.activeEdit = data;
        this.formCustom = {
          name: data.org.name,
          parentId: data.org.parentId,
          value: data.org.value,
          phone: data.org.phone,
          emali: data.org.emali,
          county: data.location.county,
          county_id: data.location.county_id,
          town_id: data.location.town_id,
          town: data.location.town,
          Government_id: data.location.Government_id,
          Government: data.location.Government,
          address: data.location.address,
          region_id: 51,
          regionname: '四川省',
          city_id: 5101,
          city: '成都市'
        };
        this.addModal = true;


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
  .Government {

  }
</style>

