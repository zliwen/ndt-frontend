<template>
  <div  :style="{height:Math.max($store.state.screenHeight - 70,810)+'px'}" class="companyRegister_wrapper">
    <div class="companyRegister">
      <div class="companyRegister_main">
        <p class="title">企业账户注册</p>
        <v-steps :data="steps" :current="current"></v-steps>
        <template v-if="current===0">
          <div class="first">
            <div class="choose_paper_type_wrapper">
              <p class="choose_paper_type">请选择证件类型</p>
              <RadioGroup v-model="form.companyInfo.paperType">
                <Radio :label="1501">&nbsp;&nbsp;普通营业执照（存在独立的组织机构代码证）</Radio>
                <Radio :label="1502">&nbsp;&nbsp;多证合一营业执照（不存在独立的组织机构代码证）</Radio>
              </RadioGroup>
            </div>
            <button @click="current=1" style="width: 300px">下一步</button>
          </div>
        </template>
        <template v-if="current===1">
          <div class="second">
            <input type="text" v-model.trim="form.registerInfo.mobile" placeholder="请输入手机号" :class="{notEmpty:form.registerInfo.mobile}" @blur="checkMobile">
            <div class="code_input_wrapper">
              <input type="text" v-model.trim="form.registerInfo.verificationCode" placeholder="短信验证码" :class="{notEmpty:form.registerInfo.verificationCode}" @blur="checkCode" >
              <span @click="getCode" v-text='getCoded?"重新获取（"+countDown+"s)":"获取验证码"' :class="{getCoded:getCoded}"></span>
            </div>
            <input type="password" v-model.trim="password" :class="{notEmpty:password}" @blur="checkPassword"  placeholder="密码由6-16位数字、字母或符号组成">
            <psd-intension-verify style="width: 200px;margin-top: 4px" :value="password" class="psd-intension-verify"/>
            <p class="error_msg" v-text="registerErrorMsg"></p>
          </div>
          <p style="padding-right: 120px">
            <span class="btn" @click="current=0">返回上一步</span>
            <button style="width: 300px" @click="toThird">下一步</button>
          </p>
        </template>
        <template v-if="current===2">
          <div class="third clearfix">
            <p class="base_msg_title">企业基础信息</p>
            <div class="input_wrapper">
              <span>企业名称</span>
              <input type="text" v-model.trim="form.companyInfo.name" @blur="checkName" :class="{notEmpty:form.companyInfo.name.length}">
            </div>
            <div class="input_wrapper">
              <span v-text="form.companyInfo.paperType===1501?'工商注册号':'社会统一信用代码'"></span>
              <input type="text" v-model.trim="form.companyInfo.code"  @blur="checkInfoCode" :class="{notEmpty:form.companyInfo.code.length}">
            </div>
            <div class="input_wrapper clearfix">
              <span class="long">选择企业所在区域</span>
              <Select v-model="select.cityModel" placeholder="选择城市" @on-change="getDivisionChildren(select.cityModel,'county')" :disabled="!select.city.length" :class="{selected:select.cityModel}">
                <Option v-for="item in select.city" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="select.countyModel" placeholder="选择区/县" :disabled="!select.county.length" @on-change="getDivisionChildren(select.countyModel,'town')" :class="{selected:select.countyModel}">
                <Option v-for="item in select.county.slice(1)" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="select.townModel" placeholder="选择镇" :disabled="!select.town.length" @on-change="getDivisionChildren(select.townModel,'village')" :class="{selected:select.townModel}">
                <Option v-for="item in select.town" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
              <Select v-model="select.villageModel" placeholder="选择村" :disabled="!select.village.length" :class="{selected:select.villageModel}">
                <Option v-for="item in select.village" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="input_wrapper half">
              <span>法定代表人</span>
              <input type="text" v-model.trim="form.companyInfo.corporation"  @blur="checkLegalPersonName('corporation','法人')" :class="{notEmpty:form.companyInfo.corporation.length}">
            </div>
            <div class="input_wrapper half last">
              <span>法定代表人身份证号</span>
              <input type="text" v-model.trim="form.companyInfo.corporationIdentity"  @blur="checkLegalPersonId('corporationIdentity','法人')" :class="{notEmpty:form.companyInfo.corporationIdentity.length}">
            </div>
            <div class="input_wrapper half">
              <span>联系人姓名</span>
              <input type="text" v-model.trim="form.companyInfo.contactName"  @blur="checkLegalPersonName('contactName','联系人')" :class="{notEmpty:form.companyInfo.contactName.length}">
            </div>
            <div class="input_wrapper half last">
              <span>联系人身份证号</span>
              <input type="text" v-model.trim="form.companyInfo.contactIdentityId"  @blur="checkLegalPersonId('contactIdentityId','联系人')" :class="{notEmpty:form.companyInfo.contactIdentityId.length}">
            </div>
          </div>
          <p class="error_msg" v-text="registerErrorMsg"></p>
          <p style="padding-right: 120px">
            <span class="btn" @click="current=1">返回上一步</span>
            <button style="width: 300px" @click="toFourthly">下一步</button>
          </p>
        </template>
        <template v-if="current===3">
          <div class="fourthly">
            <Upload
              type="drag"
              class="update_1"
              :before-upload="function(file){return checkFile(file,1)}"
              :on-success="function(res,file,fileList){return upload(res,file,fileList,1)}"
              :on-remove="function(file,fileList){return remove(file,fileList,1)}"
              :default-file-list="defaultFileList[0]"
              ref="upload1"
              :action="baseURL+'/v1/file/upload'">
              <div v-show="!imgSrc[0]">
                <Icon type="ios-plus-outline" size="62"></Icon>
                <p>上传企业营业执照</p>
              </div>
              <img :src="imgSrc[0]" alt="" ref="img1" v-show="imgSrc[0]">
            </Upload>
            <Upload
              type="drag"
              class="update_2"
              :before-upload="function(file){return checkFile(file,2)}"
              :on-success="function(res,file,fileList){return upload(res,file,fileList,2)}"
              :on-remove="function(file,fileList){return remove(file,fileList,2)}"
              :default-file-list="defaultFileList[1]"
              ref="upload2"
              :action="baseURL+'/v1/file/upload'">
              <div v-show="!imgSrc[1]">
                <Icon type="ios-plus-outline" size="62"></Icon>
                <p>上传法定代表人身份证正面</p>
              </div>
              <img :src="imgSrc[1]" alt="" ref="img2" v-show="imgSrc[1]">
            </Upload>
            <Upload
              type="drag"
              class="update_3"
              :before-upload="function(file){return checkFile(file,3)}"
              :on-success="function(res,file,fileList){return upload(res,file,fileList,3)}"
              :on-remove="function(file,fileList){return remove(file,fileList,3)}"
              :default-file-list="defaultFileList[2]"
              ref="upload3"
              :action="baseURL+'/v1/file/upload'">
              <div v-show="!imgSrc[2]">
                <Icon type="ios-plus-outline" size="62"></Icon>
                <p>上传法定代表人身份证反面</p>
              </div>
              <img :src="imgSrc[2]" alt="" ref="img3" v-show="imgSrc[2]">
            </Upload>
          </div>
          <p class="error_msg" v-text="registerErrorMsg"></p>
          <p style="padding-right: 120px">
            <span class="btn" @click="current = 2">返回上一步</span>
            <button style="width: 300px" @click="register">下一步</button>
          </p>
        </template>
        <template v-if="current===4">
          <div class="fifth">
            <div class="success_circle" :class="{acitve:success}">
              <img src="../../assets/images/success.png" alt="">
            </div>
            <p style="margin-top:20px;margin-bottom: 10px">恭喜您注册申请已提交成功！</p>
            <p style="color: #999;">平台会在3个工作日内审核您的申请，请耐心等待</p>
            <router-link tag="button" :to="{name:'loginAndRegister',query:{type:1}}" style="width: 300px">进入农贷通</router-link>
          </div>
        </template>
        <p class="to_login" v-else>已有账号&nbsp;&nbsp;立即<router-link :to="{name:'loginAndRegister',query:{type:1}}" tag="span">登录</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Base64} from "js-base64"
  import indexServer from "rs/index"
  import company_register_1 from "../../assets/images/company_register_1.jpg"
  import company_register_2 from "../../assets/images/company_register_2.jpg"
  import company_register_3 from "../../assets/images/company_register_3.jpg"
  import company_register_4 from "../../assets/images/company_register_4.jpg"
  import company_register_5 from "../../assets/images/company_register_5.jpg"
  import img1 from '../../assets/images/steps/1.png'
  import img2 from '../../assets/images/steps/2.png'
  import img3 from '../../assets/images/steps/3.png'
  import img4 from '../../assets/images/steps/4.png'
  import img5 from '../../assets/images/steps/5.png'
  import img2_1 from '../../assets/images/steps/2_1.png'
  import img3_1 from '../../assets/images/steps/3_1.png'
  import img4_1 from '../../assets/images/steps/4_1.png'
  import img5_1 from '../../assets/images/steps/5_1.png'
  import {baseURL} from "@/config/constant"
  export default {
    data() {
      return {
        baseURL:baseURL,
        imgSrc:[],//已上传的图片src
        defaultFileList:[[],[],[]],//已上传的文件列表
        countDown:0,
        getCoded:false,
        img:[company_register_1,company_register_2,company_register_3,company_register_4,company_register_5],
        rightVerificationCode:undefined,
        registerErrorMsg:"",
        success:false,
        photos:[],
        password:"",
        form:{
          registerInfo:{
            mobile:"",
            password:"",
            verificationCode:"",
            adminDivisionId:undefined,
          },
          companyInfo:{
            paperType:1501,
            name:"",
            code:"",
            corporationIdentity:"",
            corporation:"",
            photos:"",
            contactIdentityId:"",
            contactName:""
          }
        },
        select:{
          city:[],
          cityModel:undefined,
          county:[],
          countyModel:undefined,
          town:[],
          townModel:undefined,
          village:[],
          villageModel:undefined,
        },
        steps:[
          {
            src:img1,
            default:img1,
            text:"1.选择证件类型"
          },
          {
            src:img2,
            default:img2_1,
            text:"2.输入手机号"
          },
          {
            src:img3,
            default:img3_1,
            text:"3.填写企业信息"
          },
          {
            src:img4,
            default:img4_1,
            text:"4.上传企业证件"
          },
          {
            src:img5,
            default:img5_1,
            text:"5.提交注册申请"
          },
        ],
        current:0
      }
    },
    created() {
      this.getDivisionChildren(51,"city");
    },
    beforeDestroy(){
      clearInterval(this.intervalId);
    },
    directives: {

    },
    computed: {
    },
    filters: {
    },
    methods: {
      toThird(){
        let flag = this.checkMobile()&&this.checkCode()&&this.checkPassword();
        if(flag){
          this.current = 2;
        }
      },
      toFourthly(){
        let select = this.select;
        let flag = this.checkName()&&this.checkInfoCode()&&this.checkLegalPersonName('corporation','法人')&&this.checkLegalPersonId('corporationIdentity','法人')&&this.checkLegalPersonName('contactName','联系人')&&this.checkLegalPersonId('contactIdentityId','联系人');
        if(flag){
          if(!select.villageModel){
            this.registerErrorMsg = "请选择您所在的地区";return
          }
          this.form.registerInfo.adminDivisionId = select.villageModel;
          this.form.registerInfo.address = select.village.find(l=>l.id === select.villageModel).fullName;
          this.form.companyInfo.address = select.village.find(l=>l.id === select.villageModel).fullName;
          this.current = 3;
        }
      },
      getDivisionChildren(id,attr){
        let _this = this.select;
        switch (attr){
          case "county":
            _this.countyModel = _this.townModel = _this.villageModel = undefined;
            _this.town = [];_this.village = [];
            break;
          case "town":
            _this.townModel = _this.villageModel = undefined;
            _this.village = [];
            break;
        }
        if(!id)return;
        indexServer.getDivisionChildren({params:{params3:id}},({data})=>{
          _this[attr] = data;
        });
      },
      checkCode(){
        let str = this.form.registerInfo.verificationCode;
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写验证码";
        else return true;
      },
      checkPassword(){
        let str = this.password;
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写密码";
        else if(!/^\S{6,16}$/.test(str))this.registerErrorMsg = "密码由6-16位数字、字母或符号组成";
        else return true;
      },
      checkMobile(){
        let str = this.form.registerInfo.mobile;
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写手机号码";
        else if(!(/^1(3|4|5|7|8)[0-9]{9}$/.test(str)))this.registerErrorMsg = "手机号格式不正确";
        else return true;
      },
      checkName(){
        let str = this.form.companyInfo.name;
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写企业名称";
        else return true
      },
      checkInfoCode(){
        let form = this.form.companyInfo;
        let str = form.code;
        let flag = form.paperType === 1501;
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = flag?"请填写工商注册号":"请填写社会统一信用代码";
        else return true
      },
      checkLegalPersonName(string,type){
        let form = this.form.companyInfo;
        let str = form[string];
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写"+type+"姓名";
//        else if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(str)))this.registerErrorMsg = "姓名填写有误";
        else return true;
      },
      checkLegalPersonId(string,type){
        let form = this.form.companyInfo;
        let str = form[string];
        this.registerErrorMsg = "";
        if(!str)this.registerErrorMsg = "请填写"+type+"身份证号码";
        else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)))this.registerErrorMsg = "身份证填写有误";
        else return true;
      },
      getCode(){
        //if(this.alreadyGetCode){this.registerErrorMsg = "验证码已发送，请注意查收";return}
        //this.alreadyGetCode = true;
        if(!this.checkMobile()||this.getCoded)return;
        indexServer.getCode({params:{mobile:this.form.registerInfo.mobile}},({data,errorCode})=>{
          if(errorCode==11005){
            this.registerErrorMsg = "手机号已存在！";return
          }
          this.getCoded = true;
          this.rightVerificationCode = data.verifyCode;
          this.countDown = 120;
          this.intervalId = setInterval(()=>{
            this.countDown--;
            if(this.countDown===0){
              clearInterval(this.intervalId);
              this.countDown = 120;
              this.getCoded = false;
            }
          },1000);
        });
      },
      //上传
      checkFile(file,num){
        if(!(/(.jpg|.gif|.png|.jpeg)$/.test(file.name.toLowerCase()))){
          this.registerErrorMsg = "图片上传支持jpg/jpeg/png/gif四种格式";return false
        }
        if(file.size/1024/1024>4){
          this.registerErrorMsg = "图片大小不能超过4M";return false
        }
        let upload = this.$refs["upload"+num].clearFiles();
        this.registerErrorMsg = "";
        let reader = new FileReader();
        reader.onload = e=>{
          let result = e.target.result;
          this.imgSrc.splice(num-1,1,result);
        };
        reader.readAsDataURL(file);
      },
      upload(res,file,fileList,num){
        this.photos[num-1] = res.data[0].fileId;
        this.defaultFileList.splice(num-1,1,fileList)
      },
      remove(file,fileList,num){
        this.photos[num-1] = undefined;
        this.imgSrc.splice(num-1,1,undefined);
        this.defaultFileList.splice(num-1,1,fileList)
      },
      register(){
        let form = this.form;
        let photos = this.photos;
        if(!photos[0]){
          this.registerErrorMsg = "请上传企业营业执照";return
        }
        if(!photos[1]){
          this.registerErrorMsg = "请上传法定代表人身份证正面";return
        }
        if(!photos[2]){
          this.registerErrorMsg = "请上传法定代表人身份证反面";return
        }
        form.companyInfo.photos = JSON.stringify(photos);
        form.registerInfo.password = Base64.encode(this.password);
        form.registerInfo.sourceId = 7001;
        indexServer.companyRegister({data:form},({errorCode})=>{
          if(!errorCode){
            this.current = 4;
            setTimeout(()=>{this.success = true});
            return
          }
          switch (errorCode){
            case 1001:
            case 11005:
              this.$Message.error("该手机号已被注册！");
              this.registerErrorMsg = "该手机号已被注册！";
              break;
            case 1002:
              this.$Message.error("验证码输入错误！");
              this.registerErrorMsg = "验证码输入错误";
              break;
            case 1004:
              this.$Message.error("同一IP请求次数过多！");
              this.registerErrorMsg = "同一IP请求次数过多";
              break;
            case 1005:
              this.$Message.error("同一号码请求次数过多！");
              this.registerErrorMsg = "同一号码请求次数过多";
              break;
          }
          this.current = 1;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .companyRegister_wrapper{
    height: 100%;
    /*min-height: 800px;*/
    background: url("../../assets/images/login_bg.jpg") no-repeat 0 -90px fixed;
    button{
      position: absolute;
      left: 50%;
      margin-left:-150px;
      bottom:74px;
      height: 60px;
      font-size: 20px;
      color:@base-text-hover-color;
      border:1px solid @base-text-hover-color;
      border-radius: 6px;
      background-color: transparent;
      width: 100%;
      cursor: pointer;
      transition: all 300ms ease-out;
      outline: none;
      &:hover{
        color:@white;
        background-color:@base-text-hover-color;
      }
    }
    input{
      background-color: transparent;
      height: 53px;
      width: 100%;
      padding-top: 28px;
      padding-bottom: 6px;
      border:none;
      border-bottom: 1px solid @text_color_3;
      outline: none;
      font-size: 14px;
      &.half{
        width:282px;
        height: 43px;
        padding-top: 18px;
      }
      &:focus,&.notEmpty{
        border-bottom: 1px solid @base-text-hover-color;
        //color:@base-text-hover-color
      }
    }
    span.btn{
      position: absolute;
      bottom:97px;
      left: 197px;
      font-size: 14px;
      color: #999;
      display: inline-block;
      line-height: 14px;
      vertical-align: middle;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
    .error_msg{
      position: absolute;
      bottom:152px;
      left: 50%;
      margin-left:-150px;
      width: 300px;
      color:@base-text-hover-color;
      font-size: 12px;
      height: 12px;
      line-height: 12px;
    }
    .input_wrapper{
      text-align: left;
      &.half{
        width: 300px;
        display: inline-block;
        float: left;
        &.last{
          float: right;
        }
      }
      input{
        width: 100%;
        height: 30px;
        padding: 0;
        margin: 0;
      }
      >span{
        &.long{
          width: 100%;
        }
        display: inline-block;
        padding-top: 14px;
        padding-bottom: 10px;
        font-size: 12px;
        color: #999;
        line-height: 12px;
      }
    }
    .companyRegister{
      height: 100%;
      width: 100%;
      position: relative;
      .companyRegister_main{
        position: absolute;
        top:50%;
        left: 50%;
        margin-left: -450px;
        margin-top: -400px;
        width:900px;
        height: 800px;
        background-color: #fff0e4;
        box-shadow:0 25px 40px 5px rgba(255,118,43,0.4);
        padding-top: 50px;
        text-align: center;
        p.title{
          font-size: 24px;
          color: #ff762b;
          line-height: 24px;
          margin-bottom: 28px;
        }
        .to_login{
          position: absolute;
          width: 100%;
          bottom:30px;
          font-size: 14px;
          color:@text_color_3;
          span{
            cursor: pointer;
            color: @base-text-hover-color;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .first{
          padding-top: 118px;
          .choose_paper_type_wrapper{
            text-align: left;
            padding-left: 268px;
          }
          .choose_paper_type{
            font-size: 16px;
            color: #333;
            margin-bottom: 50px;
          }
          .ivu-radio-wrapper{
            font-size: 14px;
            display: block;
            color: #999;
            margin-bottom:200px;
            &:nth-of-type(1){
              margin-bottom:20px;
            }
            .ivu-radio-inner{
              width: 18px;
              height: 18px;
            }
            .ivu-radio-checked .ivu-radio-inner::after,.ivu-radio-inner::after{
              width: 14px;
              height: 14px;
              top:1px;
              left:1px;
              border-radius: 9px;
              background-color:@base-text-hover-color;
            }
            .ivu-radio-checked .ivu-radio-inner{
              border-color: @base-text-hover-color;
            }
            &.ivu-radio-wrapper-checked{
              color: #333;
            }
          }
        }
        .second{
          width: 300px;
          margin:110px auto 0;
          .code_input_wrapper{
            position: relative;
            input{
              padding-right: 120px;
            }
            span{
              color:@base-text-hover-color;
              font-size: 14px;
              position: absolute;
              right:0;
              top:28px;
              cursor: pointer;
              &.getCoded{
                color: #999;
                cursor: not-allowed;
                opacity: 0.8;
              }
            }
          }
        }
        .third{
          width: 700px;
          margin: 0 auto;
          .base_msg_title{
            text-align: left;
            padding-top: 44px;
            padding-bottom: 10px;
            font-size:16px;
            line-height: 16px;
            color: #000;
          }
        }
        .fourthly{
          width: 550px;
          height:340px;
          margin: 50px auto 0;
        }
        .fifth{
          .success_circle{
            width: 100px;
            height: 100px;
            margin: 150px auto 0;
            border-radius: 50%;
            background-color:#27c47d;
            position: relative;
            transition: all 300ms ease-out;
            transform: scale(0);
            opacity: 0;
            img{
              position: absolute;
              vertical-align: middle;
              right:0;
              top:10px;
            }
            &.acitve{
              transform: scale(1);
              opacity: 1;
            }
          }
          p{
            font-size: 14px;color: #ff762b;line-height: 14px;
          }
        }
      }
    }
    .ivu-upload{
      padding:10px;
      background-color: #fff;
      .ivu-upload-drag{
        border-color: #999;
        height: 100%;
        position: relative;
        p{
          padding-top: 14px;
        }
        &:hover{
          i{
            color:@base-text-hover-color;
          }
        }
        >div{
          font-size: 14px;
          color: #999;
          position: absolute;
          left: 0;
          top:50%;
          width: 100%;
          margin-top: -55px;
        }
        img{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .update_1{
      width: 246px;
      height: 100%;
      float: left;
    }
    .update_2,.update_3{
      width: 250px;
      height: 157px;
      float: right;
      .ivu-upload-drag >div{
        margin-top: -45px;
      }
    }
    .update_2{
      margin-bottom:26px;
    }
    .ivu-select{
      float: left;
      width: 150px;
      margin-right: 33px;
      &.selected .ivu-select-selection{
        border-bottom:1px solid @base-text-hover-color;
      }
      &:nth-last-of-type(1){
        margin-right: 0;
      }
      .ivu-select-selection{
        background-color: transparent;
        border-radius: 0;
        border:none;
        border-bottom:1px solid #999;
        box-shadow: none;
        .ivu-select-placeholder,.ivu-select-selected-value{
          font-size: 14px;
          padding-left: 2px;
        }
        .ivu-select-placeholder{
          color: #999;
        }
      }
      .ivu-select-item-selected{
        background-color:@background-color-base;
      }
    }

  }
</style>
