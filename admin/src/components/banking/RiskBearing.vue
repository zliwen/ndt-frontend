/**
* Created by zhaowei on 2017/9/27.
*/

<template>
    <div class="RiskBearing">
      <Loading v-show="loading"></Loading>
      <Row style="margin-bottom: 15px;">
        <!-- <Col>
        <span>产品:</span>
        <span style="display: inline-block; width: 200px;">
        <Select
          placeholder="产品名称/产品编码"
          v-model="keyWord.productId"
          filterable
          remote
          :remote-method="getProductList"
          :loading="productIdLoading">
                <Option v-for="(option, index) in productList" :value="option.id"
                        :key="index">{{option.name}}</Option>
            </Select>
        </span>
        <span>用户:</span>
        <span style="display: inline-block; width: 200px;">
        <Select
          placeholder="登录名或者手机号"
          v-model="keyWord.userId"
          filterable
          remote
          :remote-method="getUserList"
          :loading="userIdLoading">
                <Option v-for="(option, index) in userList" :value="option.id"
                        :key="index">{{option.name}}</Option>
            </Select>
        </span>
        <span>状态:</span>
        <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.period" placeholder="申请状态">
            <Option v-for="item in stateList" :value="item.id" :key="item.id">{{item.value}}</Option>
          </Select>
        </span>
        <Button type="success" icon="search" @click="search">搜索</Button>
        </Col> -->
      </Row>

      <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
      <Page :total="total" :current="current" :page-size="pageSize"
            show-total show-elevator show-sizer
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
      ></Page>

    </div>
</template>
<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import productServer from 'rs/productServer';
  import riskshareServer from 'rs/riskshareServer';
  import userServer from 'rs/userServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'RiskBearing',
    data () {

      return {
        userIdLoading: false,
        userList: [],
        productIdLoading: false,
        productList: [],
        stateList: [],
        purposeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        ruleCustom: {},
        keyWord: {
          period: null,
          productId: null,
          userId: null
        },
        tableHeard: [
          {
            title: '业务号',
            render: (h, params) => {
              return h('span', params.row.id);
            }
          },
          {
            title: '贷款主体',
            render: (h, params) => {
              return h('span', params.row.userName);
            }
          },
          {
            title: '主体类型',
            render: (h, params) => {
              return h('span', params.row.invitationUserTypeValue);
            }
          },
          {
            title: '主体所在区域',
            render: (h, params) => {
              return h('span', params.row.userAdmindivisionIdValue[0]);
            }
          },
          {
            title: '申请时间',
            render: (h, params) => {
              return h('span', formatDate(params.row.loanApplyTime));
            }
          },
          {
            title: '更新时间',
            render: (h, params) => {
              return h('span', formatDate(params.row.updateTime));
            }
          },
          {
            title: '风险申请金额',
            render: (h, params) => {
              return h('span', params.row.applyAmount);
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span',  params.row.stateValue);
            }

          },
          {
            title: '第几次',
            render: (h, params) => {
              return h('span',  params.row.riskShareFlowName);
            }

          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width:'200',
            render: (h, params) => {
                return h("div",[
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({name: "RiskBearingState", params: {id: params.row.id,riskShareFlowName:params.row.riskShareFlowName}})
                      }
                    }
                  }, '审核'),
                  // h('Button', {
                  //   props: {
                  //     type: 'info',
                  //     size: 'small',
                  //     icon: 'eye'
                  //   },
                  //   style: {
                  //     marginRight: '5px'
                  //   },
                  //   on: {
                  //     click: () => {
                  //       this.$router.push({name: "RiskBearingDetail", params: {id: params.row.id}})
                  //     }
                  //   }
                  // }, '查看')
                ]

                )
              }
          }
        ],
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: false,
        loadingMo: true,
        activeEdit: "",
      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      this.getTableData();
      this.getDict();
    },
    methods: {

      getDict(){
        this.getCodeTable('21', data => {
          this.purposeList = data;
        });
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
      search(){//搜索
        this.current = 1;
        this.getTableData();
      },
      getTableData (){//请求
        this.tableData = [];
        this.loading = true;
        riskshareServer.listForFlow({
          params4:this.current,
          params5: this.pageSize,
        }, {
          period: this.keyWord.period,
          productId: this.keyWord.productId,
          userId: this.keyWord.userId
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

      }
    }
  }
</script>

<style lang='less'>
</style>
