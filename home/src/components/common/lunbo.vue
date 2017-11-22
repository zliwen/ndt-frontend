<template>
  <div class="carousel-container">
    <Icon type="ios-arrow-left" size="108" @click.native.stop="mySwiper.swipePrev()"></Icon>
    <Icon type="ios-arrow-right" size="108" @click.native.stop="mySwiper.swipeNext()"></Icon>
    <div class="swiper-container lunbo carousel">
      <ul class="swiper-wrapper clearfix" :style="{marginLeft:marginLeft}">
        <li class="swiper-slide lunbo_item" v-for="(item,index) in data">
          <div>
            <img :src="item.src" alt="">
            <p class="user_evaluate_text" v-text="item.text"></p>
            <span class="user_info" v-html="item.info"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Swiper from "../../config/swiper.min.js"
  import img1 from "../../assets/images/lunbo/1.png"
  import img2 from "../../assets/images/lunbo/2.png"
  import img3 from "../../assets/images/lunbo/3.png"
  import img4 from "../../assets/images/lunbo/4.png"
  import img5 from "../../assets/images/lunbo/5.png"
  import img6 from "../../assets/images/lunbo/6.png"
export default {
  data() {
    return {
      marginLeft:"",
      data:[
        {
          src:img1,
          text:"这几年城市经济不景气，筹划着回老家建个养猪场。在朋友的推荐下申请了惠农贷，轻松借到了5万元，对回乡创业的我而言帮助很大！",
          info:"王先生&emsp;成都市彭州市"
        },
        {
          src:img2,
          text:"网站非常好，我很看好，是我比较信赖的借贷网站了。急需用钱的时候会考虑在这个网站借贷，比较适合我吧，我是比较放心的。网站设计的也不错。",
          info:"张先生&emsp;成都市邛崃市"
        },
        {
          src:img5,
          text:"这里的产品还是不错的，在贷款期限，贷款金额方面都很有优势，身边有需要的朋友还是指定推荐一下的！",
          info:"李女士&emsp;成都市都江堰市"
        },
        {
          src:img3,
          text:"前段时间我资金遇到点困难，朋友说这儿可以贷款，我就来看了下，发现这儿的产品对我们这类人还是很适合的嘛，以后有需要就靠你了！",
          info:"孙先生&emsp;成都市金堂县"
        },
        {
          src:img6,
          text:"年底准备把我老家的果园扩大一下，观测了这个网站有一段时间了，感觉不错，考虑下准备就走这个渠道了",
          info:"陈小姐&emsp;成都市彭州市"
        },
        {
          src:img4,
          text:"之前我一朋友遇到点资金周转问题，通过这个农贷通顺利度过了，最近手头有点紧，持续关注ing...",
          info:"赵先生&emsp;成都市崇州市"
        },
        {
          src:img5,
          text:"别的不说，农贷通作为一个主打农村市场的贷款产品，还是正儿八经的帮助了一大批人的忙噢！",
          info:"刘女士&emsp;成都市邛崃市"
        },
      ]
    }
  },
  props:{

  },
  mounted() {
    this.mySwiper = new Swiper('.lunbo',{
      slidesPerView:3,
      loop:true,
//      autoplay:5000,
      cssWidthAndHeight:true,
      onlyExternal:true
    });
    let swiper = this.mySwiper;
    this.marginLeft = "210px";
    let next = swiper.swipeNext;
    let prev = swiper.swipePrev;
    swiper.swipeNext = ()=>{
      let i = swiper.activeLoopIndex;
      if(i===5)i=-2;
      this.marginLeft = (i+4)*70+"px";
      next();
    };
    swiper.swipePrev = ()=>{
      let i = swiper.activeLoopIndex;
      if(i===5)i=-2;
      this.marginLeft = (i+2)*70+"px";
      prev();
    };
    swiper.intervalId = setInterval(swiper.swipeNext,5000);
  },
  destroy(){
    clearInterval(this.mySwiper.intervalId)
  },
  directives: {
  },
  computed: {
  },
  filters: {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.carousel-container{
  width:1320px;
  padding:20px 60px;
  margin:0 auto;
  height: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  position: relative;
  .carousel{
    height: 100%;
  }
  ul{
    width: 6810px!important;
    text-align: left;
  }
}
//轮播
.lunbo_item{
  text-align: center;
  float:none;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  width: 330px!important;
  height: 148px!important;
  font-size: 12px;
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
  >div{
    background-color: @white;
    border-radius: 5px;
    height: 100%;
    padding-top: 10px;
  }
  img{
    width:60px;
    height: auto;
    border-radius: 50%;
  }
  .user_evaluate_text{
    margin: 0 auto;
    color:@text_color_1;
    white-space: normal;
    text-align: left;
    transform: scale(0.7);
  }
  .user_info{
    color:@text_color_3;
    display: inline-block;
    transform: scale(0.7);
    position: relative;
    top:-5px;
  }
}
//let
.ivu-icon{
  position: absolute;
  z-index: 2;
  top:51px;
  opacity: 0.3;
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
}
.ivu-icon-ios-arrow-left{
  padding: 20px 20px 20px 0;
  left:0;
}
.ivu-icon-ios-arrow-right{
  padding: 20px 0 20px 20px;
  right:0;
}
</style>
<style lang="less">
  .carousel-container .swiper-slide-active + li{
    width:540px!important;
    height:210px!important;
    font-size: 14px;
    .user_evaluate_text{
      margin: 0 30px 20px;
      transform: scale(1);
    }
    .user_info{
      transform: scale(1);
    }
    img{
      width: 100px;
    }
  }
</style>
