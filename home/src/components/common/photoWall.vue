<template>
  <div>
    <div class="swiper-container photo_wall_swiper" style="height: 240px;width: 870px;margin: 0 auto">
      <div class="swiper-wrapper" :style="{marginLeft:marginLeft}">
        <div class="swiper-slide" v-for="img in array">
          <img :src="img.src" alt="">
        </div>
      </div>
    </div>
    <p v-text="activeItem.name" style="text-align: center;padding-top: 16px"></p>
    <!--<button @click="swipeNext">111111</button>-->
  </div>
</template>

<script>
  import Swiper from "../../config/swiper.min.js"
  import img1 from "../../assets/images/photoWall/1.jpg"
  import img2 from "../../assets/images/photoWall/2.jpg"
  import img3 from "../../assets/images/photoWall/3.jpg"
  import img4 from "../../assets/images/photoWall/4.jpg"
  import img5 from "../../assets/images/photoWall/5.jpg"
  import img7 from "../../assets/images/photoWall/7.jpg"
  import img9 from "../../assets/images/photoWall/9.jpg"
  import img10 from "../../assets/images/photoWall/10.jpg"
  import img13 from "../../assets/images/photoWall/13.jpg"
  import img14 from "../../assets/images/photoWall/14.jpg"
  import img15 from "../../assets/images/photoWall/15.jpg"
export default {
  props:{
  },
	data() {
    return {
      marginLeft:"180px",
      array:[
        {
          src:img1,
          name:"9月6日蒲江县支行开展“珍爱信用记录，享受幸福人生 ”主题宣传活动",
        },
        {
          src:img2,
          name:"2016年11月29日，营管部副巡视员、副主任李宏伟到到邛崃调研指导“农贷通”平台建设工作",
        },
        {
          src:img3,
          name:"2016年11月29日，营管部副巡视员、副主任李宏伟莅临都江堰市农金服务站调研",
        },
        {
          src:img4,
          name:"2016年12月8日营管部副巡视员、副主任李宏伟到崇州市支行调研指导农村金融综合服务改革工作",
        },
        {
          src:img5,
          name:"2017年7月28日，人行蒲江县支行、县金融办、农林局组织召开辖区家庭农场信用评级推进工作会",
        },
//        {
//          src:img6,
//          name:"2017年8月10日，彭州市召开“农贷通”工作推进暨培训会",
//        },
        {
          src:img7,
          name:"2017年10月18日人民银行温江支行组织召开2017年信用户、信用村、信用镇“三项评定”工作推进会。",
        },
//        {
//          src:img8,
//          name:"都江堰市召开农贷通平台系统建设暨应收账款融资服务平台工作推进会",
//        },
        {
          src:img9,
          name:"郫都区组织开展2017年6.14“你诚 我信”大型集中宣传活动",
        },
        {
          src:img10,
          name:"蒲江县召开家庭农场信用评级宣传动员会",
        },
//        {
//          src:img11,
//          name:"邛崃市召开“农贷通”平台工作推进会",
//        },
//        {
//          src:img12,
//          name:"人行新津县支行召开“农贷通”平台建设推进会",
//        },
        {
          src:img13,
          name:"人民银行大邑支行组织开展2017年“6.14”信用记录关爱日宣传活动",
        },
        {
          src:img14,
          name:"人民银行都江堰市支行组织开展2017年“6.14信用记录关爱日”暨“农贷通”平台推广宣传活动",
        },
        {
          src:img15,
          name:"人民银行邛崃支行2017年6.14“你诚▪我信”征信宣传活动",
        },
//        {
//          src:img16,
//          name:"温江支行在温江区寿安镇天星村开设“农户讲堂”",
//        }
      ],
      activeItem:{}
    }
	},
	mounted() {
    this.mySwiper = new Swiper('.photo_wall_swiper',{
      slidesPerView:3,
      loop:true,
//      autoplay:5000,
      cssWidthAndHeight:true,
      onlyExternal:true
    });
    let mySwiper = this.mySwiper;
    this.activeItem = this.array[1];
    let swipeNext = ()=>{
      let num = (mySwiper.activeLoopIndex+2)%11;
      this.activeItem = this.array[num];
      if(num===1)num = 12;
      this.marginLeft = 180+60*(num-1)+"px";
      mySwiper.swipeNext();
    };
    this.intervalId = setInterval(swipeNext,5000);
	},
  beforeDestroy(){
    clearInterval(this.intervalId);
  },
//  methods:{
//    swipeNext(){
//      let mySwiper = this.mySwiper;
//      let num = (mySwiper.activeLoopIndex+2)%11;
//      this.activeItem = this.array[num];
//      if(num===1)num = 12;
//      this.marginLeft = 180+60*(num-1)+"px";
//      mySwiper.swipeNext();
//    }
//  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .photo_wall_swiper{
    .swiper-wrapper{
      width: 5010px;
      /*transition: all 300ms linear;*/
    }
    .swiper-slide{
      float:none;
      display: inline-block;
      width: 230px;
      height:120px;
      padding-left: 25px;
      padding-right: 25px;
      vertical-align: middle;
      /*transition: all 300ms linear;*/
      img{
        width: 100%;
        height: 100%;
      }
    }
    .swiper-slide-active + div{
      width:410px;
      height:240px;
    }
  }
</style>
