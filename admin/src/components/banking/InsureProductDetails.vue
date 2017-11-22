/**
* 保险产品
* Created by chenchen on 2017/11/06.
*/

<template>
  <div class="Product-details">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
        <FormItem label="产品名称" prop="name" :label-width="220">
          <Input type="text" v-model="formCustom.name" placeholder="请输入产品名称"></Input>
        </FormItem>
        <FormItem label="产品编码" prop="code" :label-width="220">
          <Input type="text" v-model="formCustom.code" placeholder="请输入产品编码"></Input>
        </FormItem>
        <FormItem label="保费" :label-width="220">
          <Input type="text" v-model="formCustom.insuranceCosts" placeholder="输入保费"></Input>
        </FormItem>
        <FormItem label="保额" :label-width="220">
          <Input type="text" v-model="formCustom.insuranceLimit" placeholder="输入保额"></Input>
        </FormItem>
        <FormItem label="适用人群" :label-width="220">
          <Input type="text" v-model="formCustom.intendedFor[0]" placeholder="输入适用人群，多个词条用空格隔开"></Input>          
        </FormItem>
        <FormItem label="保障期限" :label-width="220">
          <Input type="text" v-model="formCustom.guaranteePeriod" placeholder="输入保障期限"></Input>
        </FormItem>
        <!-- <FormItem label="农贷通专属" :label-width="220">
            <i-switch v-model="formCustom.onlyNdt"></i-switch>  
        </FormItem> -->
        <FormItem label="产品介绍"  :label-width="220">
          <Input type="textarea" :rows="8" v-model="formCustom.introduce" placeholder="输入产品介绍"></Input>            
        </FormItem>
        <FormItem label="理赔服务"  :label-width="220">
          <Input type="textarea"  :rows="8" v-model="formCustom.claimsService" placeholder="输入理赔服务"></Input>            
        </FormItem>
        <FormItem label="投保须知" :label-width="220">
          <Input type="textarea"  :rows="8" v-model="formCustom.insuranceNotice" placeholder="输入理赔服务"></Input>            
        </FormItem>
        <FormItem label="优先级" :label-width="220">
          <InputNumber :min="0" v-model="formCustom.priority" placeholder="优先级"></InputNumber>            
        </FormItem>
        <!-- <FormItem prop="logoimg"  label="封面" :label-width="220">
            <UploadImg  :cutSize="cutSize" v-model="formCustom.logo"></UploadImg>
        </FormItem> -->
        <FormItem label="" :label-width="220">
          <Button type="info" size="large" long @click="modalSubmit">确认提交</Button>
          <Button style="margin-top:20px;" type="default" size="large" long @click="modalCancle">取消</Button>
        </FormItem>
      </Form>
  </div>
</template>

<script>
  import UE from '../common/Editor';
  import organizationServer from 'rs/organizationServer';
  import otherServer from 'rs/otherServer';
  import productServer from 'rs/insureProductServer';
  export default {
    components:{UE},
    name: 'Product',
    data () {
      return {
        hideProductType:false,
        userType:this.session.get("userType"),
        imgShow:false,
        cutSize:[100,100],
        initCitys:[],
        stateList:[],
        loanTypeList:[],
        productToList:[],
        labelList:[],
        pTypeList:[],
        amountUnitList:[],
        termUnitList:[],
        loadingStatus:false,
        localData:[],
        waitUploadImgs:[],
        organizationTypeList: [],
        countyList: [],
        townList: [],
        villageList: [],
        addLoading: false,
        formCustom:{},
        formCustomInit: {
            "code": "",
            "name": "",
            "insuranceCosts": "",
            "insuranceLimit": "",
            "intendedFor": [''],
            "logo": 0,
            "guaranteePeriod": "",
            "introduce": "",
            "insuranceNotice": "",
            "claimsService": "",
            "priority": 1
        },
        ruleCustom: {
          name:[
            { required: true, max: 50, message: '填写产品名称且不能超过50个字', trigger: 'blur,change'}
          ],
          code:[
            { required: true,max: 50, message: '填写产品编号且不能超过50个字', trigger: 'blur,change'}
          ],
        },
        validData:{
            amount:false,
            amountStr:"",
            term:false,
            termStr:"",
            loanType:false,
            loanTypeStr:"",
            productTo:false,
            productToStr:"",
        },
        keyWord: {
          queryNameOrCode:"",
          state:null,
        },
        addModal: false,
        tableData: [],
        total: 0,
        current: 1,
        pageSize: 10,
        loading: true,
        loadingMo: true,
      }
    },
    mounted:function () {
      let obj = JSON.parse(this.session.get('productObj'));
    },
    created: function () {
      if(!this.session.get('productObj')){
          this.modalCancle();
          return;
      }
      this.getCodeTable('28', data => {
        this.loanTypeList = data;
      });
      this.getCodeTable('33', data => {
        this.pTypeList = data;
      });
      this.getCodeTable('27', data => {
        this.productToList = data;
      });
      this.getCodeTable('20', data => {
        this.labelList = data;
      });
      this.getCodeTable('22', data => {
        this.amountUnitList = data;
        this.formCustom.maxAmountUnit = data[0].id;
      });
      this.getCodeTable('23', data => {
        this.termUnitList = data;
        this.formCustom.maxTermUnit = data[0].id;
      });

      let obj = JSON.parse(this.session.get('productObj'));
     // this.session.remove("productObj");
      this.modalType = obj.type;
      if(obj.type == "new"){
        this.formCustom = JSON.parse(JSON.stringify(this.formCustomInit));
        this.formCustom.maxAmountUnit = this.amountUnitList[0].id;
        this.formCustom.maxTermUnit =  this.termUnitList[0].id;
        this.modalType = "new";
        this.initCitys = [];
      }
      else if(obj.type == "edit"){
        let data = obj.data;
        console.log(data);
        if(data.logoImageUrl!=""){
          this.imgShow = true;
        }

        this.formCustom = Object.assign(JSON.parse(JSON.stringify(this.formCustomInit)),JSON.parse(JSON.stringify(data)));
        this.formCustom.intendedFor = this.formCustom.intendedFor||[''];
        this.modalType = "edit";
        this.addModal = true;
      }
      if(this.userType=='205'||this.userType=='206'||this.userType=='207'){
          this.hideProductType=true;
          switch (this.userType){
            case '205':
              this.formCustom.productType=3301;
              break;
            case '206':
              this.formCustom.productType=3302;
              break;
            case '207':
              this.formCustom.productType=3303;
              break;
          }
      }
    },
    methods: {
      // loanTypeChange(){
      //   if(this.formCustom.loanTypes.length == 0){
      //       this.validData.loanType = true;
      //       this.validData.loanTypeStr = "请至少选择一种贷款方式";
      //     }
      //   else  this.validData.loanType = false;
      // },
      // productToChange(){
      //   if(this.formCustom.productTo.length == 0){
      //       this.validData.productTo = true;
      //       this.validData.productToStr = "请至少选择一种贷款对象";
      //     }
      //   else  this.validData.productTo = false;
      // },
      amountChange(){
         this.validData.amount = false;
         this.validData.amountStr = '';
      },
      termChange(){
        this.validData.term = false;
        this.validData.termStr = "";
      },
      upImgSuccess(response){//图片上传成功回调
        if(response.errorCode==0){
            this.formCustom.logoImageUrl = response.url;
            this.imgShow = false;
        }
      },
      divisionsChange(data){//选择区域回调
        this.formCustom.divisions = [];
        let i= 0;
        data.forEach(item => {
           if(item.value){
              this.formCustom.divisions.push(item.value[item.value.length - 1])
           }
        });
      },
      modalCancle(){//返回产品列表页
         this.$router.push("../insure-product")
      },
      modalSubmit () {//确定提交按钮回调
        let that = this;
        this.$refs.formCustom.validate((valid) => {
          if (valid) {
          // 完成表单验证功能后把上面的代码移动到这里
            this.formCustom.mixAmountUnit = this.formCustom.maxAmountUnit;
            this.formCustom.mixTermUnit = this.formCustom.maxTermUnit;
            if(this.modalType=='new'){
              productServer.addProduct({},this.formCustom,
                function (response) {
                  // 请求返回结果
                  if(response.errorCode ==0){
                      that.$Message.success("保存成功");
                      that.$router.push("../insure-product")
                  }else{
                      that.$Message.error("保存失败");
                  }
              }, function (err) {
                  that.loading=false;
                  // 请求失败
              })
            }else if(this.modalType == "edit"){
              productServer.editProduct({},this.formCustom, function (response) {
                  // 请求返回结果
                  if(response.errorCode ==0){
                      that.$Message.success("保存成功");
                      that.$router.push("../insure-product")
                  }else{
                      that.$Message.error("保存失败");
                  }
              }, function (err) {
                  that.loading=false;
                  // 请求失败
              })
            }
          } else{
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })

      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css">
  .Product-details { width: 900px; }
  .Product-details #editor{min-height:400px; width: 640px; }
</style>
