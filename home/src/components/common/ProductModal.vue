/**
* Created by chenchen on 2017/9/27.
*/

<template>
  <Modal
      class="product-modal"
      v-model="modelShow"
      :mask-closable="false"
      width="800">
      <div>
        <div class="modal-head">
            <div class="logo">
                <img :src="d.squareLogo" alt="">
            </div>
            <div class="main-msg">
              <h3 class="overflow" :title="d.name">{{d.name}}</h3>
              <p class="orgname overflow">{{d.orgName}}</p>
              <div class="overflow">
                <span class="label" v-for="o in d.labelNames" :key="o">{{o}}</span>
              </div>
            </div>
            <div>
              <a class="sure-btn" @click="goApply">立即申请</a>
            </div>
        </div>
        <div class="product-lines clearfix">
            <div>
              <span>贷款方式</span>
              <span class="right">
                 <span v-for="(o,i) in d.loanTypes" :key="i">
                  <span>{{o | codeName}}</span>
                  <i v-if="i!==d.loanTypes.length-1">,</i>
                </span>
              </span>
            </div>
            <div>
              <span>贷款对象</span>
              <span class="right">
                 <span v-for="(o,i) in d.productTo" :key="i">{{o | codeName}}<i v-if="i!==d.productTo.length-1">,</i></span>
              </span>
            </div>
            <div>
              <span>受理范围</span>
              <span class="right">
                <span v-for="(o,i) in d.divisionNames" :key="i">{{o}}<i v-if="i!==d.divisionNames.length-1">,</i></span>
              </span>
            </div>
            <div>
              <span>最高借款额度</span>
              <span class="right">&nbsp;{{d.maxAmount}} {{d.mixAmountUnit | codeName}}</span>
            </div>
            <div>
              <span>最长借款期限</span>
              <span class="right">&nbsp;{{d.maxTerm}} {{d.maxTermUnit | codeName}}</span>
            </div>
            <!-- <div>
              <span>借款费率</span>
              <span class="right">{{d.rate}}</span>
            </div> -->
        </div>
        <div class="product-text">
            <h2>产品简介</h2>
            <p style="min-height: 100px" v-html="d.remark"></p>
        </div>
      </div>
    <!--<Icon type="ios-close-outline" size="134" slot="close" color="#fff"></Icon>-->
    <Icon type="ios-close-empty" size="134" slot="close"></Icon>
  </Modal>
</template>

<script>
  import productServer from "rs/product"
  import goApplyFor from "../../services/goApplyFor"
  export default {
    data() {
      return {
          modelShow:false,
          pId:0,
          d:{
            loanTypes:[],
            productTo:[],
            divisionNames:[]
          }
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      showModal(pId){
          if(pId !== 0){
            this.pId = pId;
            this.init(pId);
          }
          else{
            throw new Error("未接收到参数pId");
          }
      },
      init(){
        productServer.findById({
          params:{id:this.pId}
        },(res)=>{
          if(res.errorCode == 0){
            this.d = res.data;
            this.modelShow = true;
          }
        },(err)=>{

        })
      },
      goApply(){
        this.modelShow = false;
        goApplyFor({id:this.pId},this);
        // if(!this.session.get('token')){
        //   this.$Modal.confirm({
        //     title: '您还未登录',
        //     content: '<p>是否去登录？</p>',
        //     onOk: () => {
        //       this.$router.push({name:'loginAndRegister',query:{type:1}});
        //     },
        //     onCancel: () => {

        //     }
        //   });
        //     return
        // }
        // this.$router.push({name:'applyFor',query:{id:this.pId}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.product-modal{
  padding: 0;
  position: relative;
  .ivu-modal-close{
    position: absolute;
    right:-100px;
    top:-42px;
    i{
      color: #fff;
    }
    &:hover i{
      color: #b2b2b2;}
  }
  .modal-head{
    padding: 34px 50px 0;
    height: 184px;
    >div{
      float: left;
      &:nth-of-type(3){
        float: right;
      }
    }
    .logo{
      width: 100px;
      height: 100px;
      margin-right: 30px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .main-msg{
      width: 380px;
      h3{
        font-size: 20px;
      }
      .orgname{
        font-size: 14px;
        color:#999;
        line-height: 14px;
        margin-bottom:24px;
        margin-top: 12px;
      }
      .label{
        display: inline-block;
        border:1px solid #d0d0d0;
        color:#999;
        padding: 0 10px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        margin-right: 5px;
      }
    }
    .sure-btn{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      color:#ff6800;
      border:1px solid #ff6800;
      width: 180px;
      text-align: center;
      transition: all 200ms linear;
      &:hover{
        background-color: #ff762b;
        color: #fff;
      }
    }
  }
  .product-msg{
    margin-top: 25px;
    display: flex;
    padding: 20px;
    div{
      flex:1;
      text-align: center;
      h4{
        font-size: 16px;
        color:#000;
        line-height: 22px;
      }
      p{
        font-size: 14px;
        color:#aaa;
      }
    }
  }
  .limit{
    height: 100px;
    padding-top: 30px;
    >div{
      float: left;
      text-align: center;
      &:nth-of-type(1){
        width: 365px;
      }
      &:nth-of-type(2){
        width: 202px;
        border-left:1px solid rgba(153,153,153,.3);
        border-right:1px solid rgba(153,153,153,.3);
      }
      &:nth-of-type(3){
        width: 233px;
      }
      span{
        font-size: 16px;
        color: #000;
      }
      p{
        font-size: 12px;
        margin-top: 8px;
        color: #999;
      }
    }
  }
  .product-lines{
    background-color: #f2f2f2;
    // margin-top: 10px;
    padding: 20px 80px 20px;
    line-height: 30px;
    font-size: 14px;
    color:#909090;
    img{
      position: relative;
      top:5px;
      margin-right: 10px;
    }
    .lit-ico{
      position: relative;
      top:3px;
      width: 16px;
      height: 16px;
    }
    .right{
      color:#000;
      float:right;
    }
  }
  .product-text{
    min-height: 120px;
    padding:30px 80px 50px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    h2{
      color: #000;
      font-size: 16px;
      line-height: 30px
    }
    p{
      font-size: 12px;
      color:#999;
      line-height: 20px;
      text-indent: 24px;
      /*max-height: 220px;*/
      overflow: hidden;
    }
  }

  .ivu-modal-body{
    padding: 16px 0 0 ;
  }
  .ivu-modal-footer{
    display: none;
  }
}
</style>
