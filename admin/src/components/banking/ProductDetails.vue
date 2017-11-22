/**
* 贷款产品
* Created by chenchen on 2017/9/20.
*/

<template>
  <div class="Product-details">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
        <FormItem v-if="!hideProductType" label="产品类型" required prop="productType" :label-width="220">
            <Select v-model="formCustom.productType">
                <Option v-for="(item,index) in pTypeList" :key="index" :value="item.id">{{item.value}}</Option>
            </Select>
        </FormItem>
        <FormItem label="产品名称" prop="name" :label-width="220">
          <Input type="text" v-model="formCustom.name" placeholder="请输入产品名称"></Input>
        </FormItem>
        <FormItem label="产品编码" prop="productCode" :label-width="220">
          <Input type="text" v-model="formCustom.productCode" placeholder="请输入产品编码"></Input>
        </FormItem>
        <FormItem label="标签"  :label-width="220" prop="labels">
            <Select v-model="formCustom.labels" clearable multiple>
                <Option v-for="(item,index) in labelList" :key="index" :value="item.id">{{item.value}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="divisions" label="区域" required :label-width="220">
           <GetCitys :setValues="initCitys" @onChange="divisionsChange"></GetCitys>
        </FormItem>
        <FormItem label="贷款方式" required prop="loanTypes"  :label-width="220">
          <CheckboxGroup v-model="formCustom.loanTypes" >
              <Checkbox v-for="(item,index) in loanTypeList" :key="index" :label="item.id">{{item.value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="贷款对象" required prop="productTo"  :label-width="220">
          <CheckboxGroup v-model="formCustom.productTo">
              <Checkbox v-for="(item,index) in productToList" :key="index" :label="item.id">{{item.value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem  label="最高额度" required style="display:inline-block;"  :label-width="220">
          <InputNumber style="width:200px;" type="text" :min='1'  v-model="formCustom.maxAmount" placeholder="最大额度"></InputNumber>
        </FormItem>
          <!-- <span style="padding:5px">至</span>
        <FormItem  label="最高额度" style="display:inline-block;" :label-width="0" prop="maxAmount" >
          <InputNumber style="width:200px;" type="text" :min='1'  v-model="formCustom.maxAmount" placeholder="最大金额"></InputNumber>
        </FormItem> -->
        <Select  style="width:100px;" v-model="formCustom.maxAmountUnit">
              <Option v-for="(item,index) in amountUnitList" :key="index" :value="item.id">{{item.value}}</Option>
        </Select>
        <FormItem label="最长期限" required style="display:inline-block;" :label-width="220">
              <InputNumber style="width:200px;" type="text" :min='1'  v-model="formCustom.maxTerm" placeholder="最长期限"></InputNumber>
        </FormItem>
          <!-- <span style="padding:5px">至</span>
        <FormItem  label="最长期限"  style="display:inline-block;" :label-width="0"  prop="maxTerm" >
          <InputNumber style="width:200px;" type="text" :min='1'  v-model="formCustom.maxTerm" placeholder="最长期限"></InputNumber>
        </FormItem> -->
        <Select  style="width:100px;" v-model="formCustom.maxTermUnit">
            <Option v-for="(item,index) in termUnitList" :key="index" :value="item.id">{{item.value}}</Option>
        </Select>
        <!-- <FormItem prop="logoimg"  label="封面"required :label-width="220">
            <UploadImg  :cutSize="cutSize" v-model="formCustom.logoImageUrl"></UploadImg>
        </FormItem> -->
        <FormItem label="农贷通专属" :label-width="220">
            <i-switch v-model="formCustom.onlyNdt"></i-switch>
        </FormItem>
        <FormItem label="产品详情" prop="remark" :label-width="220">
          <UE ref="ue" v-model="formCustom.remark"></UE>
        </FormItem>
        <FormItem label="" :label-width="220">
          <Button type="info" size="large" long @click="modalSubmit">确认提交</Button>
          <Button style="margin-top:20px;" type="default" size="large" long @click="modalCancle">取消</Button>
        </FormItem>
      </Form>
        <Modal v-model="sensitiveWordsModel"
            title="敏感词拦截"
            :mask-closable="true"
            :styles="{top: '50px'}"
            :transfer ='false'
            width="600">
            <h3>你的提交内容含有以下敏感词!请修改内容后重新提交。</h3>
            <div v-for="(item,index) in sensitiveWords" :key="index">
                <label style="line-height:24px;">{{item.type}}：</label>
                <p>
                    <span style="margin-left:10px;" :key="index" v-for="(word,index) in item.sensitiveWords">{{word}}</span>
                </p>
            </div>
        </Modal>
  </div>
</template>

<script>
  import UE from '../common/Editor';
  import organizationServer from 'rs/organizationServer';
  import otherServer from 'rs/otherServer';
  import productServer from 'rs/productServer';
  export default {
    components:{UE},
    name: 'Product',
    data () {
      const validAmountChange = (rule, value, callback)=>{
          if(this.formCustom.mixAmount>=this.formCustom.maxAmount){
             callback(new Error(''));
          }
          else{
            callback();
          }
      }
      const validTermChange = (rule, value, callback)=>{
          if(this.formCustom.mixTerm>=this.formCustom.maxTerm){
            callback(new Error(""));
          }
          else{
            callback();
          }
      }
      const validProductTypeChange = (rule, value, callback)=>{
          if(this.formCustom.productType == 0){
            callback(new Error(""));
          }
          else{
            callback();
          }
      }
      const validproductToChange = (rule, value, callback)=>{
          if(this.formCustom.productTo.length == 0){
            callback(new Error(""));
          }
          else{
            callback();
          }
      }
      const validloanTypesChange = (rule, value, callback)=>{
          if(this.formCustom.loanTypes.length == 0){
            callback(new Error(""));
          }
          else{
            callback();
          }
      }
      const validDivisions= (rule, value, callback)=>{
          if(this.formCustom.divisions.length == 0){
            callback(new Error(""));
          }
          else{
            let flag = true;
            for(let o of this.formCustom.divisions){
              if(o){
                flag = false;
              }
            }
            if(flag){
                callback(new Error(""));
            }
            else{
                callback();
            }
          }
      }
      const labelsValidator = (rule, value, callback)=>{
        if(this.formCustom.labels.length > 3){
            callback(new Error(""));
        }else{
          callback();
        }
      }
      return {
        sensitiveWordsModel:false,
        sensitiveWords:[],
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
            "name": "",
            "logoImageUrl": "",
            "productType":"",
            "productCode": "",
            "mixAmount": 1,
            "maxAmount": 1,
            "mixTerm": 1,
            "maxTerm": 1,
            "productTo": [],
            "loanTypes": [],
            "labels": [],
            "supportPolicy": "",
            "remark": "",
            "divisions": [],
            "onlyNdt":false,
        },
        ruleCustom: {
          name:[
            { required: true, max: 50, message: '填写产品名称且不能超过50个字', trigger: 'blur,change'}
          ],
          divisions:[
            { validator: validDivisions,  message: '请选择产品覆盖区域', trigger: 'blur,change'}
          ],
          labels:[
            { validator:labelsValidator,  message: '产品标签不能超多三个', trigger: 'change'}
          ],
          productCode:[
            { required: true,max: 50, message: '填写产品编号且不能超过50个字', trigger: 'blur,change'}
          ],
          productType:[
            {validator: validProductTypeChange, message: '选择产品类型', trigger: 'blur,change'}
          ],
          // maxAmount:[
          //   {validator: validAmountChange, message: '最大金额必须大于最小金额', trigger: 'blur,change'}
          // ],
          maxTerm:[
            {validator: validTermChange, message: '最大期限必须大于最小期限', trigger: 'blur,change'}
          ],
          loanTypes:[
            {validator: validloanTypesChange, message: '请选择贷款类型', trigger: 'blur,change'}
          ],
          productTo:[
            {validator: validproductToChange, message: '请选择贷款对象', trigger: 'blur,change'}
          ],
          remark:[
            { required: true, message: '产品详情不能为空', trigger: 'blur,change'}
          ]
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
      this.$refs.ue.setUEContent(obj.data.remark);
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
        this.formCustom.productTo = this.formCustom.productTo||[];
        this.formCustom.loanTypes = this.formCustom.loanTypes||[];
        this.formCustom.labels = this.formCustom.labels||[];
        this.formCustom.divisions = this.formCustom.divisions||[];
        this.initCitys = this.formCustom.divisions;
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
         this.$router.push("../product")
      },
      modalSubmit () {//确定提交按钮回调
        let that = this;
        this.formCustom.remark= this.$refs.ue.getUEContent();
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
                      that.$router.push("../product")
                  }
                  else if(response.errorCode == 2100){
                      that.sensitiveWords = response.data;
                      that.sensitiveWordsModel = true;
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
                      that.$router.push("../product")
                  }
                  else if(response.errorCode == 2100){
                      that.sensitiveWords = response.data;
                      that.sensitiveWordsModel = true;
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
