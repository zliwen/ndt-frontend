<template>
  <div class="financial-item">

    <span class="bank_name" v-text="result.orgName"></span>
    <p class="title">
      <span class="overflow" v-text="result.name" :title="result.name"></span>
    </p>
    <div class="location">
      <img :src="location" >
      <span>受理范围：</span>
      <span v-if="result.divisionsValue"  v-for="(item,index) in result.divisionsValue" :key="index" >{{item}}</span>
      <span v-if="result.divisionNames"  v-for="(item,index) in result.divisionNames" :key="index" >{{item}}</span>
    </div>
    <div class="money_container">
      <div class="money">
        <span><span>{{result.maxAmount}}</span><i>{{result.mixAmountUnit}}</i></span>
        <p class="max">最高借款额度</p>
      </div>
      <div class="label_container">
        <div class="circle_container" v-if="result.loanTypes">
          <i class="circle" :class="{no_active:result.loanTypes.indexOf(2803)===-1}" title="抵押贷款">抵</i>
          <i class="circle" :class="{no_active:result.loanTypes.indexOf(2804)===-1}" title="质押贷款">质</i>
          <i class="circle" :class="{no_active:result.loanTypes.indexOf(2801)===-1}" title="信用贷款">信</i>
          <i class="circle" :class="{no_active:result.loanTypes.indexOf(2802)===-1}" title="担保贷款">保</i>
        </div>
        <i class="pc-ico" v-for="item in (result.productToValue||result.productToNames)" v-text="item"></i>
      </div>
    </div>
    <p class="tag_wrapper">
      <span v-for="tag in result.labelNames" v-text="tag"></span>
    </p>
    <img class="coner" :src="specialty_pro" alt="特色产品" v-if="result.onlyNdt">
  </div>
</template>

<script>
  import specialty_pro from "../../assets/images/specialty_pro.png"
  import location from "../../assets/images/location.jpg"
  import loanTypeBack from "../../assets/images/loanTypeBack.jpg"
export default {
  props:{
    data:{
      type:Object
    }
  },
	data() {
    return {
      specialty_pro,
      location,
      loanTypeStyle:{
        'background-image':"url("+loanTypeBack+")"
      }
    }
	},
	created() {
	},
	directives: {

	},
	computed: {
    result(){
      let obj = JSON.parse(JSON.stringify(this.data));this.formatter(obj);return obj;
    }
	},
	filters: {
	},
	methods: {
    formatter(item) {
      let multiple = item.mixAmountUnit === 2202?10000:1;
      let value = item.maxAmount*multiple;
      if(value<10000){item.mixAmountUnit = "元";item.maxAmount =  value;return}
      let num = value / 10000;
      if (value < 100000000){item.mixAmountUnit = "万元";item.maxAmount =  num.toFixed(2) == num ? num  : num.toFixed(2) ;return}
      num = value / 100000000;
      if (value >= 100000000){item.mixAmountUnit = "亿元";item.maxAmount =  num.toFixed(2) == num ? num : num.toFixed(2) ;}
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .financial-item{
    width: 333px;
    height: 204px;
    padding-top: 18px;
    padding-left: 28px;
    font-size: 12px;
    margin-right: 30px;
    margin-bottom: 14px;
    border:1px solid #f2f2f2;
    position: relative;
    transition: all 200ms linear;
    cursor: pointer;
    &.row_last{
      margin-right: 0;
    }
    &:hover{
      transform: translateY(-2px);
      box-shadow: 0 0 10px #f2f2f2;
    }
    i{
      font-style: normal;
    }
    .title{
      font-size: 12px;
      color: #ff762b;
      margin-top: 3px;
      span{
        max-width: 200px;
        height: 20px;
        display: inline-block;
        font-size: 20px;
        color: #000;
        line-height: 20px;
        /*margin-right: 9px;*/
        vertical-align: middle;
      }
    }
    .bank_name,.max{
      color: #999;
    }
    .max{
      line-height: 16px;
    }
    .location{
      line-height: 12px;
      padding-top: 6px;
      img{
        height: 12px;
        vertical-align:top;
      }
    }
    .money_container{
      margin-top: 18px;
      .money{
        display: inline-block;
        width: 102px;
        margin-right: 4px;
        >span{
          display:inline-block;
          width: 102px;
          line-height: 32px;
          font-size: 32px;
          color: #ff762b;
          white-space: nowrap;
          span{
            /*width: 72px;*/
            display: inline-block;
            text-align: center;
            margin-right: 2px;
          }
          i{
            /*text-align: right;*/
            /*width: 28px;*/
            vertical-align: middle;
            display: inline-block;
          }
        }
      }
      i{
        font-size: 14px;
        color: #333;
        line-height:14px;
      }
      .label_container{
        display: inline-block;
        vertical-align: top;
        .circle_container{
          padding-bottom: 5px;
        }
      }
      .circle{
        font-size: 12px;
        color: #fff;
        display: inline-block;
        width: 20px;
        height:20px;
        border-radius: 50%;
        line-height:20px;
        text-align: center;
        &:nth-of-type(1){
          background-color: #ffc12b;
          background-image: linear-gradient(to top,#ffc12b,#ffda2b);
        }
        &:nth-of-type(2){
          background-color: #ffad2b;
          background-image: linear-gradient(to top,#ffad2b,#ffc741);
        }
        &:nth-of-type(3){
          background-color: #ff8625;
          background-image: linear-gradient(to top,#ff8625,#ffb22b);
        }
        &:nth-of-type(4){
          background-color: #f44d0b;
          background-image: linear-gradient(to top,#f44d0b,#ff9e2b);
        }
        &.no_active{
          background-image: none;
          background-color: #dadada;
        }
      }
      i.pc-ico{
        display: inline-block;
        border:1px solid #ff762b;
        width: 40px;
        color:#ff762b;
        height:20px;
        border-radius: 10px;
        line-height: 18px;
        text-align: center;
        vertical-align: top;
        margin-right: 10px;

      }
    }
    .special_tag{
      border-radius: 3px;
      position: relative;
      top:-3px;
      margin-left:15px;
      height: 24px;
      line-height:20px;
      background: no-repeat;
      width: 80px;
      color: #fff;
      text-align: left;
      padding-left: 12px;
      display: inline-block;
    }
    .tag_wrapper{
      margin-top: 14px;
      line-height:18px;
      color: #aaa;
      span{
        text-align: center;
        padding: 0 10px;
        min-width: 70px;
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
        height: 20px;
        border-radius:10px;
        border:1px solid #ccc;
        background-color: #f7f7f7;
      }
    }
   .coner{
      position: absolute;
      right:-7px;
      top:-6px;
    }
  }
</style>
