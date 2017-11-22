/**
* Created by zhaowei on 2017/9/28.
*/
<template>
  <div class="VillageFarmer">
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
              <Input v-model="searchKey.papersId" placeholder="输入证件号"></Input>
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
        <Button type="info" icon="plus-round" @click="add()">添加农户</Button>
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
  import villagePersonalServer from 'rs/villagePersonalServer';
  export default {
    name: 'VillageFarmer',
    data () {
      return {
        searchKey: {papersId: "", name: ""},
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
            title: '身份证号码',
            render: (h, params) => {
              return h('span', params.row.papersId);
            }
          },
          {
            title: '电话',
            render: (h, params) => {
              return h('span', params.row.phone);
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
                      this.update(params.row)
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
                      this.view(params.row)
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
                          villagePersonalServer.del({baseInfoId: params.row.id}, {}, data => {
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
      if (this.$route.query.papersId) this.searchKey.papersId = this.$route.query.papersId;
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
        this.$router.push('village-farmer?current=' + this.current + "&pageSize=" + this.pageSize + "&name=" +
          this.searchKey.name+"&papersId="+this.searchKey.papersId);
        villagePersonalServer.list({
          params3: this.current,
          params4: this.pageSize,
        }, {
          name: this.searchKey.name,
          papersId: this.searchKey.papersId
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
        this.$router.push({name: "VillageFarmerAdd"});
      },
      update(data){
        this.$router.push({name: "VillageFarmerUpdate",query: {id:data.id}})
      },
      view(data){
        this.$router.push({name: "VillageFarmerView",query: {id:data.id}})
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .VillageFarmer {

  }
</style>

