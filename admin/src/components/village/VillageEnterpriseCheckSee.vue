/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="VillageEnterpriseAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/village/village-enterprise">农业经营主体</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Tabs v-model="tabName" @on-click="tabClick">
        <TabPane label="基础信息" name="name1">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              农业经营主体基础信息
            </p>

            <Form ref="formBase" :model="formBase" :label-width="160">
              <Row>
                <Col span="24" class="clearFix codeObj">
                  <FormItem label="经营主体代码：" :label-width="130">
                  	<label v-text="formBase.code"></label>
                  </FormItem>
                </Col>
                <Col span="8">
                <FormItem class="codeType" label="经营主体代码类型：" :label-width="130">
                  <label v-for="item in loanTypeList" v-if="item.id == formBase.certificateType" v-text="item.value"></label>
                </FormItem>
                <FormItem class="codeNb" label="经营主体名称：" :label-width="130">
                  <label v-text="formBase.name"></label>
                </FormItem>
                <FormItem label="所在区域：" :label-width="130">
                  <label v-text="formBase.divisionId"></label>
                </FormItem>
                </Col>
                <Col span="9">
                <FormItem label="生产经营规模：">
                  <label v-text="formBase.businessSize"></label>
                  <span v-for="item in businessSizeUnitList" v-if="formBase.businessSize!=null && item.id == formBase.businessSizeUnit" v-text="item.value"></span>
                </FormItem>
                <FormItem label="经营收入：">
                  <label v-text="formBase.businessIncome"></label>
                  <label v-text="formBase.businessIncomeUnit"></label>
                </FormItem>
                <FormItem label="成员人数：">
                  <label v-text="formBase.memberTotal"></label>
                </FormItem>
                </Col>
                <Col span="7">

                <FormItem label="生产经营类型：">
                  <label v-for="item in productionTypeList" v-if="item.id == formBase.productionType" v-text="item.value"></label>
                </FormItem>
                <FormItem label="登记注册类型：">
                  <label v-for="item in companyTypeList" v-if="item.id == formBase.companyType" v-text="item.value"></label>
                </FormItem>

                </Col>
                <Col span="15">
                <FormItem label="注册地址：" :label-width="130">
                  <label v-text="formBase.address"></label>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                <FormItem label="法人代表姓名：" :label-width="130">
                  <label v-text="formBase.legalPerson"></label>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="法人代表联系方式：">
                  <label v-text="formBase.legalPersonPhone"></label>
                </FormItem>
                </Col>
                <Col span="10">
                <FormItem label="法人代表身份证号：">
                  <label v-text="formBase.legalPersonIdentityId"></label>
                </FormItem>
                </Col>

              </Row>
            </Form>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              获得相关权证情况
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>权证名称</th>
                <th>描述</th>
                <th>权证编号</th>
                <th>发放时间</th>
                <th>是否抵押</th>
                <th>抵押时间</th>
                <th>抵押金额</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in warrantList">
                <td>
                  <label v-for="sub in warrantNameList" v-if="sub.id == item.name"  v-text="sub.value"></label>
                </td>
                <td>
                  <label v-text="item.remark"></label>
                </td>
                <td>
                  <label v-text="item.code"></label>
                </td>
                <td>
                  <label v-text="item.grantTime"></label>
                </td>
                <td>
                  <label v-text="item.isMortgage"></label>
                </td>
                <td>
                  <label v-text="item.mortgageTime"></label>
                </td>
                <td>
                  <label v-text="item.mortgageMoney"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              参保信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>参加保险类型</th>
                <th>保险金额(元)</th>
                <th>参保日期</th>
                <th>保险到期日期</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in insuranceList">
                <td>
                  <label v-text="item.insuranceType"></label>
                </td>
                <td>
                  <label v-text="item.insuranceAmt"></label>
                </td>
                <td>
                  <label v-text="item.insuranceTime"></label>
                </td>
                <td>
                  <label v-text="item.insuranceDuetime"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              信用称号信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>获得信用称号情况</th>
                <th>取得信用称号年度</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in creditList">
                <td>
                  <label v-text="item.situation"></label>
                </td>
                <td>
                  <label v-text="item.year"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              财务指标信息
            </p>
            <Form ref="formFinance" :model="formFinance" :rules="formFinanceCustom" :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="目前贷款余额(元)：" :label-width="120">
                  <label v-text="formFinance.loanBalance"></label>
                </FormItem>
                <FormItem label="资产年度：" :label-width="120">
                  <label v-text="formFinance.calendarYear"></label>
                </FormItem>

                </Col>
                <Col span="8">
                <FormItem label="资产信息：" :label-width="120">
                  <label v-text="formFinance.financeData"></label>
                </FormItem>
                <FormItem label="所有者权益：" :label-width="120">
                  <label v-text="formFinance.ownerEquity"></label>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="资产负债：" :label-width="120">
                  <label v-text="formFinance.debtAmt"></label>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
        </TabPane>
        <TabPane label="辅助信息" name="name2">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              用工信息（用户采集）
            </p>
            <Form ref="formBase" :model="formBase" :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="用工人数：" :label-width="120">
                  <label v-text="formBase.workerTotal"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="用工时间：" :label-width="120">
                  <label v-text="formBase.workerTime"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="用工工资：" :label-width="120">
                  <label v-text="formBase.workerMoney"></label>
                </FormItem>
                </Col>
              </Row>
            </Form>
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              其他情况（金融服务站采集）
            </p>
            <Form ref="formBase" :model="formBase" :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="社会公德：" :label-width="120">
                  <label v-for="item in socialMoralityList" v-if="item.id == formBase.socialMorality" v-text="item.value"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="经营历史：" :label-width="120">
                  <label v-text="formBase.operatingHistory"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="经营情况：" :label-width="120">
                  <label v-for="item in operationSituationList" v-if="item.id == formBase.operationSituation" v-text="item.value"></label>
                </FormItem>
                </Col>
              </Row>
            </Form>
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              企业评价信息
            </p>
            <h2><span>荣誉称号</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>荣誉称号</th>
                <th>获得时间</th>
                <th>荣誉级别</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in honorList">
                <td>
                  <label v-text="item.honorName"></label>
                </td>
                <td>
                  <label v-text="item.awardDate"></label>
                </td>
                <td>
                  <label v-for="item in levelList" v-if="item.id == item.level" v-text="item.value"></label>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>资质</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>资质名称</th>
                <th>获得时间</th>
                <th>资质级别</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in honor1List">
                <td>
                  <label v-text="item.honorName"></label>
                </td>
                <td>
                  <label v-text="item.awardDate"></label>
                </td>
                <td>
                  <label v-for="item in levelList" v-if="item.id == item.level" v-text="item.value"></label>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>知识产权</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>产权名称</th>
                <th>获得时间</th>
                <th>登记号</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in knowledgeList">
                <td>
                  <label v-text="item.name"></label>
                </td>
                <td>
                  <label v-text="item.awardDate"></label>
                </td>
                <td>
                  <label v-text="item.registrationNumber"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              其它情况
            </p>
            <Form ref="formBase" :model="formBase" :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="法院黑名单：" :label-width="120">
                  <label v-text="formBase.isCourtBlacklist"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="工商黑名单：" :label-width="120">
                  <label v-text="formBase.isBusinessBlacklist"></label>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="法院执行：" :label-width="120">
                  <label v-text="formBase.isCourtEnforcement"></label>
                </FormItem>
                </Col>
              </Row>
            </Form>
            <h2><span>添加奖励/处罚</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>奖励或处罚 </th>
                <th>类型</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in rewardList">
                <td>
                  <label v-for="item in reorpuTypeList" v-if="item.id == item.reorpuType" v-text="item.value"></label>
                </td>
                <td>
                  <label v-text="item.type"></label>
                </td>
                <td>
                  <label v-text="item.awardDate"></label>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>添加信用评价</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>评价</th>
                <th>等级</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in evaluationList">
                <td>
                  <label v-for="item in evaluateTypeList" v-if="item.id == item.evaluateType" v-text="item.value"></label>
                </td>
                <td>
                  <label v-text="item.level"></label>
                </td>
                <td>
                  <label v-text="item.evaluateDate"></label>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>添加专利资质</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>专利资质名称</th>
                <th>专利资质编号</th>
                <th>获得时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in patentList">
                <td>
                  <label v-text="item.patentName"></label>
                </td>
                <td>
                  <label v-text="item.patentNo"></label>
                </td>
                <td>
                  <label v-text="item.acquireDate"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
        </TabPane>
        <TabPane label="交易信息" name="name3">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              缴费情况
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>缴费类型</th>
                <th>缴费月份</th>
                <th>用量</th>
                <th>缴费金额(元)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in paymentList">
                <td>
                  <label v-text="item.payType"></label>
                </td>
                <td>
                  <label v-text="item.payDate"></label>
                </td>
                <td>
                  <label v-text="item.consumption"></label>
                </td>
                <td>
                  <label v-text="item.payAmt"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              采购信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th>采购物资名称</th>
                <th>采购金额</th>
                <th>采购采购时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in purchaseList">
                <td>
                  <label v-text="item.purchaseMaterial"></label>
                </td>
                <td>
                  <label v-text="item.purchaseAmt"></label>
                </td>
                <td>
                  <label v-text="item.purchaseDate"></label>
                </td>
              </tr>
              </tbody>
            </table>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>

  import creditServer from 'rs/credit';
  import otherServer from 'rs/otherServer';
  import villageCompanyBaseInfoServer from 'rs/villageCompanyBaseInfo';
  import villageCompanyWarrantServer from 'rs/villageCompanyWarrant';
  import villageCompanyInsuranceServer from 'rs/villageCompanyInsurance';
  import villageCompanyCreditServer from 'rs/villageCompanyCredit';
  import villageCompanyFinanceServer from 'rs/villageCompanyFinance';
  import villageCompanyPaymentServer from 'rs/villageCompanyPayment';
  import villageCompanyPurchaseServer from 'rs/villageCompanyPurchase';
  import villageCompanyHonorServer from 'rs/villageCompanyHonor';
  import villageCompanyKnowledgeServer from 'rs/villageCompanyKnowledge';


  import villageCompanyRewardServer from 'rs/villageCompanyReward';
  import villageCompanyEvaluationServer from 'rs/villageCompanyEvaluation';
  import villageCompanyPatentServer from 'rs/villageCompanyPatent';

  export default {
    name: 'VillageEnterpriseCheckSee',
    props: ["orgItemData"],
    data () {
      return {
        tabName:this.$route.query.tabName||"name1",
        villageCompanyInfoId: "",
        title: "查看农业经营主体",
        houseArray: [{}],
        id: this.$route.query.id,
        isSee:this.$route.query.isSee,
        userType:this.session.get("userType"),
        formBase: {
          name: null,
          certificateType: null,
          code: null,
          memberTotal: null,
          workerTime:null,
          workerTotal:null,
          businessSize:null,
          workerMoney:null,
          businessIncome:null
        },
        formFinance:{
          loanBalance:"",
          calendarYear:"",
          debtAmt:"",
          financeData:"",
          ownerEquity:""
        },
        formFinanceCustom:{
          loanBalance:[],
          calendarYear:[],
          debtAmt:[],
          financeData:[],
          ownerEquity:[]
        },

        warrantList: [],
        insuranceList:[],
        creditList:[],
        honorList:[],
        honor1List:[],
        patentList:[],
        knowledgeList:[],
        evaluationList:[],
        rewardList:[],


        paymentList:[],
        purchaseList:[],

        loanTypeList: [],
        businessIncomeUnitList: [],
        businessSizeUnitList: [],
        companyTypeList: [],
        productionTypeList: [],
        warrantNameList:[],
        socialMoralityList:[],
        operationSituationList:[],
        levelList:[],
        cityList: []

      }
    },
    created: function () {
      if (this.id) {
        villageCompanyBaseInfoServer.findById({id: this.id}, {}, reponse => {
          reponse.data.isCourtBlacklist=reponse.data.isCourtBlacklist?"是":"否";
          reponse.data.isBusinessBlacklist=reponse.data.isBusinessBlacklist?"是":"否";
          reponse.data.isCourtEnforcement=reponse.data.isCourtEnforcement?"是":"否";
          if(reponse.data){
          	this.formBase = reponse.data;
          	if(this.formBase.divisionId != null){
          		otherServer.getCityDetails({params3: this.formBase.divisionId}, {}, response => {
			      if (response.errorCode == 0) {
			      	this.formBase.divisionId = response.data.fullName
			      }
			    }, err => {
			
			    })
          	}
          }
        }, err => {

        });
        villageCompanyWarrantServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length)reponse.data.forEach(item=>{
            item.isMortgage=item.isMortgage?"是":"否";
          });
          if(reponse.data&&reponse.data.length){
            this.warrantList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyInsuranceServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.insuranceList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyCreditServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.creditList = reponse.data;
          }else {
          }
        }, err => {

        });

        villageCompanyFinanceServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data) this.formFinance = reponse.data;
        }, err => {

        });

        villageCompanyPaymentServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.paymentList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyPurchaseServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.purchaseList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyHonorServer.findByBaseInfoId({baseInfoId: this.id,type:0}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.honorList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyHonorServer.findByBaseInfoId({baseInfoId: this.id,type:1}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.honor1List = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyKnowledgeServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.knowledgeList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyPatentServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.patentList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyRewardServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.rewardList = reponse.data;
          }else {
          }
        }, err => {

        });
        villageCompanyEvaluationServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.evaluationList = reponse.data;
          }else {
          }
        }, err => {

        });

      }
      
      this.getCodeTable('55', data => {
        this.loanTypeList = data;
      });
      this.getCodeTable('58', data => {
        this.businessSizeUnitList = data;
      });
      this.getCodeTable('56', data => {
        this.companyTypeList = data;
      });
      this.getCodeTable('58', data => {
        this.businessIncomeUnitList = data;
      });
      this.getCodeTable('57', data => {
        this.productionTypeList = data;
      });
      this.getCodeTable('59', data => {
        this.warrantNameList = data;
      });
      this.getCodeTable('60', data => {
        this.socialMoralityList = data;
      });
      this.getCodeTable('61', data => {
        this.operationSituationList = data;
      });
      this.getCodeTable('62', data => {
        this.levelList = data;
      });
      this.getCodeTable('63', data => {
        this.reorpuTypeList = data;
      });
      this.getCodeTable('64', data => {
        this.evaluateTypeList = data;
      });

    },
    methods: {
      tabClick(name){
        this.tabName=name;
        this.$router.push({name: "VillageEnterpriseCheckSee", query: {id: this.id,tabName:this.tabName,isSee:this.isSee}})
      }
    }
  }
</script>

<style lang='less'>
  .VillageEnterpriseAdd {
    .ivu-card {
      margin: 20px 0;
    }
    .ivu-form .ivu-form-item-label {
      padding-right: 0px;
    }
    .codeObj {
      border-bottom: 1px dashed #ededed;
      >div {
        float: left;
      }
      .codeType {
        width: 250px;
      }
      .codeNb {
        width: 450px;
      }
      .codeBtn {
        padding-left: 20px;
        b {
          color: #c00;
        }
      }
    }
    .save-btn {
      display: block;
      padding-left: 30px;
      padding-right: 30px;
      margin: 20px auto;
    }
    .addBtn{ text-align: center;}
    td{ text-align: center; padding: 6px;}
    thead{ background: #f1f1f1; padding: 10px 0; line-height: 40px;}
    table{ border: 1px solid #ededed;}
    h2{ font-size: 16px; margin: 40px 0 0; line-height: 40px;
      border-bottom: 1px solid #ededed; color: #222;
      span{display: inline-block; padding: 0 20px; background: #ededed; width: 170px; text-align: center;}
    }
  }
</style>
