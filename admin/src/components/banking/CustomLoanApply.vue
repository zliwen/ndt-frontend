/**
* 金融机构贷款申请管理
* Created by chenchen on 2017/9/7.
*/

<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col :xs='22' :sm='18' :md='20' :lg='22'>
      <span>机构:</span>
      <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.orgId" placeholder="产品">
            <Option v-for="item in orgList" :value="item.id"
                    :key="item.id">{{item.name}}</Option>
          </Select>
        </span>
      <span>状态:</span>
      <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.state" placeholder="申请状态">
            <Option v-for="item in stateList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </span>
      <Button type="success" icon="search" @click="search">搜索</Button>
      </Col>

      <Col :xs='2' :sm='6' :md='4' :lg='2'>
      <Button icon="plus-round" type="info" @click="newCallback">我要贷款</Button>
      </Col>
    </Row>

    <Table border :columns="tableHeard" :data="tableData" v-show="!loading"></Table>
    <Page :total="total" :current="current" :page-size="pageSize"
          show-total show-elevator show-sizer
          v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
    ></Page>
  </div>
</template>

<script>
  import loanApplyServer from 'rs/loanApplyServer'
  import productServer from 'rs/productServer';
  import userServer from 'rs/userServer';
  import loanInvitationServer from 'rs/loanInvitationServer';

  export default {
    name: 'FinanceLoanApply',
    data () {

      return {
        activeId: "",
        state: "",
        addModal: false,
        modalTitle: "修改状态",
        addLoading: true,
        orgList: [],
        stateList: [],
        countyList: [],
        townList: [],
        villageList: [],
        ruleCustom: {},
        keyWord: {
          orgId: null,
          state: null
        },
        tableHeard: [
          {
            title: '贷款流水号',
            render: (h, params) => {
              return h('span', params.row.id);
            }
          },
          {
            title: '申请产品名称',
            render: (h, params) => {
              return h('span', params.row.loanProductName);
            }
          },
          {
            title: '机构',
            render: (h, params) => {
              return h('span', params.row.orgName);
            }
          },
          {
            title: '申请金额',
            render: (h, params) => {
              if(params.row.applyAmount) return h('span', params.row.applyAmount + "(" +
                this.getCodeName(params.row.applyAmountUnit) + ")");
              else return h('span',"未填写");
            }

          },
          {
            title: '贷款期限',
            render: (h, params) => {
              if(params.row.applyTerm)return h('span', params.row.applyTerm + "(" +
                this.getCodeName(params.row.applyTermUnit) + ")");
              else return h('span',"未填写");
            }

          },
          {
            title: '贷款用途',
            render: (h, params) => {
              return h('span', this.getCodeName(params.row.applyPurpose));
            }

          },
          {
            title: '贷款方式',
            render: (h, params) => {
              if (params.row.guaranteeTypeValue && params.row.guaranteeTypeValue.length) {
                let dk=""
                params.row.guaranteeType.forEach((item,index)=>{
                  dk+=this.getCodeName(item)+(index==params.row.guaranteeType.length-1?"":",")
                });
                return dk;
              }
              return ""
            }
          },
          {
            title: '抵质押物',
            render: (h, params) => {
              if (params.row.guaranteeTypeItems && params.row.guaranteeTypeItems.length) {
                let arr = [];
                params.row.guaranteeTypeItems.forEach(item => {
                  if (item) arr.push(h('p', item.name))
                });
                return arr;
              }
              return ""
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span',  this.getCodeName(params.row.period));
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {
              if (params.row.period == 3801) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'info',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.activeId = params.row.id;
                        loanApplyServer.deleteApply({}, [params.row.id], response => {
                          this.getTableData();
                        })
                      }
                    }
                  }, "取消申请")
                ]);
              }

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
      this.getOrgList();

    },
    methods: {
      getOrgList(){
        this.getCodeTable('38', data => {
          this.stateList = data;
        });
        userServer.findOrgList({
          params3: 1,
          params4: 57,
        }, {}, response => {
          if (response.errorCode == 0) {
            if (response.data) this.orgList = response.data.pageData;
          } else {

          }
        }, function () {
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
      search(){//搜索
        this.current = 1;
        this.getTableData();
      },
      getTableData (){//请求
        this.tableData = [];
        this.loading = true;
        this.$router.push('/banking/customloan-apply?current='
          + this.current + "&pageSize=" + this.pageSize);
        loanApplyServer.list4Front({
          params2: this.current,
          params3: this.pageSize,
        }, {
          userId:this.session.get("userType")==201?null:this.session.get("userId"),
          orgId: this.keyWord.orgId,
          state: this.keyWord.state
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
      newCallback(){
        this.$router.push({name: "CustomLoanApplyAdd"})

      },
      modalSubmit () {//模态弹窗确定事件
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
</style>
