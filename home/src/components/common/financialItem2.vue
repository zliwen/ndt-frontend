<template>
  <div class="financial-item">
    <span class="bank_name" v-text="result.orgName"></span>
    <p class="title">
      <span class="overflow" v-text="result.name" :title="result.name"></span>
    </p>
    <div class="location overflow">
      <Icon type="android-person" color="#ff762b" size="15"></Icon>
      <span>适用人群：</span>
      <span v-if="result.intendedFor"  v-for="(item,index) in result.intendedFor" :key="index" >{{item+((index===result.intendedFor.length-1)?"":",")}}</span>
      <!--<span v-if="result.divisionNames"  v-for="(item,index) in result.divisionNames" :key="index" >{{item}}</span>-->
    </div>
    <div class="money_container clearfix">
      <div class="money" style="border-right: 1px solid #ccc;width: 131px">
        <span class="overflow" :title="result.insuranceLimit+'元'"><span>{{result.insuranceLimit}}</span><i>元</i></span>
        <p class="max">最高赔付金额</p>
      </div>
      <div class="money" style="width: 144px;padding-left: 29px">
        <span class="overflow" :title="result.insuranceCosts+'元/月'"><span>{{result.insuranceCosts}}</span><i>元/月</i></span>
        <p class="max">保费</p>
      </div>
    </div>
    <!--<img class="coner" :src="specialty_pro" alt="特色产品" v-if="false">-->
  </div>
</template>

<script>
  import specialty_pro from "../../assets/images/snzx.png"
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
    padding-top: 24px;
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
      margin-top: 8px;
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
      padding-top: 10px;
      img{
        height: 12px;
        vertical-align:top;
      }
    }
    .money_container{
      padding-right: 28px;
      margin-top: 36px;
      .money{
        float: left;
        >span{
          display:inline-block;
          width: 100%;
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
