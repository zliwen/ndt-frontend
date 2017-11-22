/**
* 金融机构项目管理
* Created by chenchen on 2017/9/7.
*/
<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
  <Row style="margin-bottom: 15px;">
      <Col>
        <span>机构:</span>
        <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.productId" v-on:on-change="" placeholder="产品">
            <Option v-for="item in organizationTypeList" :value="item.name" :key="item.name"></Option>
          </Select>
        </span>
        <span>状态:</span>
        <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.state" v-on:on-change="" placeholder="申请状态">
            <Option v-for="item in organizationTypeList" :value="item.name" :key="item.name"></Option>
          </Select>
        </span>
      </Col>
    </Row>

      <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>

    <Modal
      v-model="addModal"
      title="贷款处理"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-ok="modalSubmit"
      width="900">
    </Modal>
  </div>
</template>

<script>
  import productServer from 'rs/productServer';
  export default {
    name: 'FinanceLoanApply',
    data () {

      return {
        organizationTypeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        addLoading: true,
        ruleCustom: {},
        keyWord: "",
        addModal: false,
        tableHeard: [
          {
            title: 'ID',
            render: (h, params) => {
              return h('span', params.index);
            }
          },
          {
            title: '项目名称',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '申请主体',
            render: (h, params) => {
               return h('span', params.row.roi);
            }
          },
          {
            title: '主体类型',
            render: (h, params) => {
               return h('span', params.row.roi);
            }

          },
          {
            title: '主体所在地区',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '申请金额',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '贷款期限',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '期望放款时间',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.orgname);
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {
              return h('div', [
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
                    }
                  }
                }, '邀约'),
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
                    }
                  }
                }, '不再关注')

              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: false,
        loadingMo: true,
        activeEdit:"",
      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.keyWord) this.keyWord = this.$route.query.keyWord;
      this.getTableData();

    },
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
      search(){//搜索
        this.current = 1;
        this.getTableData();
      },
      getTableData (){//请求
        let that = this;

      },
      modalSubmit () {//模态弹窗确定事件
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">

</style>
