<template>
  <div class="swiper-container swiper-container-banner" :style="{height:height}">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img class="bg" src="../../assets/images/banner01.jpg" alt="banner1" style="max-width: 100%;vertical-align: bottom">
      </div>
      <div class="swiper-slide">
        <img class="bg" src="../../assets/images/banner02.jpg" alt="banner2" style="max-width: 100%;vertical-align: bottom">
      </div>
      <div class="swiper-slide">
        <img class="bg" src="../../assets/images/banner03.jpg" alt="banner3" style="max-width: 100%;vertical-align: bottom">
      </div>
      <div class="swiper-slide">
        <img class="bg" src="../../assets/images/banner04.jpg" alt="banner4" style="max-width: 100%;vertical-align: bottom">
      </div>
      <div class="swiper-slide">
        <img class="bg" src="../../assets/images/banner05.jpg" alt="banner5" style="max-width: 100%;vertical-align: bottom">
      </div>

    </div>
  </div>
</template>

<script>
  import Swiper from "../../config/swiper.min.js"
export default {
	data() {
    return {
      height:this.$store.state.screenWidthScale*350+'px'
    }
	},
	mounted() {
    //banner
    new Swiper('.swiper-container-banner',{
      loop:true,
//      cssWidthAndHeight:true,
      autoplay:3000
    });
	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {

	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  //首屏
  .swiper-container-banner{
    width: 100%;
    .swiper-slide{
      position: relative;
      .bg{
        width: 100%;
      }
    }
  }
</style>
