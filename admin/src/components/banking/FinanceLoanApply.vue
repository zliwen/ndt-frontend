/**
* 金融机构贷款申请管理
* Created by chenchen on 2017/9/7.
*/

<template>
  <div class="FinanceLoan">
    <Loading v-show="loading"></Loading>
    <Row style="margin-bottom: 15px;">
      <Col>
      <span>产品:</span>
      <span style="display: inline-block; width: 200px;">
        <Input v-model="keyWord.productId" placeholder="输入产品名称"></Input>
        </span>
       <span>用户名或手机号:</span>
      <span style="display: inline-block; width: 200px;">
         <Input v-model="keyWord.userId" placeholder="用户名或手机号"></Input>
        </span>
      <span>状态:</span>
      <span style="display: inline-block; width: 200px;">
          <Select v-model="keyWord.period" clearable placeholder="申请状态">
            <Option :value="0">全部</Option>
            <Option v-for="item in stateList" :value="item.id" :key="item.id">{{item.value}}</Option>
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

  </div>
</template>

<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import productServer from 'rs/productServer';
  import userServer from 'rs/userServer';
  import {formatDate} from "@/filters/date";
  export default {
    name: 'FinanceLoanApply',
    data () {

      return {
        userIdLoading: false,
        productIdLoading: false,
        stateList: [],
        purposeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        ruleCustom: {},
        keyWord: {
          period: "",
          productId: "",
          userId: ""
        },
        tableHeard: [

          {
            title: '序号',
             width: 70,
            render: (h, params) => {
              return h('span', params.index+1+((this.current-1)*this.pageSize));
            }
          },
          // {
          //   title: '申请产品',
          //   render: (h, params) => {
          //     if(params.row.productName) return h('span', params.row.productName);
          //   }
          // },
          {
            title: '申请信息',
            render: (h, params) => {
              let arr = [];
              if(params.row.id)arr.push(h('p', [h('span', '业务号:'), h('b', params.row.id)]))
              if(params.row.productName)arr.push(h('p', [h('span', '产品名称:'), h('b', params.row.productName)]))
              if(params.row.orgName)arr.push(h('p', [h('span', '银行:'), h('b', params.row.orgName)]))
              return arr;
            }
          },
          {
            title: '贷款主体',
            render: (h, params) => {//<Icon type=""></Icon>
              let arr = [];
              if(params.row.name)arr.push(h('p', [h('span', '申请人:'),
                                                  h('b', params.row.name),
                                                  params.row.isMajarProject?h('Icon',{
                                                    props: {
                                                      type: 'ios-home',
                                                      size: 16,
                                                    },
                                                    class:["person-ico","isMajarProject"],
                                                    style: {
                                                      color:"#4393c4",
                                                      marginRight: '5px',
                                                      marginLeft: '10px'
                                                    },
                                                  }):"",
                                                  params.row.isFarm?h('Icon',{
                                                    props: {
                                                      type: 'ribbon-b',
                                                      size: 16,
                                                    },
                                                    class:["person-ico","isFarm"],
                                                    style: {
                                                      color:"#e7a020",
                                                      marginRight: '5px',
                                                      marginLeft: '10px'
                                                    },
                                                  }):'',
                                                  params.row.isCooperation?h('Icon',{
                                                    props: {
                                                      type: 'ribbon-b',
                                                      size: 16,
                                                    },
                                                    class:["person-ico","isCooperation"],
                                                    style: {
                                                      color:"#e7a020",
                                                      marginRight: '5px',
                                                      marginLeft: '10px'
                                                    },
                                                  }):'',
                                                  params.row.isLeadingEnterprice?h('Icon',{
                                                    props: {
                                                      type: 'ribbon-b',
                                                      size: 16,
                                                    },
                                                    class:["person-ico","isLeadingEnterprice"],
                                                    style: {
                                                      color:"#e7a020",
                                                      marginRight: '5px',
                                                      marginLeft: '10px'
                                                    },
                                                  }):'',
                                                  params.row.isLargeAgriculturalFamily?h('Icon',{
                                                    props: {
                                                      type: 'ribbon-b',
                                                      size: 16,
                                                    },
                                                    class:["person-ico","isLargeAgriculturalFamily"],
                                                    style: {
                                                      color:"#e7a020",
                                                      marginRight: '5px',
                                                      marginLeft: '10px'
                                                    },
                                                  }):'',
                                        ]))
              if(params.row.userTypeValue)arr.push(h('p', [h('span', '类型:'), h('b', params.row.userTypeValue)]))
              if(params.row.adminDivisionIdValue)arr.push(h('p', [h('span', '地址:'), h('b', params.row.adminDivisionIdValue)]))
              if(params.row.mobile)arr.push(h('p', [h('span', '电话:'), h('b', params.row.mobile)]))

              return arr;
            }
          },
          {
            title: '贷款信息',
            render: (h, params) => {
              let dk="";
              if(params.row.guaranteeTypeName&&params.row.guaranteeTypeName.length){
                params.row.guaranteeTypeName.forEach((item,index)=>{
                  dk+=item+(index==params.row.guaranteeType.length-1?"":",")
                });

              }

              let arr = [];
              if(params.row.applyAmount) arr.push(h('p', [h('span', '金额:'), h('b', params.row.applyAmount +'('+
                this.getCodeName(params.row.applyAmountUnit)+')')]))
              else arr.push(h('p', [h('span', '金额:'), h('b', "未填写")]))
              if(params.row.applyTerm) arr.push(h('p', [h('span', '期限:'), h('b', params.row.applyTerm +'('+
                this.getCodeName(params.row.applyTermUnit)+')')]))
              else arr.push(h('p', [h('span', '期限:'), h('b', "未填写")]))
              if(dk)  arr.push(h('p', [h('span', '贷款方式:'), h('b', dk)]))
              if(params.row.applyPurpose) arr.push(h('p', [h('span', '贷款用途:'), h('b', this.getCodeName(params.row.applyPurpose))]))
              if(params.row.createAt) arr.push(h('p', [h('span', '申请时间:'), h('b', formatDate(params.row.createAt))]))
              return arr;
            }

          },
          {
            title: '状态',
            render: (h, params) => {
              return h('span', this.getCodeName(params.row.stateValue));
            }

          },
          {
            title: '操作',
            key: 'action',
            width: 280,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                (params.row.period==3801||params.row.period==3802)?(h('Button', {
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
                      this.$router.push({name: "FinanceLoanApplyState", params: {id: params.row.id}})
                    }
                  }
                }, "处理")):"",
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: "FinanceLoanApplyDetail", params: {id: params.row.id}})
                    }
                  }
                }, '查看')/*,
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
                }, '关闭')*/

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
        activeEdit: "",
      }
    },
    created: function () {
      this.$route.query;
      if (this.$route.query.current) this.current = parseInt(this.$route.query.current);
      if (this.$route.query.pageSize) this.pageSize = parseInt(this.$route.query.pageSize);
      if (this.$route.query.productId) this.keyWord.productId = this.$route.query.productId;
      if (this.$route.query.userId) this.keyWord.userId = this.$route.query.userId;
      if (this.$route.query.period) this.keyWord.period = parseInt(this.$route.query.period);
      this.getTableData();
      this.getDict();
    },
    methods: {
      getDict(){
        this.getCodeTable('38', data => {
          this.stateList = data;
        });
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
        this.$router.push('financeloan-apply?current=' + this.current + "&pageSize=" + this.pageSize
          +"&productId="+this.keyWord.productId+"&userId="+this.keyWord.userId+"&period="+this.keyWord.period);
        loanInvitationServer.list({
          params2: this.current,
          params3: this.pageSize
        }, {
          period: this.keyWord.period?this.keyWord.period:null,
          productName: this.keyWord.productId,
          userName: this.keyWord.userId
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

<style lang="less">
.ivu-table-cell{
  padding: 10px 20px;
  p{
    line-height: 1.5;
    .person-ico{
      position: relative;
      cursor: pointer;
    }
    .person-ico:after{
      color:#000;
      display: none;
      position: absolute;
      left:-50%;
      height: 20px;
      line-height: 18px;
      border-radius: 10px;
      font-size: 12px;
      background-color: #fcfffc;
      text-align: center;
      border:1px solid #d0d0d0;
    }
    .person-ico.isMajarProject:after{
      content:'重点支持项目';
      width: 92px;
      left:-42px;
    }
    .person-ico.isFarm:after{
      content:'家庭农场';
      width: 72px;
      left:-30px;
    }
    .person-ico.isCooperation:after{
      content:'专业合作社';
      width: 80px;
      left:-34px;
    }
    .person-ico.isLeadingEnterprice:after{
      content:'龙头企业';
      width: 72px;
      left:-30px;
    }
    .person-ico.isLargeAgriculturalFamily:after{
      content:'农业大户';
      width: 72px;
      left:-30px;
    }
    .person-ico:hover:after{
      display: block;
    }
  }
}
</style>
