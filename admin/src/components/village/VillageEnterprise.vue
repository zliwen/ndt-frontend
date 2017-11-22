/**
* Created by zhaowei on 2017/9/28.
*/
<template>
  <div class="VillageEnterprise">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
        <span>名称:</span>
        <span style="display: inline-block; width: 150px;">
              <Input v-model="searchKey.name" placeholder="输入名称"></Input>
          </span>
        </Col>
        <Col>
        <span>证件号:</span>
        <span style="display: inline-block; width: 150px;">
              <Input v-model="searchKey.code" placeholder="输入证件号"></Input>
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
        <Button type="info" icon="plus-round" @click="add()">添加农业经营主体</Button>
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
  import villageCompanyBaseInfoServer from 'rs/villageCompanyBaseInfo';
  import villageCompanyServer from 'rs/villageCompanyServer';
  export default {
    name: 'VillageEnterprise',
    data () {
      return {
        searchKey: {code: "", name: ""},
        tableHeard: [
          {
            title: 'ID',

            render: (h, params) => {
              return h('span', params.row.id);
            }
          },
          {
            title: '姓名',
            render: (h, params) => {
              return h('span', params.row.name);
            }

          },
          {
            title: '农业经营主体代码',
            render: (h, params) => {
              return h('span', params.row.code);
            }
          },
          {
            title: '法人代表',
            render: (h, params) => {
              return h('span', params.row.legalPerson);
            }
          },
          {
            title: '电话',
            render: (h, params) => {
              return h('span', params.row.legalPersonPhone);
            }
          },
          {
            title: '创建时间',
            render: (h, params) => {
              return h('span', params.row.updateTime);
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
                        name: 'VillageEnterpriseCheckSee',
                        query: {id: params.row.id, isSee:true}
                      })
                    }
                  }
                }, '查看'),
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
                      let that = this;
                      this.$Modal.confirm({
                        title: '确认删除',
                        content: '<p>删除后不能恢复</p>',
                        onOk: () => {
                          villageCompanyBaseInfoServer.del({id: params.row.id}, {}, data => {
                            that.getTableData();
                            that.$Message.success('删除成功!');
                          }, err => {
                            that.$Message.error('删除失败!');
                          });
                        },
                        onCancel: () => {
                        }
                      })


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
        loading: true

      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.name) this.searchKey.name = this.$route.query.name;
      if (this.$route.query.code) this.searchKey.code = this.$route.query.code;
      this.getTableData();
      this.$Modal.remove();
    },
    components: {},
    methods: {
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
        this.$router.push('village-enterprise?current=' + this.current + "&pageSize=" + this.pageSize + "&name=" +
          this.searchKey.name+"&code="+this.searchKey.code);
        villageCompanyServer.find({
          params3: this.current,
          params4: this.pageSize,
        }, {
          name: this.searchKey.name,
          code: this.searchKey.code
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
        this.$router.push({name: "VillageEnterpriseAdd",query:{id:data?data.id:''}})
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .VillageEnterprise {

  }
</style>

