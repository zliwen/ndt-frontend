<template>
   <div class="index-container">
     <div class="first_screen" style="overflow: hidden">
       <v-banner></v-banner>
     </div>
     <div class="second_screen">
       <div class="function">
         <ul>
           <li v-for="item in functions">
             <img :src="item.url">
             <div>
               <span style="display: inline-block;width: 100%" class="title" v-html="item.title"></span>
               <span class="description" v-html="item.description"></span>
             </div>
           </li>
         </ul>
         <!--<svg :style="style.scaleStyle">-->
         <!--<path :d="style.d" fill="#fff"/>-->
         <!--</svg>-->
         <!--<Icon type="ios-arrow-down" :size="46*$store.state.screenWidthScale" @click.native="jump($event,0)"></Icon>-->
       </div>
       <div class="zhengce_zixun">
         <header>
           <span class="big_title">政策资讯</span>
           <i :class="{active:item.active}" @click="zczxClick(item,index)" v-for="(item,index) in zczx" v-text="item.name"></i>
           <span class="right" @click="open('#/policy-infomation?type='+zczx.find(l=>l.active).type)">查看更多<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span>
         </header>
         <div class="swiper-container zczx" style="height: 220px;">
           <ul class="swiper-wrapper clearfix">
             <li class="swiper-slide">
               <ul v-if="ndt.length">
                 <li v-for="item in ndt" @click="open('#/policy-infomation/details?type=0&id='+item.id)">
                   <span v-text="item.updateAt.slice(5,10)"></span>
                   <p class="overflow" v-text="item.title"></p>
                 </li>
               </ul>
               <v-no-data v-else style="height:100%"></v-no-data>
             </li>
             <li class="swiper-slide">
                <ul v-if="nongye.length">
                  <li v-for="item in nongye" @click="open('#/policy-infomation/details?type=1&id='+item.id)">
                    <span v-text="item.updateAt.slice(5,10)"></span>
                    <p class="overflow" v-text="item.title"></p>
                  </li>
                </ul>
               <v-no-data v-else style="height:100%" ></v-no-data>
             </li>
             <li class="swiper-slide">
               <template v-if="info.length">
                 <ul class="info">
                   <li v-for="item in info" @mouseenter="activeItem = item" @click="open('#/policy-infomation/details?type=2&id='+item.id)">
                     <div class=" nweImg" v-show="activeItem === item">
                       <img :src="item.linkImageUrl" alt="">
                     </div>
                     <span v-text="item.updateAt.slice(5,10)"></span>
                     <p class="overflow" v-text="item.title"></p>
                   </li>
                 </ul>
               </template>
               <v-no-data v-else style="height:100%" ></v-no-data>
             </li>
           </ul>
         </div>
       </div>
       <div class="credit_system_construction-container">
         <header><span class="big_title">农贷通成果展示</span><span class="right"  @click="goBigData">更多数据<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span></header>
          <ul class="data_wrapper clearfix">
            <li>
              <img src="../../assets/images/financial01.png" alt="">
              <div>
                <span>成功放款金额</span>
                <p><span>{{show.amt}}</span><i>{{show.amt1}}</i></p>
              </div>
            </li>
            <li>
              <img src="../../assets/images/financial04.png" alt="">
              <div>
                <span>受理金额</span>
                <p><span>{{show.lendingAmt}}</span><i>{{show.lendingAmt1}}</i></p>
              </div>
            </li>
            <li>
              <img src="../../assets/images/financial02.png" alt="">
              <div>
                <span>成功放款笔数</span>
                <p><span>{{show.count}}</span><i>笔</i></p>
              </div>
            </li>

            <li>
              <img src="../../assets/images/financial05.png" alt="">
              <div>
                <span>注册用户数</span>
                <p><span>{{show.registerNum}}</span><i>户</i></p>

              </div>
            </li>
          </ul>
         <div class="credit_system_construction">
           <ul class="clearfix">
             <li v-for="(item,index) in credit_system_data">
               <p class="data">
                 <span class="number" v-text="item.number"></span>
                 <span class="unit" v-text="item.unit"></span>
               </p>
               <span class="describe" v-text="item.describe"></span>
             </li>
           </ul>
         </div>
       </div>
       <div class="card-container">
         <header>
           <span class="big_title">金融服务</span>
           <span class="describe" style="cursor: default">我们为超过上千个用户提供了金融服务</span>
           <span class="right" @click="open('#/financial-service')">查看更多<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span>
         </header>
         <div class="financial-item-wrapper clearfix" v-if="loans.length">
           <financial-item :data="item" v-for="(item,index) in loans" :key="index" @click.native="$refs.pModal.showModal(item.id);"></financial-item>
         </div>
         <v-no-data v-else style="height:200px" :src="project"></v-no-data>
       </div>
       <div class="card-container">
         <header style="margin-bottom: 0">
           <span class="big_title">更多机构和服务</span>
           <span class="describe">
             <span class="describe_item" v-for="(item,index) in organization" v-text="item.name" :class="{active:item.active}" @click="changeOrganization(index)" :key="item.index"></span>
           </span>
           <!--<span class="right"  @click="open('#/financial-service')">查看更多<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span>-->
         </header>
         <div class="swiper-container swiper-container-organization" style="height: 240px;">
           <div class="swiper-wrapper">
             <div class="swiper-slide" style="padding:20px;">
               <template v-if="orgBankList.length">
                 <div class="img_wrapper" v-for="img in orgBankList" @click="goBank(img)">
                   <img :src="img.logoImageUrl" v-if="img.success" @error="img.success = false">
                   <div v-else>
                     <img src="../../assets/images/org_no_img.jpg" alt="">
                     <p>
                       <span class="chinese overflow" v-text="img.name"></span>
                       <!--<span class="english overflow" v-text="img.code"></span>-->
                     </p>
                   </div>
                 </div>
               </template>
               <v-no-data v-else style="height:100%" :src="org"></v-no-data>
             </div>
             <div class="swiper-slide" style="padding:20px;">
               <template v-if="orgFinancialList.length">
                 <div class="img_wrapper" v-for="img in orgFinancialList" @click="goBank(img)">
                   <img :src="img.logoImageUrl" v-if="img.success" @error="img.success = false">
                   <div v-else>
                     <img src="../../assets/images/org_no_img.jpg" alt="">
                     <p>
                       <span class="chinese overflow" v-text="img.name"></span>
                       <!--<span class="english overflow" v-text="img.code"></span>-->
                     </p>
                   </div>
                 </div>
               </template>
               <v-no-data v-else style="height:100%" :src="org"></v-no-data>
             </div>
             <div class="swiper-slide" style="padding:20px;">
               <template v-if="orgGuaranteeList.length">
                 <div class="img_wrapper" v-for="img in orgGuaranteeList" @click="goBank(img)">
                   <img :src="img.logoImageUrl" v-if="img.success" @error="img.success = false">
                   <div v-else>
                     <img src="../../assets/images/org_no_img.jpg" alt="">
                     <p>
                       <span class="chinese overflow" v-text="img.name"></span>
                       <!--<span class="english overflow" v-text="img.code"></span>-->
                     </p>
                   </div>
                 </div>
               </template>
               <v-no-data v-else style="height:100%" :src="org"></v-no-data>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div class="user_evaluate">
        <p class="title">他们如此评价农贷通</p>
       <div class="photo_wall">
          <lunbo></lunbo>
       </div>
       <img src="../../assets/images/user_evaluate_text.png" alt="" class="ndt">
       <!--<p class="more"><router-link tag="span" to="">了解更多</router-link></p>-->
       <img src="../../assets/images/top.jpg" alt="" class="top" :style="style.height3" @click="jump($event,1)">
     </div>
    <vProductModal ref="pModal"></vProductModal>
     <v-footer></v-footer>
   </div>
</template>
<script>
  import loanProductServer from "rs/loanProduct"
  import Swiper from "../../config/swiper.min.js"
  import function1 from "asts/images/feature01.png";
  import function2 from "asts/images/feature02.png";
  import function3 from "asts/images/feature03.png";
  import function4 from "asts/images/feature04.png";
  import goApplyFor from "../../services/goApplyFor"
  import lunbo from 'cmpts/common/lunbo.vue'
  import indexServer from 'rs/index'
  import {baseURL} from '../../config/constant'
  import org from "../../assets/images/no_org.png"
  import project from "../../assets/images/financial07.png"
export default {
	name: 'home',
	data() {
    return {
      org:org,
      project:project,
      orgFinancialList:[],
      orgGuaranteeList:[],
      zczx:[{name:"农贷通政策",active:true,type:0},{name:"农业政策",active:false,type:1},{name:"信息动态",active:false,type:2}],
      organization:[{name:"银行机构",active:true},{name:"保险机构",active:false}],//,{name:"担保机构",active:false}
      nongye:[],//农业政策
      ndt:[],//农贷通政策
      info:[],//信息动态
      activeItem:{},//信息动态的配图
      functions:[
        {
          url:function1,
          title:"在线申请",
          description:"无需东奔西跑"
        },
        {
          url:function2,
          title:"金融机构",
          description:"急速对接申请"
        },
        {
          url:function3,
          title:"&nbsp;&nbsp;风险分担",
          description:"政策兴农科技惠农"
        },
        {
          url:function4,
          title:"新型经营主体",
          description:"&nbsp;政府补贴重点扶持"
        },
      ],
      credit_system_data:[
        {
          number:"0",
          unit:"户",
          describe:"涉农主体收集数量"
        },
        {
          number:"0",
          unit:"个",
          describe:"新型经营主体入库数"
        },
        {
          number:"0",
          unit:"户",
          describe:"信用户数量"
        },
        {
          number:"0",
          unit:"个",
          describe:"信用村数量"
        },
        {
          number:"0",
          unit:"个",
          describe:"信用乡镇数"
        }
      ],
      loans:[],
      //新闻资讯列表
      infoList:[],
      orgBankList:[],
      show:{
        amt:0,
        amt1:'元',
        count:0,
        lendingAmt:0,
        lendingAmt1:'元',
        registerNum:0
      }
    }
	},
	created() {
	  this.getBigData();
    //机构-银行
    let promise1 = indexServer.orgList({data:{orgSubtypes:[3004],adminDivisionId:5101}},({data:{pageData}})=>{
      pageData.forEach(l=>{l.logoImageUrl = baseURL + l.logoImageUrl;l.success = true;});
      this.orgBankList = pageData;
    });
    //机构-金融
    let promise2 = indexServer.orgList({data:{orgSubtypes:[3005],adminDivisionId:5101}},({data:{pageData}})=>{
      pageData.forEach(l=>{l.logoImageUrl = baseURL + l.logoImageUrl;l.success = true;});
      this.orgFinancialList = pageData;
    });
//    //机构-担保
//    let promise3 = indexServer.orgList({data:{orgSubtypes:[3006],adminDivisionId:5101}},({data:{pageData}})=>{
//      pageData.forEach(l=>{l.logoImageUrl = baseURL + l.logoImageUrl;l.success = true;});
//      this.orgGuaranteeList = pageData;
//    });
    //特色产品
    indexServer.loanProductList({params:{type:-1}},res=>{
      this.loans = res.data.pageData;
    });
    //政策资讯-信息动态
    indexServer.searchInfo({data:{type:301,divisionId:5101}},({data:{pageData}})=>{
      pageData.forEach(l=>{l.linkImageUrl = baseURL+l.linkImageUrl});
      this.info = pageData;
      this.activeItem = pageData[0];
    });
    //政策资讯-农业政策
    indexServer.policyList({data:{type:6501,divisionId:5101}},({data})=>{
      this.nongye = data.pageData;
    });
    //政策资讯-农贷通政策
    indexServer.policyList({data:{type:6502,divisionId:5101}},({data})=>{
      this.ndt = data.pageData;
    });
  },
  mounted(){
    this.zczxSwiper = new Swiper('.zczx',{
      onlyExternal:true
    });
    //tabs
    this.mySwiper = new Swiper('.swiper-container-organization',{
      onlyExternal:true
    })
  },
	directives: {

	},
  components:{lunbo},
	computed: {
	  style(){
      let state = this.$store.state;
      let scale = state.screenWidthScale;
      let sNum = num=>num*scale;
      let d = "M0 "+sNum(74)+" Q "+sNum(24)+" "+sNum(74)+", "+sNum(44)+" "+sNum(46)+" Q "+sNum(103)+" -"+sNum(46)+","+sNum(172)+" "+sNum(46)+" Q "+sNum(192)+" "+sNum(74)+" "+sNum(216)+" "+sNum(74)+" Z";
      let d2 = "M0 0"+" Q "+sNum(24)+" 0, "+sNum(44)+" "+sNum(30)+" Q "+sNum(103)+" "+sNum(140)+","+sNum(172)+" "+sNum(30)+" Q "+sNum(192)+" 0 "+sNum(216)+" 0 Z";
      return {
        heightStyle:{
          height:state.screenHeight-70-sNum(350)+"px"
        },//设置首屏最下面div的高度
        height2:{height:state.screenHeight-70+"px"},
        height3:{width:sNum(208)+"px",bottom:sNum(-52)+"px",marginLeft:sNum(-104)+"px"},
        height4:{height:state.screenHeight-710+"px"},
        scaleStyle:{
          width:sNum(216)+"px",
          height:sNum(74)+"px",
          marginLeft: sNum(-108)+"px"
        },
        d:d
      }
    }
	},
	filters: {
	},
	methods: {
    //tabs 点击切换方法
    changeOrganization(index){
      this.organization.forEach((l,i)=>{l.active = i === index});
      this.mySwiper.swipeTo(index,500,false);
    },
    zczxClick(item,index){
      this.zczx.forEach(l=>l.active = false);
      item.active = true;
      this.zczxSwiper.swipeTo(index);
    },
    //filter
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
    getBigData(){
      loanProductServer.getData({params:{divisionId:5101}},({data})=>{
        let show = this.show;
        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        function start(newValue,type,obj) {
          new TWEEN.Tween({ tweeningNumber: 0})
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ tweeningNumber: newValue }, 1000)
            .onUpdate(function () {
              let ne=this.tweeningNumber.toFixed(2);
              obj[type] = ne==this.tweeningNumber?this.tweeningNumber:ne;
            })
            .start();
        }
        start(this.filter(data.areaTotalAmt,'amt1'),"amt",show);
        start(this.filter(data.lendingAmt,'lendingAmt1'),"lendingAmt",show);

        start(data.areaTotalCount,"count",show);
        start(data.userRegisterCount,"registerNum",show);
        let csd = this.credit_system_data;
        start(14581,"number",csd[0]);
        start(3515,"number",csd[1]);
        start(50722,"number",csd[2]);
        start(1398,"number",csd[3]);
        start(117,"number",csd[4]);

        animate()
      });
    },
    alertDetails(id){
      this.$refs.pModal.showModal(id);
    },
    goApplyFor:goApplyFor,
    jump(event,type){
      let num = type?0:this.$store.state.screenHeight;
      this.$emit("scrollChange",num);
    },
    goBigData:function () {
      this.session.set("pageBackUrl",this.$route.fullPath);
      window.open("/bigData");
    },
    goBank(item){
      if(item.orgSubtype==3004){
        this.$router.push({name:'bank',query:{id:item.id}})
      }else {
        this.$router.push({name:'insurance',query:{id:item.id}})
      }
    }
	}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.ivu-carousel-item{
  text-align: center;
  img{
    vertical-align: top;
  }
}
.function{
  position: relative;
  color: #5c5441;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
  ul{
    width: 1200px;
    margin:0 auto;
    li{
      width: 25%;
      height: 60px;
      display: inline-block;
      vertical-align: top;
      border-right: 1px solid #e5e5e5;
      padding-left: 50px;
      &:nth-last-of-type(1){
        border-right: none;
      }
      img{
        width: 60px;
        vertical-align: top;
        margin-right: 20px;
      }
      div{
        display: inline-block;
        width: 122px;
      }
      .title{
        padding-top:12px;
        line-height: 20px;
        font-size: 20px;
        padding-bottom: 10px;
        padding-left:2px;
      }
      .description{
        font-size:14px;
        line-height:14px;
      }
    }
  }
}
.zhengce_zixun{
  header{
    .big_title{
      padding-right: 16px;
      border-right: 1px solid #bfbfbf;
    }
    >i{
      font-style: normal;
      font-size:14px;
      line-height: 14px;
      margin-right: 16px;
      cursor: pointer;
      &:hover,&.active{
        color: #ff762b;
      }
    }
  }
  .swiper-slide{
    position: relative;
    .nweImg{width: 390px; height: 220px; overflow: hidden; position: absolute;  left:0;  top:0;}
    img{width: 100%;}
    ul{
      &.info{
        width: 810px;
        float: right;
      }
      li{
        font-size: 14px;
        line-height: 14px;
        padding:15px 28px 15px 22px;
        color: #000;
        cursor: pointer;
        &::before{
          content: "";
          width: 4px;
          height: 4px;
          background-color: #000;
          border-radius: 50%;
          float: left;
          margin-top: 4px;
          margin-right: 30px;
        }
        &:hover{
          color:#ff762b;
          &::before{background-color: #ff762b;}
        }
        p{
          padding-right: 50px;
        }
        span{
          color: #999;
          float: right;
        }
      }
    }
  }
}
.financial-item-wrapper{
  padding-left: 70px;
  .financial-item{
    float: left;
  }
}
.second_screen{
  width:1200px;
  margin:0 auto;
}
header{
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
  height: 100px;
  line-height: 30px;
  padding-top: 50px;
  margin-bottom: 20px;
  .big_title{
    font-size:20px;
    color: @text_color_1;
    margin-right:20px;
  }
  .describe{
    color: @text_color_3;
    font-size: 14px;
    display: inline-block;
    padding-left: 20px;
    border-left:@border2;
    line-height: 20px;
    cursor: pointer;
    .describe_item{
      margin-right: 20px;
      &:hover,&.active{
        color:@base-text-hover-color
      }
    }
  }
  span.right{
    color:#999999;
    font-size: 14px;
    float: right;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
//金融服务

//合作伙伴部分
.img_wrapper{
  cursor: pointer;
  padding:10px;
  width: 20%;
  height: 100px;
  background-color: #fff;
  float: left;
  position: relative;
  /*border:1px solid #f2f2f2;*/
  &:hover{
    z-index: 1;
    padding:0;
    p{
      padding-left: 90px;
      top:46px;
    }
    div,>img{box-shadow:0 0 12px #f2f2f2;}
  }
  >img{
    width: 100%;
    height:100%;
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
}
//信用体系建设
.credit_system_construction-container{
  header{margin-bottom: 0}
  .data_wrapper{
    text-align: center;
    height: 130px;
    li{
      height:100%;
      float: left;
      width: 25%;
      padding-top: 35px;
      img{
        width:60px;
        vertical-align: top;
        margin-right: 20px;
      }
      div{
        text-align: left;
        display: inline-block;
        >span{
          font-size:14px;
          color: #333;
        }
        p{
          color: #ff762b;
          line-height: 36px;
          margin-top: 10px;
          span{
            font-size:36px;
            margin-right: 6px;
          }
          i{
            font-size: 20px;
            font-style: normal;
          }
        }
      }
    }
  }
  .credit_system_construction{
    position: relative;
    height:120px;
    background: url("../../assets/images/credit_system_bg.png") no-repeat;
    ul{
      text-align: center;
      color:#fff;
      padding-top: 35px;
      li{
        float: left;
        width: 20%;
        border-right: 1px solid #fff;
        &:nth-last-of-type(1){
          border-right: none;
        }
        .data{
          position: relative;
          margin-bottom: 8px;
          .number{
            font-size: 20px;
            margin-right: 6px;
            line-height: 20px;
            display: inline-block;
            vertical-align: bottom;
          }
          .unit{
            font-size: 16px;
            line-height: 20px;
            display: inline-block;
          }
        }
        .describe{
          font-size:14px;
        }
      }
    }
  }
}
//用户评价
.user_evaluate{
  clear: both;
  position: relative;
  height: 600px;
  background: url("../../assets/images/user_evaluate_bg.jpg") no-repeat 100%;
  /*overflow: hidden;*/
  text-align: center;
  color: @white;
  p.title{
    padding-top: 50px;
    margin-bottom: 50px;
    font-size: 24px;
    line-height:24px;
  }
  p.more{
    font-size:18px;
    line-height: 18px;
    span{
      display: inline-block;
      padding-bottom: 6px;
      border-bottom:1px solid @white;
      cursor: pointer;
    }
  }
  .photo_wall{
    height: 250px;
  }
  .top{
    position: absolute;
    bottom: -52px;
    left:50%;
    margin-left:-104px;
    z-index: 2;
    cursor: pointer;
  }
  .ndt{
    margin-top: 70px;
    margin-bottom: 60px;
  }
}
</style>
