/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="BankingChildren">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/banking"> 金融机构管理</BreadcrumbItem>
      <BreadcrumbItem>{{orgName}}</BreadcrumbItem>
    </Breadcrumb>
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18" style="height: 40px;">
      <!--<Row type="flex" justify="start" :gutter="15">
        <Col>
        <span>关键字搜索:</span>
        <span style="display: inline-block; width: 200px;">
                <Input v-model="name" placeholder="输入机构名称"></Input>
            </span>
        </Col>
        <Col>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col>
      </Row>-->
      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16">
        <Col>
        <Button type="info" icon="plus-round" @click="add()">添加子机构</Button>
        </Col>
      </Row>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import orgTypeList from '@/services/orgType';

  export default {
    name: 'BankingChildren',
    data () {
      return {
        orgId: this.$route.params.orgId,
        orgName: this.$route.params.orgName,
        orgTypeList: orgTypeList,
        orgDetail: {},
        orgActiveItem: {},
        organizationTypeList: [],
        addLoading: true,
        name: "",
        parentId: "",
        orgType: "",
        adminDivisionId: "",
        addModal: false,
        tableHeard: [
          {
            title: '机构名称',

            render: (h, params) => {
              return h('span', params.row.name);
            }
          },

          {
            title: '机构编码',
            render: (h, params) => {
              return h('span', params.row.value);
            }
          },
          {
            title: '机构所在地区',
            render: (h, params) => {
              return h('span', params.row.adminDivisionName);
            }

          },
          {
            title: '机构管辖地区',
            render: (h, params) => {
              var arr = [];
              /*for (var i = 0; i < params.row.divisionNames.length; i++) {
               arr.push(h('p', params.row.divisionNames[i]))
               }*/
              return arr;
            }

          },
          {
            title: '类型',
            render: (h, params) => {
              return h('span', this.getCodeName(params.row.orgSubtype));
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.status);
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
                    icon: 'ios-eye',
                    disabled:params.row.isLeaf
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'BankingChildren',
                        params: {orgId: params.row.id, orgName: params.row.name}
                      });
                      this.orgId = params.row.id;
                      this.orgName = params.row.name;
                      this.getTableData();
                      this.getOrgDetail();
                    }
                  }
                }, '查看子机构'),
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
                        name: 'BankingUser',
                        params: {orgId: params.row.id, orgName: params.row.name, orgType: params.row.orgSubtype}
                      });
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
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true

      }
    },
    created: function () {
      this.getTableData();
      this.getOrgDetail();
    },
    components: {},
    watch: {
      '$route' (to, from) {
        this.orgId = this.$route.params.orgId;
        this.orgName = this.$route.params.orgName;
        this.getOrgDetail();
        this.getTableData();
      }
    },
    methods: {
      getOrgDetail (){

        userServer.findOrgList({
          params3: 1,
          params4: 1,
        }, {
          name: this.orgName,
        }, response => {

          if (response.errorCode == 0) {
            this.orgDetail = response.data.pageData[0];
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {

        })
      },
      closeModal(){
        this.getTableData();
        this.addModal = false;
      },
      search(){
        this.current = 1;
        this.getTableData();
      },
      getTableData (){
        this.tableData = [];
        this.loading = true;
        userServer.findOrgChilds({
          id: this.orgId
        }, {

        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) this.tableData = response.data;
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {
          this.loading = false;
        })
      },
      add(data){
        let isParent = {
          isParent: true,
          parentId: this.$route.params.orgId,
          parentName: this.$route.params.orgName,
          orgSubtype: this.$route.params.orgSubtype
        };
        this.session.set("orgObj", data ? JSON.stringify(Object.assign(isParent, data)) : JSON.stringify(isParent));
        this.$router.push({name: "BankingAdd"})
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
          village_id: data.location.village_id,
          village: data.location.village,
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
      addSave () {

        this.addLoading = true;

        this.$refs.formCustom.validate((valid) => {
          if (valid) {
            if (!this.activeEdit) {
              userServer.addOrg({}, this.formCustom, data => {
                if (data.code == '1') {
                  this.$refs.formCustom.resetFields();
                  this.addModal = false;
                  this.$Message.success('添加成功!');
                } else {
                  this.addLoading = false;
                  this.$Message.error('添加失败失败!');
                }
              }, err => {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
              })
            } else {
              userServer.updateOrgInfo({}, $.extend(this.formCustom,
                {ad_org_id: this.activeEdit.org.ad_org_id}), data => {
                if (data.code == '1') {
                  this.$refs.formCustom.resetFields();
                  this.addModal = false;
                  this.$Message.success('添加成功!');
                } else {
                  this.addLoading = false;
                  this.$Message.error('添加失败失败!');
                }
              }, function (err) {
                this.addLoading = false;
                this.$Message.error('添加失败失败!');
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

        userServer.getCityById({}, {
          parentId: id
        }, function (response) {
          callBack(response);
        }, function (err) {
        })
      },
      changeIsLeaf(){

      }
    }
  }
</script>

<style scoped lang='less'>
  .BankingChildren {
  }
</style>
