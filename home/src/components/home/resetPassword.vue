<template>
  <div class="reset_psd"  :style="{height:Math.max($store.state.screenHeight - 70,610)+'px'}">
    <div class="main">
      <p class="title">找回密码</p>
      <v-steps :data="steps" :current="current" :number="4"></v-steps>
      <template v-if="current === 0">
        <div class="step_main_1">
          <input type="text" v-model="registerForm.loginName" placeholder="请输入手机号" :class="{notEmpty:registerForm.loginName.length}" @blur="checkMobile" @keypress="function(evt){if(/[^\d]/g.test(evt.key)||evt.target.value.length===11)evt.preventDefault();}">
          <div class="code_input_wrapper">
            <input type="text" v-model="registerForm.verificationCode" placeholder="短信验证码" :class="{notEmpty:registerForm.verificationCode}" @blur="checkCode" @keypress="function(evt){if(/[^\d]/g.test(evt.key)||evt.target.value.length===6)evt.preventDefault();}">
            <span @click="getCode" v-text='getCoded?"重新获取（"+countDown+"s)":"获取验证码"' :class="{getCoded:getCoded}"></span>
          </div>
          <!--<input type="password" v-model="password" :class="{notEmpty:password.length}" @blur="checkPassword"  placeholder="密码由6-16位数字、字母或符号组成">-->
        </div>
      </template>
      <template v-if="current === 1">
        <div class="step_main_2">
          <span>新密码</span>
          <input type="password" v-model="password" :class="{notEmpty:password.length}" @blur="checkPassword(1)"  placeholder="密码由6-16位数字、字母或符号组成" autocomplete="off">
          <psd-intension-verify style="width: 290px;margin-top: 4px;padding-left: 90px" :value="password" class="psd-intension-verify"/>
          <span>确认新密码</span>
          <input type="password" v-model="passwordCheck" :class="{notEmpty:passwordCheck.length}" @blur="checkPassword(0)"  placeholder="密码由6-16位数字、字母或符号组成" autocomplete="off">
        </div>
      </template>
      <template v-if="current === 2">
        <div class="register_success_wrapper">
          <div class="success_circle" :class="{acitve:success}">
            <img :src="successImg" alt="">
          </div>
          <p>恭喜您密码重置成功！</p>
        </div>
      </template>
      <p class="error_msg" v-text="registerErrorMsg"></p>
      <button @click="next(current)" v-text="currentText"></button>
    </div>
  </div>
</template>

<script>
  import img2 from '../../assets/images/steps/2.png'
  import lock from '../../assets/images/steps/lock.png'
  import lock_1 from '../../assets/images/steps/lock_1.png'
  import img5 from '../../assets/images/steps/5.png'
  import img5_1 from '../../assets/images/steps/5_1.png'
  import indexServer from "rs/index"
  import {Base64} from "js-base64"
  import success from "../../assets/images/success.png"
export default {
	data() {
	    return {
        currentText:"下一步",
        successImg:success,
        success:false,
        registerErrorMsg:"",
        getCoded:false,
        current:0,
        countDown:120,
        password:"",
        passwordCheck:"",
        registerForm:{
          loginName:"",
          newPassword:"",
          verificationCode:"",
        },
        steps:[
          {
            src:img2,
            default:img2,
            text:"1.输入手机号"
          },
          {
            src:lock,
            default:lock_1,
            text:"2.设置新密码"
          },
          {
            src:img5,
            default:img5_1,
            text:"3.完成"
          },
        ],
	    }
	},
	beforeCreate() {

	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {
    checkCode(){
      let str = this.registerForm.verificationCode;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写验证码";
      else return true;
    },
    checkPassword(num){
      let str = this.password,checkStr = this.passwordCheck;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写密码";
      else if(!/^\S{6,16}$/.test(str))this.registerErrorMsg = "密码由6-16位数字、字母或符号组成";
      else if((str!==checkStr)&&(checkStr ||!num))this.registerErrorMsg = "两次输入的密码不一致";
      else return true;
    },
    checkMobile(){
      let str = this.registerForm.loginName;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写手机号码";
      else if(!(/^1(3|4|5|7|8)[0-9]{9}$/.test(str)))this.registerErrorMsg = "手机号格式不正确";
      else return true;
    },
    getCode(){
      if(!this.checkMobile()||this.getCoded)return;
      indexServer.getCode({params:{mobile:this.registerForm.loginName}},({data})=>{
        this.getCoded = true;
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
    next(num){
      switch (num){
        case 0:
          if(this.checkMobile()&&this.checkCode())this.current = num + 1;break;
        case 1:
          if(this.checkPassword(1)&&this.checkPassword(0))this.findPsd();break;
        case 2:
          this.$router.push({name:'loginAndRegister',query:{type:1}});break;
      }
    },
    findPsd(){
      let form = this.registerForm;
      form.newPassword = Base64.encode(this.password);
      indexServer.resetPasswd({data:form},({errorCode})=>{
        switch (errorCode){
          case 1002:
            this.registerErrorMsg = "验证码错误";
            this.current = 0 ;
            break;
          case 0 :
            this.current = 2 ;
            this.currentText = "立即登录";
            setTimeout(()=>{this.success = true});
            break;
          default:
            this.registerErrorMsg = "找回密码失败,请重试";
            this.current = 0 ;
            break;
        }
      });
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.reset_psd{
  background: url("../../assets/images/login_bg.jpg") no-repeat 0 -90px fixed;
  position: relative;
  button{
    height: 60px;
    font-size: 20px;
    color:@base-text-hover-color;
    border:1px solid @base-text-hover-color;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    transition: all 300ms ease-out;
    &:hover{
      color:@white;
      background-color:@base-text-hover-color;
    }
    position: absolute;
    bottom:72px;
    left: 50%;
    width: 300px;
    margin-left:-150px;
  }
  input{
    background-color: transparent;
    height: 53px;
    width: 300px;
    padding-top: 22px;
    padding-bottom: 6px;
    border:none;
    border-bottom: 1px solid @text_color_3;
    outline: none;
    font-size: 14px;
    &.half{
      width:250px;
      padding-top: 18px;
      height: 43px;
    }
    &:focus,&.notEmpty{
      border-bottom: 1px solid @base-text-hover-color;
      //color:@base-text-hover-color
    }
  }
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
      top:26px;
      cursor: pointer;
      &.getCoded{
        color: #999;
        cursor: not-allowed;
        opacity: 0.8;
      }
    }
  }
  .error_msg{
    text-align: center;
    color:@base-text-hover-color;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    position: absolute;
    bottom:152px;
    width: 100%;
  }
  .main{
    background-color: #fff0e4;
    width: 860px;
    height:600px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left:-430px;
    margin-top:-300px;
    padding-top: 50px;
    text-align: center;
    p.title{
      font-size: 24px;
      color: @base-text-hover-color;
      line-height: 24px;
      margin-bottom: 30px;
    }
    .step_main_1{
      width:300px;
      margin:50px auto 0;
    }
    .step_main_2{
      width: 580px;
      margin-top: 50px;
      padding-left: 190px;
      span{
        float: left;
        color: #000;
        font-size: 12px;
        height: 52px;
        line-height: 24px;
        vertical-align: middle;
        width: 90px;
        padding:22px 28px 6px 0;
      }
    }
    .register_success_wrapper{
      .success_circle{
        width: 100px;
        height: 100px;
        margin: 59px auto 0;
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
        font-size: 14px;color: #ff762b;line-height: 14px;margin-top: 20px;margin-bottom: 66px;
      }
    }
  }
}
</style>
