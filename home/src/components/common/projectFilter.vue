<template>
  <div class="project_filter_container">
    <div class="already_classified clearfix">
      <span class="item_name">已选分类<Icon type="ios-arrow-right" size="14"></Icon></span>
      <transition-group tag="div" class="item_content" mode="out-in">
        <Tag v-for="item in choose" :key="item" :name="item" closable type="border" color="yellow" @on-close="close(item)">{{ item |valueToName }}</Tag>
        <span key="span" class="btn" @click="clear" v-show="choose.length">清除筛选</span>
      </transition-group>
    </div>
    <div class="filter_wrapper clearfix">
      <span class="item_name">筛&emsp;&emsp;选<Icon type="ios-arrow-right" size="14"></Icon></span>
      <div class="item_content">
        <div class="row">
          <span class="sub_item_name">贷款对象（可多选）：</span>
          <div class="sub_item_content" style="margin-right: 50px;">
            <CheckboxGroup v-model="productTo">
              <Checkbox :label="2701">个人</Checkbox>
              <Checkbox :label="2702">企业</Checkbox>
            </CheckboxGroup>
          </div>
          <span class="sub_item_name">贷款方式（可多选）：</span>
          <div class="sub_item_content">
            <CheckboxGroup v-model="loanTypes">
              <Checkbox :label="2801">信用贷款</Checkbox>
              <Checkbox :label="2802">担保贷款</Checkbox>
              <Checkbox :label="2803">抵押贷款</Checkbox>
              <Checkbox :label="2804">质押贷款</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
        <div class="row">
          <span class="sub_item_name">特色产品：</span>
          <div class="sub_item_content" style="margin-right: 44px;">
            <RadioGroup v-model="onlyNdt">
              <Radio :label="1">是</Radio>
              <Radio :label="2">否</Radio>
              <Radio :label="3">不限制</Radio>
            </RadioGroup>
          </div>
          <span class="sub_item_name">可借款金额区间：</span>
          <div class="sub_item_content">
            <Select v-model="moneySection" style="width: 120px">
              <Option :value="4">小于30万</Option>
              <Option :value="5">30万~200万</Option>
              <Option :value="6">200万~500万</Option>
              <Option :value="9">500万以上</Option>
            </Select>
            （元）
          </div>
        </div>
      </div>
    </div>
    <div class="sort_wrapper clearfix">
      <span class="item_name" style="line-height: 32px">排序方式<Icon type="ios-arrow-right" size="14"></Icon></span>
      <div class="item_content">
        <Select v-model="sort" style="width: 150px">
          <Option :value="7">按上架时间排序</Option>
          <Option :value="8">按优先级排序</Option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
    },
    data() {
      return {
        productTo:[],
        loanTypes:[],
        onlyNdt:undefined,
        moneySection:undefined,
        sort:"",
      }
    },
    directives: {

    },
    computed: {
      choose:{
        get:function () {
          let productTo = this.productTo,loanTypes = this.loanTypes,onlyNdt = this.onlyNdt,moneySection = this.moneySection,sort = this.sort,array = productTo.concat(loanTypes);
          if(onlyNdt)array.push(onlyNdt);
          if(moneySection)array.push(moneySection);
          if(sort)array.push(sort);
          return array;
        }
      }
    },
    watch:{
      "choose":function(n,o) {
        if(JSON.stringify(n)===JSON.stringify(o))return;
        let obj = {},productTo = this.productTo,loanTypes = this.loanTypes,onlyNdt = this.onlyNdt,moneySection = this.moneySection,sort = this.sort;
        if(productTo.length)obj.productTo = productTo;
        if(loanTypes.length)obj.loanTypes = loanTypes;
        if(onlyNdt){
          if(onlyNdt!==3){obj.onlyNdt = onlyNdt===1?true:false}
        }
        if(moneySection){
          switch (moneySection){
            case 4:
              obj.loanAmountMax = 300000;
              break;
            case 5:
              obj.loanAmountMin = 300000;
              obj.loanAmountMax = 2000000;
              break;
            case 6:
              obj.loanAmountMin = 2000000;
              obj.loanAmountMax = 5000000;
              break;
            case 9:
              obj.loanAmountMin = 5000000;
              break;
          }
        }
        if(sort){
          switch (sort){
            case 8:
              obj.importance = true;
              break;
            case 7:
              obj.addTime = true;
              break;
          }
        }
        this.$emit('change',JSON.parse(JSON.stringify(obj)));
      }
    },
    filters: {
      valueToName(v){
        switch (v){
          case 2701:
            return "个人";
          case 2702:
            return "企业";
          case 2801:
            return "信用贷款";
          case 2802:
            return "担保贷款";
          case 2803:
            return "抵押贷款";
          case 2804:
            return "质押贷款";
          case 1:
            return "特色产品";
          case 2:
            return "非特色产品";
          case 3:
            return "所有产品";
          case 4:
            return "30万以下";
          case 5:
            return "30~200万";
          case 6:
            return "200~500万";
          case 9:
            return "500万以上";
          case 7:
            return "按上架时间排序";
          case 8:
            return "按优先级排序";
        }
      }
    },
    methods: {
      close(v){
        switch (v){
          case 2701:
          case 2702:
            this.productTo = this.productTo.filter(l=>l!==v);break;
          case 2801:
          case 2802:
          case 2803:
          case 2804:
            this.loanTypes = this.loanTypes.filter(l=>l!==v);break;
          case 1:
          case 2:
          case 3:
            this.onlyNdt = undefined;break;
          case 4:
          case 5:
          case 6:
          case 9:
            this.moneySection = "";break;
          case 7:
          case 8:
            this.sort = "";break;
        }
      },
      clear(){
        this.productTo=[];
        this.loanTypes=[];
        this.onlyNdt=undefined;
        this.moneySection="";
        this.sort="";
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .project_filter_container .ivu-checkbox-wrapper-checked{
    color: #ff762b;
  }
  .project_filter_container .ivu-icon-ios-close-empty{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    left:5px;
    top: -1px;
    text-align: center;
  }
</style>
<style scoped lang='less'>
  .project_filter_container{
    background-color: #f9f9f9;
    padding-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 12px;
  .item_name,.sub_item_name{
    color: #333;
    line-height: 28px;
  }
  .item_name{
    float: left;
  i{
    margin-left:20px;
  }
  }
  .sub_item_content{
    display: inline-block;
    vertical-align: middle;
    color: #999;
  }
  .item_content{
    padding-left: 90px;
  .row{width: 100%;display: inline-block}
  }
  .ivu-tag{
    background-color: #f7f7f7;
    margin-right: 8px;
  }
  .btn{
    color: #f90;
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height:26px;
    line-height:24px;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    border:1px solid #f90;
    background-color: #fff;
  &:hover{
     background-color: #f90;
     color: #fff;
   }
  }
  >div,.row{
     margin-bottom: 10px;
   }
  }
</style>
