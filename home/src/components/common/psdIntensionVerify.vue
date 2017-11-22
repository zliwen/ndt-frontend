<template>
  <div class="psd_intension_verify_wrapper">
    <span v-for="item in check" :class="'s'+item" :title="setTitle" :key="item">{{item|rank}}</span>
    <!--<template v-if="check">-->
      <!--<span class="s1" v-show="check >= 1">弱</span>-->
      <!--<span class="s2" v-show="check >= 2">中</span>-->
      <!--<span class="s3" v-show="check >= 3">强</span>-->
    <!--</template>-->
  </div>
</template>

<script>
  const reg1 = /(^\d{1,}$)|(^[a-zA-Z]{1,}$)|(^[^a-zA-Z0-9]{1,}$)/; //数字，字母或符号其中的一种
  const reg2 = /\d*\D*((\d+[a-zA-Z]+[^0-9a-zA-Z]+)|(\d+[^0-9a-zA-Z]+[a-zA-Z]+)|([a-zA-Z]+\d+[^0-9a-zA-Z]+)|([a-zA-Z]+[^0-9a-zA-Z]+\d+)|([^0-9a-zA-Z]+[a-zA-Z]+\d+)|([^0-9a-zA-Z]+\d+[a-zA-Z]+))\d*\D*/; //数字字母字符任意组合
export default {
  props:{
    value:{
      type:String,
      default:""
    }
  },
	data() {
    return {
    }
	},
	created() {
	},
	directives: {

	},
  filters:{
    rank(v){
      switch (v){
        case 1:return "弱";
        case 2:return "中";
        case 3:return "强";
      }
    }
  },
	computed: {
    check(){
      let value = this.value;
      if(!value)return 0;
      if(value.length<6||reg1.test(value))return 1;
      if(reg2.test(value))return 3;
      else return 2;
    },
    setTitle(){
      switch (this.check){
        case 1:return "有被盗风险,建议使用字母、数字和符号两种及以上组合";
        case 2:return "安全强度适中，可以使用三种以上的组合来提高安全强度";
        case 3:return "你的密码很安全";
      }
    }
	},
	methods: {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .psd_intension_verify_wrapper{
    width: 100%;
    height:16px;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    cursor: default;
    >span{
      float: left;
      width: 33.33%;
      height: 100%;
      border-left:1px solid #fff;
      border-right:1px solid #fff;
      &.s1{
        background-color: #ed3f14;
      }
      &.s2{
        background-color: #ff762b;
      }
      &.s3{
        background-color: #19be6b;
      }
    }
  }
</style>
