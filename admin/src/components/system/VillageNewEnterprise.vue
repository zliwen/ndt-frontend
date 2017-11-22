/**
* Created by zhaowei on 2017/9/28.
*/
<template>
  <div class="VillageNewEnterprise">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs="18" style="height: 50px;">

      </Col>
      <Col :xs="6">
      <Row type="flex" justify="end" :gutter="16">
        <Col>
        <!--<Button type="info" icon="plus-round" @click="add()">导入新型农业经营主体</Button>-->
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
  import cooperationServer from 'rs/cooperation';
  export default {
    name: 'VillageNewEnterprise',
    data () {
      return {
        searchKey: {papersId: "", name: ""},
        tableHeard: [
          {
            title: '姓名',
            render: (h, params) => {
              return h('span', params.row.name);
            }

          },
          {
            title: '标记',
            render: (h, params) => {
              let name = "";
              switch (params.row.remark) {
                case "none":
                  name = "未知";
                  break;
                case "company":
                  name = "企业";
                  break;
                case "frName":
                  name = "农户";
                  break;
              }

              return h('span', name);
            }
          },
          {
            title: '乡镇',
            render: (h, params) => {
              return h('span', params.row.town);
            }
          },
          {
            title: '更新时间',
            render: (h, params) => {
              return h('span', params.row.updateTime);
            }
          },
          /*{
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
           name: 'VillageNewEnterpriseAdd',
           query: {orgId: params.row.id, orgName: params.row.name, orgType: params.row.orgSubtype}
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
           cooperationServer.del({}, {
           id: [params.row.id]
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
           }*/
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
      if (this.$route.query.name) this.name = this.$route.query.name;
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
        this.$router.push('village-new-enterprise?current=' + this.current + "&pageSize=" + this.pageSize);
        cooperationServer.list({
          params3: this.current,
          params4: this.pageSize,
        }, {}, response => {
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
        this.$router.push({name: "VillageNewEnterpriseAdd"})
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .VillageNewEnterprise {

  }
</style>

