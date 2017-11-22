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
          <p class="orgname">
            <span>申请联系电话：</span>
            <b class="sure-btn">{{phone}}</b>
          </p>

        </div>
      </div>
      <div class="product-lines clearfix">
        <div>
          <div class="clearfix">
            <span>适用对象</span>
            <span class="right">
                 <span v-for="(o,i) in d.intendedFor" :key="i">{{o}}<i
                   v-if="i!==d.intendedFor.length-1">,</i></span>
              </span>
          </div>
          <div class="clearfix">
            <span>最高保障金额</span>
            <span class="right">
                 <span>{{d.insuranceLimit}}</span>
          </span>
          </div>

        </div>
        <div class="f2">
          <div class="clearfix">
            <span>保障期限</span>
            <span class="right">
                 <span>{{d.guaranteePeriod}}</span>
          </span>
          </div>
          <div class="clearfix">
            <span>保费</span>
            <span class="right">
                 <span>{{d.insuranceCosts}}</span>
          </span>
          </div>
        </div>
      </div>
      <div style="padding: 20px 100px;">
        <Tabs value="name1">
          <TabPane label="产品简介" name="name1">{{d.introduce}}</TabPane>
          <TabPane label="投保须知" name="name2">{{d.insuranceNotice}}</TabPane>
          <TabPane label="理赔服务" name="name3">{{d.claimsService}}</TabPane>
        </Tabs>
      </div>

    </div>

    <!--<Icon type="ios-close-outline" size="134" slot="close" color="#fff"></Icon>-->
    <Icon type="ios-close-empty" size="134" slot="close"></Icon>
  </Modal>
</template>

<script>
  import insureProductServer from "rs/insureProduct"
  import goApplyFor from "../../services/goApplyFor"
  export default {
    data() {
      return {
        phone:"",
        modelShow: false,
        pId: 0,
        d: {
          name: "",
          logoImageUrl: "",
          loanTypes: [],
          productTo: [],
          divisionNames: []
        }
      }
    },
    created() {
    },
    computed: {},
    methods: {
      showModal(pId,phone){
        this.phone=phone;
        if (pId !== 0) {
          this.pId = pId;
          this.init(pId);
        }
        else {
          throw new Error("未接收到参数pId");
        }
      },
      init(){
        insureProductServer.findById({
          params: {id: this.pId}
        }, (res) => {
          if (res.errorCode == 0&&res.data) {
            this.d = res.data;
            this.modelShow = true;
          }
        }, (err) => {

        })
      },
      goApply(){
        //this.modelShow = false;
        //goApplyFor({id: this.pId}, this);
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
  .ivu-tabs{ min-height: 300px;}
  .ivu-tabs-bar{ border: none;}
  .ivu-tabs-nav-container{ width: 320px; margin: 0 auto -1px;}
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
  .sure-btn{ padding: 0 10px;
    display: inline-block;
    height: 26px;
    line-height: 24px;
    font-size: 18px;
    color:#ff6800;
    border:1px solid #ff6800;
    border-radius: 10px;

    text-align: center;
    transition: all 200ms linear;
  &:hover{
     background-color: #ff762b;
     color: #fff;
   }
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
    width: 570px;
  h3{
    font-size: 20px;
  }
  .orgname{
    font-size: 14px;
    color:#999;
    line-height: 14px;
    margin-bottom:10px;
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
    padding: 20px;
    line-height: 30px;
    font-size: 14px;
    color:#909090;
  >div{ float: left; width: 50%; padding:0 40px;}
   .f2{ border-left: 1px solid #aaa;}
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
  .right{ padding-top: 4px;
    color:#000;
    float:right;
    width: 195px;
    line-height: 24px;

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
