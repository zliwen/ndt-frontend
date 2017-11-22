<template>
  <div class="nonstop-county-container">
    <img :src="isTown?img[id]:img.banner" alt="" style="width: 100%">
    <div class="main">
      <ul class="data_container" v-if="isTown">
        <li>
          <div>
            <p class="title">
              <span class="number" v-text="statistics.newBusinessCount"></span>
              <span class="unit">&nbsp;户</span>
            </p>
            <span class="discirbe">新型经营主体</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">
              <span class="number" v-text="statistics.loanAmount"></span>
              <span class="unit">{{statistics.loanAmountDw}}</span>
            </p>
            <span class="discirbe">贷款总额</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">
              <span class="number" v-text="statistics.loanUserCount"></span>
              <span class="unit">&nbsp;户</span>
            </p>
            <span class="discirbe">信用采集户</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">
              <span class="number" v-text="statistics.supportCount"></span>
              <span class="unit">&nbsp;项</span>
            </p>
            <span class="discirbe">重点支持项目</span>
          </div>
        </li>
        <li>
          <div>
            <p class="title">
              <span class="number" v-text="statistics.xinyongcun"></span>
              <span class="unit">&nbsp;个</span>
            </p>
            <span class="discirbe">信用镇</span>
          </div>
        </li>
      </ul>
      <div class="info_container server_container">
        <div class="title">
          <span class="name">政策资讯</span>
          <p class="inner">
            <span v-for="(i,x) in zczx" :class="{active:i.active}" @click="zczxClick(i,x)" :key="x">{{i.name}}</span>
          </p>
          <span class="to_details" @click="open('#/xian/policy-infomation?type='+activeItem.type)">查看更多<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span>
        </div>
        <div class="details_container zczx swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ul v-if="zczxList.ndt.length">
                <li :key="index" v-for="(item,index) in zczxList.ndt" @click="open('#/xian/policy-infomation/details?type=0&id='+item.id)">
                  <span class="title" v-text="item.title"></span>
                  <span class="date"  v-text="item.updateAt?item.updateAt.slice(5,10):''"></span>
                </li>
              </ul>
              <v-no-data v-else style="height: 235px;" ></v-no-data>
            </div>
            <div class="swiper-slide">
              <ul v-if="zczxList.nycd.length">
                <li :key="index" v-for="(item,index) in zczxList.nycd" @click="open('#/xian/policy-infomation/details?type=1&id='+item.id)">
                  <span class="title" v-text="item.title"></span>
                  <span class="date"  v-text="item.updateAt?item.updateAt.slice(5,10):''"></span>
                </li>
              </ul>
              <v-no-data v-else style="height: 235px;" ></v-no-data>
            </div>
            <div class="swiper-slide">
              <ul v-if="zczxList.ny.length">
                <li :key="index" v-for="(item,index) in zczxList.ny" @click="open('#/xian/policy-infomation/details?type=3&id='+item.id)">
                  <span class="title" v-text="item.title"></span>
                  <span class="date"  v-text="item.updateAt?item.updateAt.slice(5,10):''"></span>
                </li>
              </ul>
              <v-no-data v-else style="height: 235px;"></v-no-data>
            </div>
            <div class="swiper-slide" >
              <template v-if="zczxList.dt.length">
                <ul class="hasImg">
                  <li :key="index" v-for="(item,index) in zczxList.dt" @click="open('#/xian/policy-infomation/details?type=2&id='+item.id)" @mouseenter="active2 = index">
                    <img class="isTown" :src="item.linkImageUrl" v-show="active2 === index">
                    <span class="title" v-text="item.title"></span>
                    <span class="date"  v-text="item.updateAt?item.updateAt.slice(5,10):''"></span>
                  </li>
                </ul>
              </template>
              <v-no-data v-else style="height: 235px;"></v-no-data>
            </div>
            <div class="swiper-slide" v-if="!isTown">
              <template v-if="zczxList.cw.length">
                <ul class="hasImg">
                  <li :key="index" v-for="(item,index) in zczxList.cw" @click="open('#/xian/policy-infomation/details?type=4&id='+item.id)" @mouseenter="active1 = index">
                    <img class="isTown" :src="item.linkImageUrl" v-show="active1 === index">
                    <span class="title" v-text="item.title"></span>
                    <span class="date"  v-text="item.updateAt?item.updateAt.slice(5,10):''"></span>
                  </li>
                </ul>
              </template>
              <v-no-data v-else style="height: 235px;"></v-no-data>
            </div>
          </div>
        </div>
      </div>
      <div class="financial_product_container">
        <p class="common_title">
          <span class="name">特色金融</span>
          <span class="describe">本区特色&nbsp;&nbsp;专享福利</span>
          <span class="to_more" @click="open('#/xian/financial-service')">查看更多<Icon type="ios-arrow-right" size="14"
                                                                                    style="margin-left:6px"></Icon></span>
        </p>
        <ul class="clearfix" v-if="projectList.length">
          <financial-item style="float: left" :data="item" v-for="(item,index) in projectList" :key="index" @click.native="$refs.pModal.showModal(item.id);"></financial-item>
        </ul>
        <v-no-data v-else style="height: 200px;" :src="project" ></v-no-data>
      </div>
      <div class="organization_container">
        <p class="common_title">
          <span class="name">更多机构和服务</span>
          <span class="describe">靠谱机构&nbsp;&nbsp;利益保障</span>
        </p>

        <ul class="clearfix"  v-if="orgList.length">
          <li v-for="img in orgList" @click="goBank(img)">
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
        <v-no-data v-else style="height: 200px;" :src="org" ></v-no-data>
      </div>
      <div class="server_container">
        <div class="title">
          <span class="name">综合服务</span>
          <p class="inner">
            <span :class="{active:item.active}" v-for="(item,index) in serverList" v-text="item.name" @click="changeServer(item);activeIndex = item.key"></span>
          </p>
          <span class="to_details" @click="open('#/xian/comprehensive?type='+activeIndex)">查看更多<Icon type="ios-arrow-right" size="14" style="margin-left:6px"></Icon></span>
        </div>
        <div class="details_container">
          <img :src="activeServerImg" alt="">
          <ul v-if="serverDetailsList.length">
            <li :key="index" v-for="(item,index) in serverDetailsList" @click="open('#/xian/comprehensive/details?type=2&id='+item.id)">
              <span class="title" v-text="item.title"></span>
              <span class="date" v-text="item.updateAt"></span>
            </li>
          </ul>
          <v-no-data v-else style="height: 235px;" ></v-no-data>
        </div>
      </div>
      <div class="manage_list_dynamic_container clearfix" v-if="isTown">
        <div class="manage_list">
          <p class="title">新型农业经营主体名单
            <span v-for="(item,index) in manageMain" v-text="item.name" :class="{active:item.active}" @click="farmSwiper.swipeTo(index);manageMain.forEach(l=>l.active = false);item.active = true"></span>
          </p>
          <div class="swiper-container farm-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <table v-if="framList.length">
                  <tr v-for="item in framList" class="clearfix">
                    <td v-text="item.name"></td>
                    <!--<td v-text="item.remark"></td>-->
                    <td v-text="item.town"></td>
                    <td v-text="item.updateTime" style="text-align: right"></td>
                  </tr>
                </table>
                <v-no-data v-else style="height: 300px;" ></v-no-data>
                <p class="pagenation">
                  <Icon type="ios-arrow-left" class="prev" :class="{disabled:page === 1}" @click.native="getFarmList(-1)"></Icon>
                  <Icon class="next" type="ios-arrow-right" :class="{disabled:page >= Math.ceil(pageTotal/size)}" @click.native="getFarmList(1)"></Icon>
                </p>
              </div>
              <div class="swiper-slide">
                <table v-if="framList2.length">
                  <tr v-for="item in framList2" class="clearfix">
                    <td v-text="item.name"></td>
                    <!--<td v-text="item.remark"></td>-->
                    <td v-text="item.town"></td>
                    <td v-text="item.updateTime" style="text-align: right"></td>
                  </tr>
                </table>
                <v-no-data v-else style="height: 300px;" ></v-no-data>
                <p class="pagenation">
                  <Icon type="ios-arrow-left" class="prev" :class="{disabled:page2 === 1}" @click.native="getFarmList2(-1)"></Icon>
                  <Icon class="next" type="ios-arrow-right" :class="{disabled:page2 >= Math.ceil(pageTotal2/size2)}" @click.native="getFarmList2(1)"></Icon>
                </p>
              </div>
              <div class="swiper-slide">
                <table v-if="framList1.length">
                  <tr v-for="item in framList1" class="clearfix">
                    <td v-text="item.companyName"></td>
                    <td >{{item.companyType|codeName}}</td>
                    <td v-text="item.registerAddress"></td>
                    <td style="text-align: right">{{item.level|codeName}}</td>
                  </tr>
                </table>
                <v-no-data v-else style="height: 300px;" ></v-no-data>
                <p class="pagenation">
                  <Icon type="ios-arrow-left" class="prev" :class="{disabled:page1 === 1}" @click.native="getFarmList1(-1)"></Icon>
                  <Icon class="next" type="ios-arrow-right" :class="{disabled:page1 >= Math.ceil(pageTotal1/size1)}" @click.native="getFarmList1(1)"></Icon>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="dynamic">
          <p class="title">农贷通动态</p>
          <div class="swiper-container swiper-dynamic-container">
            <ul class="swiper-wrapper">
              <li v-for="item in dynamicList" class="clearfix swiper-slide">
                <span class="circle"></span>
                <div>
                  <p class="overflow" :title='"通过"+item.productName+"成功贷款"+item.loanDoneAmount'>{{"通过"+item.productName+"成功贷款"+item.loanDoneAmount}}</p>
                  <p v-text="item.phone">135****1586</p>
                </div>
                <span class="last" v-text="item.createTime">2017-09-24</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="import_support_container">
      <p class="common_title">
        <span class="name">重点支持项目</span>
        <span class="describe">新兴项目&nbsp;&nbsp;重点支持</span>
      </p>
      <div class="projects-container-bg">
        <div class="projects-container" v-if="zhongdianxiangmu.length">
          <Icon type="ios-arrow-left" size="108" @click.native.stop="mySwiper.swipePrev()"></Icon>
          <Icon type="ios-arrow-right" size="108" @click.native.stop="mySwiper.swipeNext()"></Icon>
          <div class="projects swiper-container">
            <div class="swiper-wrapper clearfix">
              <div class="swiper-slide" v-for="item in zhongdianxiangmu">
                <div>
                  <div class="title_container">
                    <img :src="item.url" alt="">
                    <div class="title">
                      <span class="type" v-text="item.companyType"></span>
                      <p class="overflow" v-text="item.companyName" :title="item.companyName"></p>
                    </div>
                  </div>
                  <div class="content">
                    <p class="type overflow">项目类型：<span v-text="item.projectType" :title="item.projectType"></span></p>
                    <p class="project overflow">主要产品：<span v-text="item.mainProduct" :title="item.mainProduct"></span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-no-data v-else style="height: 100%;color: #fff;"></v-no-data>
      </div>
    </div>
    <vProductModal ref="pModal"></vProductModal>
    <v-footer :QS="['都江堰市','崇州市','彭州市'].indexOf(townName)!==-1"></v-footer>
  </div>
</template>

<script>
  import Swiper from "../../config/swiper.min.js"
  import json from "../../config/companyArray"
  import indexServer from 'rs/index'
  import food from '../../assets/images/nonstop-county/food.png'
  import scenic from '../../assets/images/nonstop-county/scenic.png'
  import recruit from '../../assets/images/nonstop-county/recruit.png'
  import plant from '../../assets/images/nonstop-county/plant.png'
  import org from "../../assets/images/no_org.png"
  import project from "../../assets/images/financial07.png"
  import banner from '../../assets/images/town/banner.jpg'
  import i_510104 from '../../assets/images/town/510104.jpg'
  import i_510105 from '../../assets/images/town/510105.jpg'
  import i_510106 from '../../assets/images/town/510106.jpg'
  import i_510107 from '../../assets/images/town/510107.jpg'
  import i_510108 from '../../assets/images/town/510108.jpg'
  import i_510109 from '../../assets/images/town/510109.jpg'
  import i_510110 from '../../assets/images/town/510110.jpg'
  import i_510112 from '../../assets/images/town/510112.jpg'
  import i_510113 from '../../assets/images/town/510113.jpg'
  import i_510114 from '../../assets/images/town/510114.jpg'
  import i_510115 from '../../assets/images/town/510115.jpg'
  import i_510116 from '../../assets/images/town/510116.jpg'
  import i_510117 from '../../assets/images/town/510117.jpg'
  import i_510121 from '../../assets/images/town/510121.jpg'
  import i_510129 from '../../assets/images/town/510129.jpg'
  import i_510131 from '../../assets/images/town/510131.jpg'
  import i_510132 from '../../assets/images/town/510132.jpg'
  import i_510180 from '../../assets/images/town/510180.jpg'
  import i_510181 from '../../assets/images/town/510181.jpg'
  import i_510182 from '../../assets/images/town/510182.jpg'
  import i_510183 from '../../assets/images/town/510183.jpg'
  import i_510184 from '../../assets/images/town/510184.jpg'
  import p1 from "../../assets/images/nonstop-county/p1.png"
  import p2 from "../../assets/images/nonstop-county/p2.png"
  import p3 from "../../assets/images/nonstop-county/p3.png"
  import p4 from "../../assets/images/nonstop-county/p4.png"
  import {baseURL} from '../../config/constant'
export default {
	data() {
    return {
      active2:0,
      active1:0,
      xinyongcun:{
        510104:0,
        510105:0,
        510106:0,
        510107:0,
        510108:0,
        510109:0,
        510110:0,
        510112:3,
        510113:7,
        510114:7,
        510115:3,
        510116:13,
        510117:7,
        510121:11,
        510129:11,
        510131:2,
        510132:6,
        510180:0,
        510181:10,
        510182:10,
        510183:12,
        510184:15,
      },
      zhongdianxiangmu:[],
      zczx:[
        {name:"农贷通政策",active:true,type:0},
        {name:"成都市政策",active:false,type:1},
        {name:"本区县政策",active:false,type:3},
        {name:"信息动态",active:false,type:2}
      ],
      manageMain:[{name:"家庭农场",active:true},{name:"合作社",active:false},{name:"龙头企业",active:false}],
      statistics:{
        loanAmount:0,
        loanUserCount:0,
        newBusinessCount:0,
        supportCount:0,
        xinyongcun:0
      },
      img:banner,
      activeIndex:304,
      org:org,//没有机构
      project:project,//没有产品
      serverList:[
        {name:"种植指导",key:304,active:true,img:plant},
        {name:"招工用工",key:303,active:false,img:recruit},
        {name:"特色美食",key:306,active:false,img:food},
        {name:"特色景点",key:305,active:false,img:scenic},
      ],//综合服务点击列表
      activeServerImg:food,//综合服务部分左侧图片对象
      serverDetailsList:[],//综合服务列表
      active:true,//政策资讯active样式
      projectList:[],//产品列表
      orgList:[],//机构列表
      townName:this.session.get("cityName"),
      isTown:!+this.session.get("cityVillage"),
      dynamicList:[],//贷款动态列表
      framList:[],//农场列表
      framList1:[],//农场列表
      framList2:[],//农场列表
      page:1,//农场分页
      size:5,//农场分页
      pageTotal:1,
      page1:1,//农场分页
      size1:5,//农场分页
      pageTotal1:1,
      page2:1,//农场分页
      size2:5,//农场分页
      pageTotal2:1,
      id:this.session.get("cityId"),
      zczxList:{
        ny:[],
        nycd:[],
        ndt:[],
        dt:[],
        cw:[]
      }
    }
	},
	created() {
	  this.zhongdianxiangmu = json.filter(l=>l.districtCode == this.id);
    this.zhongdianxiangmu.forEach(l=>{
      switch (l.companyType){
        case "公司":
          l.url = p2;break;
        case "家庭农场":
          l.url = p4;break;
        case "合作社":
          l.url = p3;break;
        case "个人":
          l.url = p1;break;
      }
    });
    this.img = {
	    banner:banner,
      510104:i_510104,
      510105:i_510105,
      510106:i_510106,
      510107:i_510107,
      510108:i_510108,
      510109:i_510109,
      510110:i_510110,
      510112:i_510112,
      510113:i_510113,
      510114:i_510114,
      510115:i_510115,
      510116:i_510116,
      510117:i_510117,
      510121:i_510121,
      510129:i_510129,
      510131:i_510131,
      510132:i_510132,
      510180:i_510180,
      510181:i_510181,
      510182:i_510182,
      510183:i_510183,
      510184:i_510184,
    };
    this.activeItem = this.zczx[0];
      this.changeServer(this.serverList[0]);//综合服务
    //政策资讯开始
    let list = this.zczxList;
    indexServer.policyList({data:{divisionId:this.id.slice(0,6),type:6501}},({data:{pageData}})=>{
      list.ny = pageData;
    });
    indexServer.policyList({data:{divisionId:this.id.slice(0,4),type:6501}},({data:{pageData}})=>{
      list.nycd = pageData;
    });
    indexServer.policyList({data:{type:6502}},({data:{pageData}})=>{
      list.ndt = pageData;
    });
    indexServer.searchInfo({data:{type:301,divisionId:this.id.slice(0,6)}},({data:{pageData}})=>{
      list.dt = pageData;
    });
    if(!this.isTown){
      this.zczx.splice(4,0,{name:"村务信息",active:false,type:4});
      indexServer.searchInfo({data:{type:302,divisionId:this.id}},({data:{pageData}})=>{
        list.cw = pageData;
      });
    }
    //政策资讯结束
    this.getParentId();
    this.getDynamicList(()=>{
      //贷款成功客户
      setTimeout(()=>{
        new Swiper('.swiper-dynamic-container',{
          mode: 'vertical',
          loop:true,
          autoplay:3000,
          slidesPerView:4,
          onlyExternal:true
        });
      });
    });
    this.getFarmList(0);
    this.getFarmList1(0);
    this.getFarmList2(0);
    this.$emit("townChange",this.session.get("cityName"));
    let result1,result2;
    let promise1 = indexServer.Statistics({params:{divisionId:this.session.get("cityId")}},({data,errorCode})=>{
      if(errorCode)return;
      data.loanAmount=this.filter(data.loanAmount,'loanAmountDw');
      result1 = data;
    });
    let promise2 = indexServer.getVillageInfoCollect({params:{divisionId:this.session.get("cityId")}},({data,errorCode})=>{
      if(!errorCode)result2 = data.companyTotal + data.personalTotal;
    });
    Promise.all([promise1,promise2]).then((a,b)=>{
      if(!result1||((typeof result2)!== "number"))return;
      let statistics = this.statistics;
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
            let ne=this.tweeningNumber.toFixed(2);
            statistics[type] = ne==this.tweeningNumber?this.tweeningNumber:ne;
          })
          .start();
      }
      start(result1.loanAmount,"loanAmount");
      start(result2,"loanUserCount");
      start(result1.newBusinessCount,"newBusinessCount");
      start(this.zhongdianxiangmu.length,"supportCount");
      start(this.xinyongcun[this.id],"xinyongcun");
      animate()
    });
	},
  mounted(){
    this.mySwiper = new Swiper('.projects',{
      slidesPerView: 3,
      loop:true,
      autoplay:3000,
      onlyExternal:true
    });
    this.zczxSwiper = new Swiper('.zczx',{
      onlyExternal:true
    });
    this.farmSwiper = new Swiper('.farm-swiper',{
      onlyExternal:true
    });
  },
	directives: {
	},
  watch:{
    "$route":function(){
      this.changeServer(this.serverList[0]);//综合服务
      this.getParentId();
      this.townName = this.session.get("cityName");
      this.isTown = !this.session.get("cityVillage");
      this.getDynamicList();
      this.getFarmList(0);
      //this.$emit("townChange",this.session.get("cityName"));
    }
  },
	computed: {

	},
	filters: {
	},
	methods: {
    goBank(item){
      if(item.orgSubtype==3004){
        this.$router.push({name:'xianBank',query:{id:item.id}})
      }else {
        this.$router.push({name:'xianInsurance',query:{id:item.id}})
      }
    },
    zczxClick(item,index){
      this.activeItem = item;
      this.zczx.forEach(l=>l.active = false);
      item.active = true;
      this.zczxSwiper.swipeTo(index);
    },
    alertDetails(id){
      this.$refs.pModal.showModal(id);
    },
    filter(value,k){
      if(value<10000)return value;
      let num = value/10000;
      if(value<100000000){
        this.statistics[k] = "万元";
        let ne=num.toFixed(2)
        return ne==num?num:ne;
      }
      num = value/100000000;
      if(value>=100000000){
        this.statistics[k] = "亿元";
        let ne=num.toFixed(2)
        return ne==num?num:ne;
      }
    },
    getParentId(){
      indexServer.divisionDetails({params:{params3:this.session.get("cityId")}},({data})=>{
        let parent = data.parent,id;
        if(data.level >3)id = parent.find(l=>l.level === 3).id;
        else id = data.id;
        this.getProjectList(id);
        this.getOrgList(id);
      });
    },
    changeServer(item){
      this.serverList.forEach(l=>l.active = false);
      item.active = true;
      this.activeServerImg = item.img;
      indexServer.searchInfo({data:{type:item.key,searchType:4,divisionId:this.session.get("cityId").slice(0,6)}},({data:{pageData}})=>{
        pageData.forEach(l=>{
          l.updateAt = l.updateAt?l.updateAt.slice(5,10):"0";
        });
        this.serverDetailsList = pageData;
      });
    },
    getProjectList(id){
      indexServer.loanProductList2({params:{params5:6},data:{searchType:1,divisions:[id]}},({data:{pageData}})=>{
        this.projectList = pageData;
      })
    },
    getOrgList(id){
      indexServer.orgList({params:{params5:20},data:{adminDivisionId:id,orgType:902}},({data:{pageData}})=>{
        pageData.forEach(l=>{l.logoImageUrl = baseURL+l.logoImageUrl;l.success = true;});
        this.orgList = pageData;
        if(!pageData.length)return;
        this.$nextTick(()=>{
          new Swiper('.swiper_organization_container',{
            slidesPerView: 5,
            loop:true,
            autoplay:3000,
            onlyExternal:true
          });
        });
      });
    },
    getDynamicList(callback){
      indexServer.listDynamic({params:{params3:1,params4:20},data:{divisionId:this.session.get("cityId")}},({data:{pageData}})=>{
          pageData.forEach(l=>{l.loanDoneAmount = Vue.filter("formatterNumber")(l.loanDoneAmount)});
          this.dynamicList = pageData;
          if(callback)callback();
      });
    },
    //农场
    getFarmList(num){
      if((num === 1)&&(Math.ceil(this.pageTotal/5) <= this.page))return;
      if((num === -1)&&(this.page === 1))return;
      if(num === 0)this.page = 1;
      this.page += num;
      indexServer.farmList({params:{params4:this.page,params5:this.size},data:{countyCode:+this.session.get("cityId")}},({errorCode,data})=>{
        if(!errorCode){
          this.framList = data.pageData;
          this.pageTotal = data.totalCount;
        }
      });
    },
    //公司
    getFarmList1(num){
      if((num === 1)&&(Math.ceil(this.pageTotal1/5) <= this.page1))return;
      if((num === -1)&&(this.page1 === 1))return;
      if(num === 0)this.page1 = 1;
      this.page1 += num;
      indexServer.farmList1({params:{params3:this.page1,params4:this.size1},data:{countyCode:+this.session.get("cityId")}},({errorCode,data})=>{
        if(!errorCode){
          this.framList1 = data.pageData;
          this.pageTotal1 = data.totalCount;
        }
      });
    },
    //合作社
    getFarmList2(num){
      if((num === 1)&&(Math.ceil(this.pageTotal2/5) <= this.page2))return;
      if((num === -1)&&(this.page2 === 1))return;
      if(num === 0)this.page2 = 1;
      this.page2 += num;
      indexServer.farmList2({params:{params3:this.page2,params4:this.size2},data:{areaCode:+this.session.get("cityId")}},({errorCode,data})=>{
        if(!errorCode){
          this.framList2 = data.pageData;
          this.pageTotal2 = data.totalCount;
        }
      });
    }
	}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.nonstop-county-container{
  .main{
    width:1200px;
    margin:50px auto 0;
  }
  .data_container{
    height: 120px;
    background: url("../../assets/images/nonstop-county/bg.png") no-repeat;
    li{
      width: 20%;
      height: 100%;
      padding-top: 32px;
      float: left;
      div{
        height: 56px;
        border-right:1px solid rgba(255,255,255,0.7);
        text-align: center;
        p.title{
          color: #fff;
          margin-bottom: 10px;
          .number{
            font-size: 40px;
            line-height: 40px;
          }
          .unit{
            font-size: 20px;
            line-height: 20px;
          }
        }
        >span{
          color:rgba(255,255,255,0.7);
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
  .server_container{
    margin-top: 30px;
    width: 100%;
    >.title{
      display: inline-block;
      width: 100%;
      padding-bottom: 14px;
      border-bottom: 1px solid #e5e5e5;
      span.name{
        font-size: 20px;
        color: #000;
      }
      p.inner{
        display: inline-block;
        line-height: 14px;
        height: 14px;
        font-size: 14px;
        border-left: 1px solid #bfbfbf;
        margin-left:20px;
        padding-left:20px;
        span{
          float:left;
          margin-right: 20px;
          cursor: pointer;
          &.active{
            color: @base-text-hover-color;
          }
        }
      }
      span.to_details{
        float: right;
        font-size:14px;
        line-height: 14px;
        color: #999;
        padding-top: 14px;
        cursor: pointer;
      }
    }
    .details_container{
      position: relative;
      height: 235px;
      >img{
        float: left;
        margin-right:30px;
        padding-top: 30px;
        width:150px;
        height: 220px;

      }
      .swiper-slide{
        position: relative;
        img{
          float: left;
          padding-top: 30px;
          &.isTown{
            position: absolute;
            left: 0;
            top:0;
            width:245px;
            height: 210px;
            margin-right: 30px;
          }
        }
        ul.hasImg{
          width: 925px;
          float: right;
        }
      }
      ul{
        padding-top: 15px;
        padding-bottom:5px;
        font-size: 14px;
        float: left;
        width: 1020px;
        li{
          padding:10px 30px 10px 34px;
          span.title{
            color: #000;
            line-height: 16px;
            cursor: pointer;
          }
          &:hover{
            span.title{
              color:@base-text-hover-color;
            }
            &::before{
              background-color:@base-text-hover-color;
            }
          }
          span.date{
            color:#999;
            float: right;
          }
          &::before{
            content: '';
            display: block;
            float: left;
            width:4px;
            height: 4px;
            border-radius: 50%;
            background-color: #000;
            margin-top:7px;
            margin-right: 30px;
          }
        }
      }
    }
    &.info_container{
      ul{
        width: 100%;
      }
    }
  }
  .common_title{
    padding-bottom: 14px;
    margin-bottom:20px;
    border-bottom: 1px solid #e5e5e5;
    .name{
      font-size: 20px;
      line-height:20px;
      color: #000;
    }
    .describe{
      color: #999;
      line-height:14px;
      font-size: 14px;
      padding-left:20px;
      margin-left:20px;
      border-left:1px solid #999;
    }
    .to_more{
      float: right;
      color: #999;
      line-height:14px;
      font-size: 14px;
      padding-top: 15px;
      cursor: pointer;
    }
  }
  .financial_product_container{
    padding-top: 40px;
    ul{
      padding-left: 70px;
      li{
        float: left;
        width: 33.3333%;
        cursor: default;
        &.more{
          text-align: center;
          color: #999;
          border:1px solid #f2f2f2;
          height:204px;
          img{
            padding-top: 32px;
            padding-bottom: 10px;
            width: 120px;
          }
        }
        >div{
          position: relative;
          width: 100%;
          height:204px;
          border:1px solid #f2f2f2;
          text-align: center;
          &:hover{
            box-shadow:0 0 12px #f2f2f2;
            .hover_container{
              opacity: 1;
            }
          }
          .normal_container{
            opacity: 1;
            transition: opacity 300ms ease-out;
            .loans_name{
              padding-top: 20px;
              padding-bottom: 10px;
              /*font-weight: 600;*/
              font-size: 20px;
              color: #000;
              line-height: 24px;
              height: 54px;
            }
            img{
              width: 70px;
              height: 70px;
              padding:10px;
            }
            .bank_name{
              line-height:14px;
              padding-top: 10px;
              padding-bottom: 15px;
              font-size: 14px;
              color: @text_color_3;
              height: 39px;
            }
            /*.feature_wrapper{*/
            /*padding-left: 10px;*/
            /*text-align: left;*/
            /*}*/
            .feature{
              background-color: #f7f7f7;
              display: inline-block;
              font-size: 12px;
              color: @text_color_3;
              line-height: 20px;
              width: 70px;
              text-align: center;
              border-radius: 15px;
              border: @border2;
              margin-right: 10px;
              &:last-child{
                margin-right: 0;
              }
            }
          }
          .hover_container{
            padding-top: 18px;
            background-color: @white;
            width: 100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            box-shadow: 0 -1px 8px 1px @border-color3;
            opacity: 0;
            transition: opacity 300ms ease-out;
            -o-transition: opacity 300ms ease-out;
            i{
              margin-right:16px;
            }
            .loans_time{
              color:#010101;
              font-size: 20px;
              line-height: 20px;
              height: 20px;
              display: inline-block;
              span{
                font-size: 14px;
              }
            }
            .line{
              width: 180px;
              height:1px;
              margin:8px auto 24px;
              background-image: linear-gradient(to right,#fff,#c2c2c2,#fff);
            }
            .loans_limit{
              font-size: 14px;
              color: @text_color_3;
              line-height: 14px;
              height: 14px;
              margin-bottom:12px;
            }
            .loans_money{
              color: @text_color_1;
              font-size: 30px;
              line-height:30px;
              height: 30px;
              margin-bottom: 20px;
              span{
                font-size: 14px;
                line-height:14px;
              }
            }
            .apply_btn{
              height:45px;
              line-height:45px;
              color: @white;
              font-size: 20px;
              cursor: pointer;
              background-color: @base-text-hover-color;
              background-image: linear-gradient(to bottom,#f99d34,#f7c556);
            }
          }
        }
      }
    }
  }
  .organization_container{
    margin-top: 36px;
    .swiper_organization_container{
      padding: 6px;
      box-sizing: content-box;
    }
    ul{
      li{
        position: relative;
        float: left;
        width: 20%;
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
  .manage_list_dynamic_container{
    margin-top: 50px;
    .title{
      font-size: 20px;
      line-height:20px;
      color: #000;
      padding-bottom: 20px;
      border-bottom:1px solid #f2f2f2;
      span{
        font-size: 14px;
        color: #495060;
        cursor: pointer;
        margin-right: 20px;
        &:nth-of-type(1){
          border-left: 1px solid #bfbfbf;
          padding-left: 20px;
          margin-left:16px;
        }
        &:hover,&.active{
          color: #ff762b;
        }
      }
    }
    .manage_list{
      width: 720px;
      float: left;
      margin-right: 50px;
      table{
        width: 100%;
        min-height:300px;
        tr{
          font-size: 14px;
          td{
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 10px;
            padding-right: 10px;
            max-width: 250px;
            &:nth-of-type(1){
              padding-left: 20px;
            }
            &:nth-last-of-type(1){
              padding-right: 20px;
            }
          }
          &:nth-of-type(2n){
            background-color:#f2f2f2;
          }
        }
      }
      .pagenation{
        text-align: center;
        color: #fff;
        padding-top: 15px;
        i{
          display: inline-block;
          width: 20px;
          height: 20px;
          font-size:20px;
          line-height: 20px;
          overflow: hidden;
          cursor: pointer;
          background-color: @base-text-hover-color;
          &:nth-of-type(1){
            margin-right: 26px;
          }
          &.disabled{
            background-color: #bfbfbf;
            cursor: not-allowed;
          }
        }
      }
    }
    .dynamic{
      width: 430px;
      float: right;
      .swiper-dynamic-container{
        height: 320px;
      }
      ul{
        width: 100%;
        li{
          width: 100%;
          line-height: 80px;
          height: 80px;
          font-size: 14px;
          color: #000;
          position: relative;
          padding-left: 34px;
          span.last{
            color: #999;
            position: absolute;
            bottom:17px;
            right:0;
            line-height: 18px;
          }
          span:first-child{
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: @base-text-hover-color;
            position: absolute;
            left: 0;
            top:38px;
          }
          div{
            padding-top: 17px;
            line-height: 18px;
            p:nth-of-type(1){
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
  .import_support_container{
    margin-top: 35px;
    .common_title{
      width: 1200px;
      margin:0 auto;
    }
  }
  .projects-container-bg{
    background: url("../../assets/images/nonstop-county/bg2.jpg");
    padding: 50px 0;
    height: 235px;
  }
  .projects-container{
    position: relative;
    width:1380px;
    height: 135px;
    padding-left: 90px;
    padding-right: 90px;
    margin: 0 auto;
    .projects{
      width: 100%;
      margin:0 auto;
      height: 100%;
    }
    .swiper-slide{
      padding: 0 15px;
      >div{
        background-color: #fff;
        height: 100%;
        border-radius: 4px;
        padding: 20px;
        .title_container{
          img{
            float: left;
            width:50px;
          }
          .title{
            padding-left: 60px;
            height: 50px;
            color: #999;
            font-size: 12px;
            p{
              color: #000;
              font-size: 14px;
              border-bottom: 1px solid #e5e5e5;
              padding-bottom: 6px;
            }
          }
        }
        .content{
          padding-left: 60px;
          padding-top: 10px;
          color: #999;
          font-size: 12px;
          p.type{
            margin-bottom: 4px;
          }
          p::before{
            content: "";
            width: 4px;
            height:4px;
            border-radius: 50%;
            background-color: #9bcf56;
            display: inline-block;
            vertical-align: middle;
            margin-right: 15px;
            position: relative;
            top:-2px;
          }
        }
      }
    }
    .ivu-icon{
      position: absolute;
      z-index: 1;
      top:0;
      opacity: 0.3;
      cursor: pointer;
      color: #fff;
      /*background-color: #8ec751;*/
      &:hover{
        opacity: 0.8;
      }
    }
    .ivu-icon-ios-arrow-left{
      padding: 15px 50px 35px 0;
      left:0;
      /*background:linear-gradient(to right,#8ec751,transparent);*/
    }
    .ivu-icon-ios-arrow-right{
      padding: 15px 0 35px 50px;
      right:0;
      /*background:linear-gradient(to left,#8ec751,transparent);*/
    }
  }
  .no_data_container{
    position: relative;
    height: 100px;
  }
  .noData{
    position: absolute;
    top:50%;
    left: 50%;
    font-size:20px;
    color: #999;
    margin-left:-40px;
    margin-top: -15px;
  }
}
</style>
