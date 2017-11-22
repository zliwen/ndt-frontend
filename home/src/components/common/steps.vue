<template>
  <div class="steps_wrapper clearfix">
    <template v-for="(item,index) in data">
      <div class="step" :class="{last:index===data.length-1}">
        <img class="img" :src="index>current?item.default:item.src"/>
        <p class="step_text" v-text="item.text"></p>
      </div>
      <template v-if="index!==data.length-1">
        <span class="step_line" v-for="i in number" :class="{active:index<current}"></span>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Array
    },
    current:{
      type:Number
    },
    number:{
      type:Number,
      default:3
    }
  },
	data() {
    return {

    }
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
.steps_wrapper{
  display: inline-block;
  >div{
    float: left;
  }
  .step{
    width: 90px;
    height: 80px;
    text-align: center;
    position: relative;
    p{
      width: 100%;
      white-space: nowrap;
      position: absolute;
      bottom:0;
      font-size: 12px;
      line-height: 12px;
      color: #999;
    }
  }
  .step_line{
    float: left;
    position: relative;
    top:24px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #999;
    margin-left: 10px;
    margin-right: 10px;
    &.active{
      background-color: #27c47d;
    }
  }
}
</style>
