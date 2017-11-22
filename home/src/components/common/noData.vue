<template>
  <div class="no_data">
    <div class="main">
      <img :src="src" alt="" :style="{width:imgWidth}">
      <p v-text="text"></p>
    </div>
  </div>
</template>

<script>
  import png from "../../assets/images/no_data.png"
export default {
  props:{
    text:{
      type:String,
      default:"数据录入ing，敬请期待！"
    },
    src:{
      default:png
    },
    imgWidth:{
      default:"150px"
    }
  },
	data() {
    return {

    }
	},
	beforeCreate() {
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
.no_data{
  position: relative;
  text-align: center;
  color: #999;
  width: 100%;
  .main{
    position: absolute;
    left: 50%;
    top:50%;
    width: 150px;
    margin-left: -75px;
    margin-top: -86px;
    img{
      padding-bottom: 10px;
    }
  }
}
</style>
