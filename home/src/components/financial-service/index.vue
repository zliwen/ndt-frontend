<template>
  <div class="financial-service-index">
    <div class="sp">
      <div class="banner">
        <img src="../../assets/images/banner3.png" alt="">
      </div>
      <Row class="contentBox item1 clearfix">
        <Col :md="12" :lg="12" class="left">
        <ul class="clearfix">
          <li class="f1">
            <h2>{{show.amt}}{{show.amt1}}</h2>
            <p>成功放款金额</p>
          </li>
          <li class="f2">
            <h2>{{show.count+'笔'}}</h2>
            <p>成功放款笔数</p>
          </li>
          <li class="f3">
            <h2>{{show.lendingAmt}}{{show.lendingAmt1}}</h2>
            <p>受理金额</p>
          </li>
          <li class="f4">
            <h2>{{show.registerNum+'户'}}</h2>
            <p>注册用户数</p>
          </li>
        </ul>
         <span class="more" @click="open('/bigData')">更多数据></span>
        </Col>
        <Col :md="12" :lg="12" class="right">
        <div class="le">
          <h2>农贷通APP</h2>
          <p>建设信用 连接金融 服务三农</p>
          <!--<Poptip trigger="hover" style="margin-right: 30px">
            <img src="../../assets/images/financial03.png" alt="">
            <img slot="content" src="../../assets/images/right02.png" alt="">
          </Poptip>-->
          <Poptip trigger="hover">
            <img src="../../assets/images/financial06.png" alt="">
            <img slot="content" src="../../assets/images/right02.png" alt="">
          </Poptip>
        </div>
        <img src="../../assets/images/financial08.png" alt="">
        </Col>
      </Row>
    </div>
    <div class="contentBox product">
      <h2 class="title">
        <b>热门产品</b>
        <span>人气产品 为您臻选</span>
      </h2>
      <div class="clearfix" style="padding-left: 70px">
        <template v-if="recommendList.length">
          <div  class="productItem" v-for="item in recommendList" :key="item.id">
            <div>
              <div class="bou">
                <img src="../../assets/images/financial13.jpg" alt="">
                <div class="head">
                  <h3>
                    <!--<img :src="item.logoImageUrl" alt="">-->
                    <b class="overflow" @click="alertDetails(item.id)" style="cursor:pointer;max-width: 150px">{{item.name}}</b>
                    <span class="tag" v-for="tag in item.productToValue" v-text="tag"></span>
                    <span style="width: 100%; display: inline-block;" class="overflow">{{item.orgName}}</span>
                  </h3>
                  <div class="bq clearfix">
                    <span v-for="subItem in item.labels" :key="subItem">{{subItem | codeName}}</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <img src="../../assets/images/financial09.jpg" alt="">
                    <span>最长借款期限</span>
                    <b>{{item.maxTerm}}{{item.mixTermUnit | codeName}}</b>
                  </li>
                  <li>
                    <img src="../../assets/images/financial11.png" alt="">
                    <span>最高借款额度</span>
                    <b>{{item.maxAmount}}{{item.mixAmountUnit | codeName}}</b>
                  </li>
                  <li class="overflow">
                    <img src="../../assets/images/financial12.png" alt="">
                    <span>贷款方式</span>
                    <div class="b overflow" :title="item.loanTypesValue.join('，')">
                      <b v-for="(subItem,index) in item.loanTypes" :key="subItem">
                      {{subItem | codeName}}
                        <i v-if="index!=0">,</i>
                      </b>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="btn" @click="goApplyFor(item)">
                <span>立即申请</span>
              </div>
            </div>
          </div>
        </template>
        <v-no-data v-else style="height:200px" :src="project"></v-no-data>
      </div>

    </div>
    <div class="productAll contentBox" style="padding-bottom: 0">
      <h2 class="title">
        <b>贷款服务</b>
        <span>精细化分 任你挑选</span>
      </h2>
      <project-filter style="padding-left: 30px" @change="filterChange"></project-filter>
      <div class="main">
        <div class="clearfix" v-if="activeCp.length">
          <financial-item :data="item" v-for="(item,index) in activeCp" :key="index" @click.native="$refs.pModal.showModal(item.id);"></financial-item>
        </div>
        <v-no-data v-else style="height:200px" :src="project"></v-no-data>
      </div>
      <Page class="pagef" :total="total"
            :current.sync="current"
            :page-size-opts="pageSizeOpts"
            show-total show-elevator
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
            v-if="activeCp.length"
      ></Page>
    </div>
    <div class="productAll contentBox" >
      <h2 class="title">
        <b>更多机构和服务</b>
        <span class="describe">
           <span class="describe_item" v-for="(item,index) in organization" v-text="item.name" :class="{active:item.active}" @click="changeOrganization(index)" :key="item.index"></span>
         </span>
      </h2>
      <div class="org-container-swiper swiper-container" style="height: 240px;">
        <div class="swiper-wrapper">
          <div class="organization_container swiper-slide">
            <Icon type="ios-arrow-left" size="40" :class="{disable:bankNum===1}" @click.native="getBank(-1)"></Icon>
            <ul class="clearfix" v-show="!bankLoading&&orgBankList.length">
              <li v-for="img in orgBankList" @click="goBank(img)">
                <img :src="img.logoImageUrl" v-if="img.success" @error="img.success = false">
                <div v-else>
                  <img src="../../assets/images/org_no_img.jpg" alt="">
                  <p>
                    <span class="chinese overflow" v-text="img.name"></span>
                    <!--<span class="english overflow" v-text="img.code"></span>-->
                  </p>
                </div>
              </li>
            </ul>
            <v-no-data :src="org" style="height: 240px;" v-show="!bankLoading&&!orgBankList.length"></v-no-data>
            <v-loading style="height: 240px;" v-show="bankLoading"></v-loading>
            <Icon type="ios-arrow-right" size="40" :class="{disable:bankNum>=bankMax}" @click.native="getBank(1)"></Icon>
          </div>
          <div class="organization_container swiper-slide">
            <Icon type="ios-arrow-left" size="40" :class="{disable:baoXianNum===1}" @click.native="getBaoXian(-1)"></Icon>
            <ul class="clearfix" v-show="!baoXianLoading&&orgFinancialList.length">
              <li v-for="img in orgFinancialList" @click="goBank(img)">
                <img :src="img.logoImageUrl" v-if="img.success" @error="img.success = false">
                <div v-else>
                  <img src="../../assets/images/org_no_img.jpg" alt="">
                  <p>
                    <span class="chinese overflow" v-text="img.name"></span>
                    <!--<span class="english overflow" v-text="img.code"></span>-->
                  </p>
                </div>
              </li>
            </ul>
            <v-no-data :src="org" style="height: 240px;" v-show="!baoXianLoading&&!orgFinancialList.length"></v-no-data>
            <v-loading style="height: 240px;" v-show="baoXianLoading"></v-loading>
            <Icon type="ios-arrow-right" size="40" :class="{disable:baoXianNum>=baoXianMax}" @click.native="getBaoXian(1)"></Icon>
          </div>
        </div>
      </div>
      <!--<div class="main clearfix">-->
        <!--<template v-if="baoXianList.length">-->
          <!--<financial-item-for-insure :data="item" v-for="(item,index) in baoXianList" :key="index" @click.native="$refs.pModal.showModal(item.id);"></financial-item-for-insure>-->
        <!--</template>-->
        <!--<v-no-data v-else style="height:200px" :src="project"></v-no-data>-->
      <!--</div>-->
      <!--<Page class="pagef" :total="baoxianTotal"-->
            <!--:current.sync="baoxianCurrent"-->
            <!--show-total show-elevator-->
            <!--:page-size-opts="pageSizeOpts"-->
            <!--v-on:on-change="getBaoXianList"-->
            <!--v-if="baoXianList.length"-->
      <!--&gt;</Page>-->
    </div>
    <vProductModal ref="pModal"></vProductModal>
    <div class="hr"></div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Swiper from "../../config/swiper.min.js"
  import org from "../../assets/images/no_org.png"
  import loanProductServer from "rs/loanProduct"
  import indexServer from "rs/index"
  import {baseURL} from "../../config/constant"
  import goApplyFor from "../../services/goApplyFor"
  import project from "../../assets/images/financial07.png"
  import projectFilter from "../../components/common/projectFilter"
  export default {
    name: 'home',
    data() {
      return {
        organization:[{name:"银行机构",active:true},{name:"保险机构",active:false}],//{name:"担保机构",active:false}
        project:project,
        org:org,
        baoXianObj:{createTimeSort:true},
        bankLoading:false,
        baoXianLoading:false,
        bankNum:1,
        baoXianNum:1,
        bankMax:0,
        baoXianMax:0,
        orgBankList:[],
        orgFinancialList:[],
        total:0,
        current:1,
        pageSize:9,
        baoxianTotal:0,
        baoxianCurrent:1,
        baoXianList:[],
        recommendList: [],
        pageSizeOpts:[9,18,27,36],
        activeCp:[],
        filterObj:{},
        show:{
          amt:0,
          amt1:'元',
          count:0,
          lendingAmt:0,
          lendingAmt1:"元",
          registerNum:0
        }
      }
    },
    components:{projectFilter:projectFilter},
    directives: {},
    computed: {},
    filters: {},
    created: function () {
      this.cityId = this.session.get("cityId")?this.session.get("cityId").slice(0,6):5101;
      this.getBigData();
      this.recommend();
      this.chang();
      this.getBank(0);
      this.getBaoXian(0);
      this.getBaoXianList();
    },
    mounted:function () {
      if(this.$route.query.go) $(".productAll")[0].scrollIntoView();
      //tabs
      this.mySwiper = new Swiper('.org-container-swiper',{
        onlyExternal:true
      })
    },
    watch: {
      '$route': ["getTableData"]
    },
    methods: {
      changeOrganization(index){
        this.organization.forEach((l,i)=>{l.active = i === index});
        this.mySwiper.swipeTo(index,500,false);
      },
      getBank(num){
        if((num>0)&&(this.bankNum===this.bankMax))return;
        if((num<0)&&(this.bankNum===1))return;
        this.bankLoading = true;
        this.bankNum += num;
        indexServer.orgList({data:{orgSubtypes:[3004],adminDivisionId:this.cityId},params:{params4:this.bankNum,params5:8}},({data:{pageData,totalCount}})=>{
          this.bankLoading = false;
          pageData.forEach(l=>{l.logoImageUrl = baseURL + l.logoImageUrl;l.success = true;});
          this.orgBankList = pageData;
          this.bankMax = Math.ceil(totalCount/8);
        });
      },
      getBaoXian(num){
        if((num>0)&&(this.baoXianNum===this.baoXianMax))return;
        if((num<0)&&(this.baoXianNum===1))return;
        this.baoXianNum += num;
        this.baoXianLoading = true;
        indexServer.orgList({data:{orgSubtypes:[3005],adminDivisionId:this.cityId},params:{params4:this.baoXianNum,params5:8}},({data:{pageData,totalCount}})=>{
          this.baoXianLoading = false;
          pageData.forEach(l=>{l.logoImageUrl = baseURL + l.logoImageUrl;l.success = true;});
          this.orgFinancialList = pageData;
          this.baoXianMax = Math.ceil(totalCount/8);
        });
      },
      getBigData(){
        loanProductServer.getData({params:{divisionId:this.cityId}},({data})=>{
          let show = this.show;
          function animate () {
            if (TWEEN.update()) {
              requestAnimationFrame(animate)
            }
          }

          function start(newValue,type) {
            new TWEEN.Tween({ tweeningNumber: 0 })
              .easing(TWEEN.Easing.Quadratic.Out)
              .to({ tweeningNumber: newValue }, 500)
              .onUpdate(function () {
                let ne=this.tweeningNumber?this.tweeningNumber.toFixed(2):0;
                show[type] = ne==this.tweeningNumber?this.tweeningNumber:ne;
              })
              .start();
          }
          start(this.filter(data.areaTotalAmt,'amt1'),"amt");
          start(this.filter(data.lendingAmt,'lendingAmt1'),"lendingAmt");
          start(data.areaTotalCount,"count");
          start(data.userRegisterCount,"registerNum");

          animate()
        });
      },
      filter(value,k){
        if(value<10000)return value;
        let num = value/10000;
        if(value<100000000){
          this.show[k] = "万元";
          let ne=num.toFixed(2)
          return ne==num?num:ne;
        }
        num = value/100000000;
        if(value>=100000000){
          this.show[k] = "亿元";
          let ne=num.toFixed(2)
          return ne==num?num:ne;
        }
      },
      getTableData(){
        if(this.$route.query.go) $(".productAll")[0].scrollIntoView();
      },
      pageChange (current){
        this.current = current;
        this.chang();

      },
      pageSizeChange (pageSize){
        this.current = 1;
        this.pageSize = pageSize;
        this.chang();
      },
      alertDetails:function(id){
        this.$refs.pModal.showModal(id);
      },
      goApplyFor:function (item) {
        goApplyFor(item,this)
      },
      recommend: function () {
        loanProductServer.recommend({params: {params4: 1, params5: 3, type: 3301}}, response => {
          if (response.data) {
            this.recommendList = response.data.pageData;
          }
        }, err => {

        })
      },
      find: function () {
        loanProductServer.find({
          params: {params4: 1, params5: 3},
          data: {productType: 122, orgId: 22}
        }, response => {
          if (response.data) {
            //this.recommendList=response.data.pageData;
          }
        }, err => {

        })
      },
      filterChange(obj){
        this.filterObj = obj;
        this.current = 1;
        this.chang();
      },
      chang:function () {
        let id = this.session.get("cityId");
        loanProductServer.find({
          params: {params4: this.current, params5: this.pageSize},
          data: Object.assign({
            searchType:2,
            divisions:id?[+id]:[]
          },this.filterObj)
        }, response => {
          response.data.pageData.forEach(item=>{
            item.active=false
          });
          this.total=response.data.totalCount;
          if (response.data) this.activeCp=response.data.pageData;
        })
      },
      getBaoXianList(){
        indexServer.findBaoXian({params:{params4:this.baoxianCurrent,params5:9},data:this.baoXianObj},({data:{pageData,totalCount},errorCode})=>{
          if(!errorCode){
            this.baoXianList = pageData;
            this.baoxianTotal = totalCount;
          }
        });
      },
      goBank(item){
        let flag = this.$route.query.tsid;
        if(item.orgSubtype==3004){
          this.$router.push({name:flag?'xianBank':'bank',query:{id:item.id}})
        }else {
          this.$router.push({name:flag?'xianInsurance':'insurance',query:{id:item.id}})
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .hr{ background: #ededed; height: 1px;}
  /*footer{ padding-top: 30px; font-size: 16px !important;}*/
  /*footer .footer_wrapper{ position: static !important;  transform: translate(0, 0) !important;}*/
.financial-service-index{
  .organization_container{
    height: 240px;
    position: relative;
    padding-left: 90px;
    padding-right: 90px;
    text-align: center;
    color: #999;
    .ivu-icon{
      padding-left: 12px;
      padding-right: 13px;
      color: #999;
      cursor: pointer;
      opacity: .5;
      position: absolute;
      top:90px;
      &:nth-of-type(1){
        left: 35px;
      }
      &:nth-last-of-type(1){
        right: 35px;
      }
      &:hover{
        opacity: 1;
      }
      &:active{
        background-color: #f7f7f7;
      }
      &.disable{
        display: none;
        /*cursor: not-allowed;*/
        /*&:hover{opacity: .5}*/
        /*&:active{background-color: transparent}*/
      }
    }
    ul{
      padding-top: 10px;
      padding-bottom: 10px;
      li{
        position: relative;
        float: left;
        width: 240px;
        /*border:1px solid #f2f2f2;*/
        padding: 10px;
        height: 110px;
        background-color: #fff;
        &.noImg{
          padding: 20px;
        }
        div{
          cursor: default;
          width: 100%;
          height: 100%;
          position: relative;
          img{
            position: absolute;
            left:0;
            width: 100%;
          }
          p{
            position: relative;
            color: #000;
            top:40px;
            padding-left: 80px;
            padding-right: 10px;
            text-align: center;
            span.chinese{
              display: inline-block;
              width: 100%;
              /*margin-bottom: 4px;*/
              font-size: 16px;
              line-height: 16px;
            }
            span.english{
              display: inline-block;
              width: 100%;
              font-size: 12px;
              line-height:12px;
              /*transform: scale(.666);*/
            }
          }
        }
        >img{
          max-width: 100%;
          max-height: 100%;
        }
        &:hover{
          /*transform: scale(1.1);*/
          /*box-shadow:0 0 12px #f2f2f2;*/
          padding: 0; cursor:pointer;z-index: 1;
          div,>img{box-shadow:0 0 12px #f2f2f2;}
          p{
            padding-left: 90px;
            top:46px;
          }
        }
      }
    }
  }
  .productAll{
    padding-bottom: 100px;
    .bigM{ text-align: center;
      span{ display: inline-block; height: 30px; line-height: 30px; font-size: 14px;
        color:#000; margin:0 5px;width: 80px;
        &.active,&:hover{ background: #ff762b; color: #fff; cursor: pointer;}
        &.active{ cursor: default;}
      }
    }
    .minM{ text-align: center;
      span{line-height: 40px; font-size: 18px; color: #999999;padding: 4px 0; margin: 0 5px;
        &.active,&:hover{ border-bottom: 1px solid #ff762b;  cursor: pointer;}
        &.active{ cursor: default;}
      }
    }
    .main{
      padding-left:70px;
      .financial-item{
        float: left;
      }
    }
  }
  .title{ border-bottom: 1px solid #e5e5e5; font-size: 20px; height: 50px;  margin-top: 50px;
      margin-bottom: 30px;
      >span{ font-size: 14px; display: inline-block; margin-left: 20px; padding-left: 20px;
        border-left: 1px solid #ededed; color: #999;
        span{
          cursor: pointer;
          margin-right: 20px;
          &:hover,&.active{
            color: #ff762b;
          }
        }
      }
    b{
      font-weight: normal;
    }
  }
  .product{
    .productItem{  position: relative;
      border: 1px solid #eee;
      margin-right:30px;
      float: left;
      width: 333px;
      height: 480px;
      &:nth-of-type(3){
        margin-right:0;
      }
      .bou{
        padding-bottom: 100px;
      }
      .bou>img{ width: 100%;  height:150px; display: block;}
      .head{ position: absolute; top:0; left: 0; padding: 30px 30px 0; height:150px;
        color: #fff; width:100%;

        h3{ position: relative; padding-top: 13px; height:80px;
          img{ position: absolute;left: 0; top:0;padding: 10px;
            width:80px;
            background-color: #fff;
          }
          b{font-size: 20px; float: left; font-weight: normal;vertical-align: middle;margin-right: 19px}
          span{ font-size: 12px;}
          span.overflow{
            clear: both;
          }
          .tag{
            width: 40px;
            height:20px;
            line-height:20px;
            text-align: center;
            float: left;
            color: #ff762b;
            background-color: #fff;
            border-radius: 10px;
            font-size: 12px;
            vertical-align: middle;
            margin-right: 10px;
            margin-top: 2px;
          }
        }
        .bq{
          span{margin-right:8px; float: left; height: 20px; line-height: 20px; border: 1px solid #fff;
            border-radius: 15px; padding: 0 10px; text-align: center;
            &:nth-last-of-type(1){margin-right: 0}
          }
        }

      }
      ul{ padding: 0 30px 20px; background: #fff;
        li{ height: 24px; margin-top: 30px;
          background: url("../../assets/images/financial10.jpg") bottom no-repeat;
          img,span,b{ vertical-align: middle; color: #999;font-size: 14px;  font-weight: normal;}
          img{
            width: 15px;margin-right: 15px;
          }
          .b{
            float: right;
            width: 170px;
            text-align: right;
            b{
              color: #000;font-size: 12px;line-height: 20px;
            }
          }
          >b{ float: right; color: #000;font-size: 12px;line-height: 20px}
        }
      }
      .btn{background: #fff; height: 60px; line-height: 60px; border-top:1px solid #ededed; color: #ff762b;
        font-size: 20px; text-align: center;position: absolute;
        bottom:0;width: 100%;
        &:hover{ background: url("../../assets/images/financial13.png") repeat-x; cursor: pointer;
          color: #fff;
         }
      }
      &:hover{ box-shadow: 0 0 12px rgba(0,0,0,0.1); z-index: 100;}

    }
  }
  .sp{ border-bottom: 1px solid #ededed;}
  .banner{ width: 100%;
    img{width: 100%; display: block;}
  }
  .item1{
    .left,.right{padding: 30px 0;}
    .left{height: 260px;
      width: 500px;
      ul{
      }
      li{ float: left; width: 50%;  margin: 15px 0;
        padding: 10px 0;padding-left: 85px;
        h2{ font-size: 24px; color: #000; line-height: 32px; }
        p{ color: #999999; font-size: 14px; }
      }
      .f1{ background: url("../../assets/images/financial01.png") 6px no-repeat;background-size: 66px 66px}
      .f2{ background: url("../../assets/images/financial02.png") 6px no-repeat;background-size: 66px 66px}
      .f3{ background: url("../../assets/images/financial04.png") 6px no-repeat;background-size: 66px 66px}
      .f4{ background: url("../../assets/images/financial05.png") 6px no-repeat;background-size: 66px 66px}
      .more{ float: right; padding-right: 20px; cursor: pointer; color: #999999;
        &:hover{ color: #f99134 !important;}
      }
    }
    .right{ border-left:1px solid #ededed; height: 260px;width: 700px;
      position: relative;
      h2{ font-size: 24px; color: #000;}
      p{ font-size: 14px; color: #999; line-height: 40px; margin-bottom: 10px;}
      .le{ float: left; width: 390px; padding-left:60px;padding-top: 35px;
        .ivu-poptip{ cursor: pointer;
          float: left;
          width: 150px;
          img{
            width: 150px;
          }
          &:hover{ opacity: 1;}
        }
      }
      >img{ width: 300px;float: right;
        position: absolute;
        right:-20px;
        bottom:0;
      }
    }
  }
  .pagef{ text-align: center; padding: 20px 0;}
  .contentBox{ width: 1200px; margin: 0 auto;}
}
</style>
