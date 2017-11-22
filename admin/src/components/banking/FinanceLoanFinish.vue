/**
* 金融机构已放款贷款管理
* Created by chenchen on 2017/9/7.
*/
<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col>
      <span>产品:</span>
      <span style="display: inline-block; width: 200px;">
        <Input v-model="keyWord.productName" placeholder="输入产品名称"></Input>

        </span>
      <span>用户名或手机号:</span>
      <span style="display: inline-block; width: 200px;">
         <Input v-model="keyWord.userName" placeholder="用户名或手机号"></Input>
        </span>
      <span>状态:</span>
      <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.backState" placeholder="申请状态">
            <Option :value="0">全部</Option>
            <Option v-for="item in stateList" :value="item.name" :key="item.name"></Option>
          </Select>
        </span>
      <span>贷款用途:</span>
      <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.applyPurpose" placeholder="贷款用途">
            <Option :value="0">全部</Option>
            <Option v-for="item in applyPurposeList" :value="item.id" :key="item.name">{{item.value}}</Option>
          </Select>
        </span>
      <Button type="success" icon="search" @click="search">搜索</Button>
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
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-ok="modalSubmit"
      width="900">
    </Modal>
  </div>
</template>

<script>
  import loanDoneServer from 'rs/loanDoneServer';
  import productServer from 'rs/productServer';
  import riskshareServer from 'rs/riskshareServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'FinanceLoanApply',
    data () {

      return {
        keyWord: {
          productName: "",
          backState: "",
          applyPurpose: "",
          userName: ""
        },
        stateList: [],
        applyPurposeList: [],
        tableHeard: [
          {
            title: '序号',
            width: 70,
            render: (h, params) => {
              return h('span', (params.index+1)+(this.current-1)*this.pageSize);
            }
          },
          {
            title: '贷款主体',
            render: (h, params) => {
              let arr = [];
              arr.push(h('p', [h('span', '申请人:'), h('b', params.row.name)]))
              arr.push(h('p', [h('span', '类型:'), h('b', this.getCodeName(params.row.userType))]))
              arr.push(h('p', [h('span', '地址:'), h('b', params.row.address)]))
              arr.push(h('p', [h('span', '电话:'), h('b', params.row.mobile)]))
              return arr;
            }
          },
          {
            title: '贷款申请信息',
            render: (h, params) => {
              let dk = ""
              params.row.guaranteeTypeValue.forEach((item, index) => {
                dk += item + (index == params.row.guaranteeType.length - 1 ? "" : ",")
              });

              let arr = [];
              if( params.row.applyAmount)arr.push(h('p', [h('span', '申请金额:'), h('b', params.row.applyAmount + '(' +
                params.row.applyAmountUnitValue + ')')]))
              else arr.push(h('p', [h('span', '申请金额:'),h('b',"未填写")]))
              if( params.row.applyTerm)arr.push(h('p', [h('span', '贷款期限:'), h('b', params.row.applyTerm + '(' +
                params.row.applyTermUnitValue + ')')]))
              else arr.push(h('p', [h('span', '贷款期限:'),h('b',"未填写")]))
              arr.push(h('p', [h('span', '贷款方式:'), h('b', dk)]))
              arr.push(h('p', [h('span', '贷款用途:'), h('b', params.row.applyPurposeValue)]))
              arr.push(h('p', [h('span', '贷款产品:'), h('b', params.row.productName)]))
              arr.push(h('p', [h('span', '产品机构:'), h('b', params.row.orgName)]))
              return arr;
            }
          },
          {
            title: '放款信息',
            render: (h, params) => {
              let dk = ""
              params.row.actualGuaranteeTypeValue.forEach((item, index) => {
                dk += item + (index == params.row.guaranteeType.length - 1 ? "" : ",")
              });

              let arr = [];
              // arr.push(h('p', [h('span', '放款金额:'), h('b', params.row.actualAmount +'('+
              //   params.row.applyAmountUnitValue+')')]))
              if( params.row.actualAmount)arr.push(h('p', [h('span', '放款金额:'), h('b', params.row.actualAmount + '(元)')]))
              else arr.push(h('p', [h('span', '放款金额:'),h('b',"未填写")]))
              if( params.row.actualTerm)arr.push(h('p', [h('span', '贷款期限:'), h('b', params.row.actualTerm + '(' +
                params.row.actualTermUnitValue + ')')]))
              else arr.push(h('p', [h('span', '贷款期限:'),h('b',"未填写")]))
              arr.push(h('p', [h('span', '贷款方式:'), h('b', dk)]))
              arr.push(h('p', [h('span', '担保公司:'), h('b', params.row.guaranteeCompany)]))
              if( params.row.actualTime)arr.push(h('p', [h('span', '放款时间:'), h('b', formatDate(params.row.actualTime))]))
              else arr.push(h('p', [h('span', '放款时间:'),h('b',"未填写")]))
              arr.push(h('p', [h('span', '还款方式:'), h('b', params.row.paybackTypeValue)]))
              arr.push(h('p', [h('span', '放款产品:'), h('b', params.row.productName)]))
              arr.push(h('p', [h('span', '产品机构:'), h('b', params.row.actualOrgName)]))
              return arr;
            }

          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', params.row.stateValue);
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              if (params.row.state == 6902) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'forward'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                         this.$Modal.confirm({
                            title: '申请风险分担',
                            content: '确定将该条贷款添加到在申请风险分担列表？',
                            onOk: () => {
                              this.addRiskShare(params.row)
                            }
                          })

                      }
                    }
                  }, '申请风险分担')
                ]);
              }
              else if (params.row.state == 6904) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'forward'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '申请二次风险分担',
                          content: '该条贷款将再次添加到在申请风险分担列表？',
                          onOk: () => {
                            this.addRiskShare(params.row)
                          }
                        })

                      }
                    }
                  }, '申请二次分担')
                ]);
              }
              else if(params.row.state == 6901||!params.row.state){
                return h('div', [
                  h('Button', {
                    props: {
                      icon: "edit",
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      padding:'5px'
                    },
                    on: {
                      click: () => {
                         this.$Modal.confirm({
                            title: '该条贷款已逾期？',
                            content: '你正在将该条消息标注为逾期，操作不可撤销！',
                            onOk: () => {
                                loanDoneServer.updateState({},{id: params.row.id, state: 6902},
                                  response => {
                                    this.getTableData();
                                  })
                            }
                          })
                      }
                    }
                  }, '标记为已逾期'),
                  h('Button', {
                    props: {
                      icon: "edit",
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginTop: '15px',
                      padding:'5px'
                    },
                    on: {
                      click: () => {
                         this.$Modal.confirm({
                            title: '该条贷款已还清？',
                            content: '你正在将该条贷款标注为还清，操作不可撤销！',
                            onOk: () => {
                                loanDoneServer.updateState({},{id: params.row.id, state: 6907},
                                  response => {
                                    this.getTableData();
                                  })
                            }
                          })
                      }
                    }
                  }, '标记为已还清')
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
        addModal: false,
      }
    },
    created: function () {
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.productName) this.keyWord.productName =this.$route.query.productName;
      if (this.$route.query.backState) this.keyWord.backState = parseInt(this.$route.query.backState);
      if (this.$route.query.applyPurpose) this.keyWord.applyPurpose = parseInt(this.$route.query.applyPurpose);
      if (this.$route.query.userName) this.keyWord.userName = this.$route.query.userName;
      this.getCodeTable('21', data => {
        this.applyPurposeList = data;
      });

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
        this.$router.push('financeloan-finish?current=' + this.current + "&pageSize=" + this.pageSize
          +"&userName="+this.keyWord.userName+"&productName="+this.keyWord.productName+"&backState="+this.keyWord.backState+"&applyPurpose="+this.keyWord.applyPurpose);
        let data = {};
        for (let attr  in this.keyWord) {
          if (this.keyWord[attr] !== 0) {
            data[attr] = this.keyWord[attr];
          }
        }
        loanDoneServer.list({
          params2: this.current,
          params3: this.pageSize,
        }, data, (r) => {
          if (r.errorCode == 0) {
            this.tableData = r.data.pageData;
            this.total = r.data.totalCount;
          }
        }, (e) => {

        })

      },
      addRiskShare({invitationId, actualAmount, applyTime}){
        riskshareServer.addToRiskShare({}, {
          invitationId,
          loanDoneAmount: actualAmount,
          loanApplyTime: applyTime
        }, (r) => {
          if (r.errorCode == 0) {
            this.$Message.success("成功提交申请")
          }
          else {
            this.$Message.error("失败")
          }
          this.getTableData();
        }, (e) => {
          this.$Message.error("失败")
        })
      },
      modalSubmit () {//模态弹窗确定事件
      },
      getCodeName(){

      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">

</style>
