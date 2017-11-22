/**
* 金融机构已放款贷款管理
* Created by chenchen on 2017/9/7.
*/
<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
  <Row style="margin-bottom: 15px;">
      <Col>
        <span>机构:</span>
        <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.productId" @on-change="''" placeholder="产品">
            <Option :value="0" >全部</Option>
            <Option v-for="item in organizationTypeList" :value="item.name" :key="item.name"></Option>
          </Select>
        </span>
        <span>状态:</span>
        <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.state" v-on:on-change="''" placeholder="申请状态">
            <Option  :value="0" >全部</Option>
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
            title: '业务号',
            render: (h, params) => {
              return h('span', params.row.name);
            }
          },
          {
            title: '贷款申请信息',
            render: (h, params) => {
               return h('span', params.row.roi);
            }
          },
          {
            title: '放款信息',
            render: (h, params) => {
               return h('span', params.row.roi);
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
                }, '归档'),
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
                }, '查看详情')

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
