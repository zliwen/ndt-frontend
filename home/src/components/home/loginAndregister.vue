<template>
   <div class="login-and-register-container" :style="{height:Math.max($store.state.screenHeight - 70,610)+'px'}">
     <div class="login-and-register-wrapper">
       <div class="login-and-register swiper-container">
         <div class="swiper-wrapper">
           <div class="register swiper-slide">
             <div class="right">
               <div class="circle" @click="swiperNext" style="cursor: pointer;">
                 <Icon type="ios-arrow-left" size="54"></Icon>
               </div>
             </div>
             <div class="main">
               <div class="choose_wrapper" v-if="register.choose">
                 <p class="choose_title">请选择您注册的身份</p>
                 <p class="choose_sub_title">请谨慎选择，身份确定后将不可更换</p>
                 <div class="choose_box clearfix">
                   <div class="person_wrapper">
                     <div class="person_icon_wrapper" @click="register.first = true;register.choose = false">
                       <img :src="person" alt="">
                       <svg>
                         <polyline points="116.62 51.48 63.2 88.63 0 25.43 65.13 0"/>
                         <!--<path class="cls-1" d="M0,31.78,47.83,79.61a75,75,0,0,0,65.81-47.39L81.42,0Z"/>-->
                       </svg>
                     </div>
                     <p class="icon_title">我是个人</p>
                     <p class="icon_remark">*&nbsp;个体工商户请选择个人</p>
                   </div>
                   <div class="company_wrapper">
                     <router-link class="company_icon_wrapper" tag="div" :to="{name:'company-register'}">
                       <img :src="floor" alt="">
                       <svg>
                         <polyline points="104.48 65.28 50.63 112.23 0 61.6 39.2 0"/>
                         <!--<path d="M94.83,45.83,49,0,0,77,17.38,94.38c2.34.22,4.72.34,7.12.34A75,75,0,0,0,94.83,45.83Z"/>-->
                       </svg>
                     </router-link>
                     <p class="icon_title">我是企业</p>
                   </div>
                 </div>
                 <p class="to_login">已有账号&nbsp;&nbsp;立即<span @click="swiperNext">登录</span></p>
               </div>
               <div class="first_wrapper" v-else>
                 <p class="title">账户注册</p>
                 <v-steps :data="steps" :current="current" :number="4"></v-steps>
                 <template v-if="current === 0">
                   <div class="step_main">
                     <input type="text" v-model.trim="registerForm.mobile" placeholder="请输入手机号" :class="{notEmpty:registerForm.mobile.length}" @blur="checkMobile">
                     <div class="code_input_wrapper">
                       <input type="text" v-model.trim="registerForm.verificationCode" placeholder="短信验证码" :class="{notEmpty:registerForm.verificationCode}" @blur="checkCode" >
                       <span @click="getCode" v-text='getCoded?"重新获取（"+countDown+"s)":"获取验证码"' :class="{getCoded:getCoded}"></span>
                     </div>
                     <input type="password" v-model.trim="password" :class="{notEmpty:password.length}" @blur="checkPassword"  placeholder="密码由6-16位数字、字母或符号组成">
                     <psd-intension-verify style="width: 200px;margin-top: 4px" :value="password" class="psd-intension-verify"/>
                     <p class="error_msg" v-text="registerErrorMsg"></p>
                     <button @click="toSecond">下一步</button>
                   </div>
                 </template>
                 <template v-if="current === 1">
                   <p class="input_type_title clearfix">个人信息</p>
                   <p style="text-align: left">
                     <input type="text" v-model.trim="registerForm.name" placeholder="请输入真实姓名" :class="{notEmpty:registerForm.name.length}" @focus="registerErrorMsg = ''" class="half" @blur="checkName">
                     <input type="text" v-model.trim="registerForm.identityId" placeholder="请输入身份证号码" :class="{notEmpty:registerForm.identityId.length}" @focus="registerErrorMsg = ''" class="half" style="float: right" @blur="checkId">
                   </p>
                   <p class="input_type_title clearfix">选择所在地区</p>
                   <p class="clearfix" style="text-align: left;padding-top: 17px">
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
                   </p>
                   <p class="error_msg" v-text="registerErrorMsg" style="margin-top: 49px">请输入正确的身份证号码</p>
                   <button @click="toThird" style="width: 300px">下一步</button>
                 </template>
                 <template v-if="current === 2">
                   <div class="register_success_wrapper">
                     <div class="success_circle" :class="{acitve:register.success}">
                       <img :src="register.successImg" alt="">
                     </div>
                     <p>恭喜您注册成功！</p>
                     <button @click="swiperNext" style="width:300px">进入农贷通</button>
                   </div>
                 </template>
                 <p class="to_login" v-else>已有账号&nbsp;&nbsp;立即<span @click="swiperNext">登录</span></p>
               </div>
             </div>
           </div>
           <div class="login swiper-slide">
             <div class="left">
               <div class="circle" @click="swiperPrev" style="cursor:pointer;">
                 <Icon type="ios-arrow-right" size="54"></Icon>
               </div>
             </div>
             <div class="main">
               <div class="to_register_wrapper">
                 <div class="to_register">
                   <p>还没有账号？立即<span @click="swiperPrev">注册</span></p>
                   <img :src="login_illustration" alt="">
                   <br>
                   <a class="rkk" style="color: #ff762b; display: inline-block;
                    margin-top: 20px; font-size: 14px;"
                      href="/admin">
                     <Icon type="arrow-right-c"></Icon>&nbsp;
                     银行，政府，村站管理员登录入口
                   </a>
                 </div>
               </div>
               <div class="login_wrapper">
                 <p class="title">账户登录</p>
                 <input type="text" v-model.trim="form.loginName" placeholder="请输入手机号" :class="{notEmpty:form.loginName.length}" @focus="error_msg = ''" @keyup.enter="login">
                 <input type="password" v-model.trim="form.password" placeholder="请输入密码" :class="{notEmpty:form.password.length}" @focus="error_msg = ''" @keyup.enter="login">
                 <p class="forget_and_remember_psd">
                   <Checkbox v-model="rememberPsd" style="font-size: 12px">&nbsp;记住密码</Checkbox>
                   <router-link tag="span" :to="{name:'resetPassword'}" class="forget">忘记密码？</router-link>
                 </p>
                 <p class="error_msg" v-text="error_msg"></p>
                 <button @click="login">立即登录</button>
                 <p class="third_party">
                   <span>第三方平台登录</span>
                 </p>
                 <div class="third_party_wrapper">
                   <img :src="weixin" alt="" @click="wXModal = true">
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <Modal
       v-model="wXModal"
       class="weiXinModal"
       :mask-closable="false"
       title="扫描微信二维码登录">
       <div id="weixin_container" style="text-align: center"></div>
       <div slot="footer"></div>
     </Modal>
   </div>
</template>

<script>
  import login_illustration from "../../assets/images/login_illustration.jpg"
  import person from "../../assets/images/person.png"
  import floor from "../../assets/images/floor.png"
  import weixin from "../../assets/images/weixin.png"
  import first from "../../assets/images/register_first_step.jpg"
  import second from "../../assets/images/register_second_step.jpg"
  import third from "../../assets/images/register_third_step.jpg"
  import success from "../../assets/images/success.png"
  import indexServer from "rs/index"
  import {Base64} from "js-base64"
  import Swiper from "../../config/swiper.min.js"
  import img2 from '../../assets/images/steps/2.png'
  import img3 from '../../assets/images/steps/3.png'
  import img5 from '../../assets/images/steps/5.png'
  import img3_1 from '../../assets/images/steps/3_1.png'
  import img5_1 from '../../assets/images/steps/5_1.png'
export default {
	name: 'loginAndRegister',
	data() {
    return {
      wXModal:false,
      current:0,
      steps:[
        {
          src:img2,
          default:img2,
          text:"1.输入手机号"
        },
        {
          src:img3,
          default:img3_1,
          text:"2.填写个人信息"
        },
        {
          src:img5,
          default:img5_1,
          text:"3.完成注册"
        },
      ],
      currentCity:"",
      register:{
        choose:true,
        first:false,
        second:false,
        third:false,
        firstImg:first,
        secondImg:second,
        thirdImg:third,
        successImg:success,
        success:false
      },
      person:person,
      floor:floor,
      rememberPsd:true,
      login_illustration:login_illustration,
      weixin:weixin,
      error_msg:"",//登录失败msg
      form:{
        loginName:"",
        password:""
      },
      registerErrorMsg:"",//注册失败msg
      getCoded:false,
      rightVerificationCode:undefined,
      countDown:120,//倒计时
      password:"",
      registerForm:{
        mobile:"",
        password:"",
        verificationCode:undefined,
        adminDivisionId:"",
        identityId:"",
        name:""
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
      }
    }
	},
	created() {
	  let form = this.form;
	  form.loginName = storage.get("loginName")||"";
	  form.password = storage.get("password")||"";
	  //市
    this.getDivisionChildren(51,"city");
    //区县

    //镇
    //村
//    function isPlaceholer(){
//      var input = document.createElement('input');
//      return "placeholder" in input;
//    }
//    if( isPlaceholer() ) {
//      console.log("1")
//    }else {
//      console.log( "2" );
//    }
	},
  mounted(){
    this.mySwiper = new Swiper('.login-and-register',{
      initialSlide:+this.$route.query.type,
      onlyExternal:true,
      speed:200
    });
    new WxLogin({
      id:"weixin_container",
      appid:"wxc3bae5c6d90cf96a",
      scope:"snsapi_login",
      redirect_uri:"http%3A%2F%2Fwww.ndtcd.cn%2Fv1%2Fwx%2Fcallback"
      //"http://www.ndtcd.cn/city/api/wx/callback"
      //"http://www.ndtcd.cn/v1/wx/callback"
    });
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
    checkCode(){
      let str = this.registerForm.verificationCode;
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
      let str = this.registerForm.mobile;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写手机号码";
      else if(!(/^1(3|4|5|7|8)[0-9]{9}$/.test(str)))this.registerErrorMsg = "手机号格式不正确";
      else return true;
    },
    checkName(){
      let str = this.registerForm.name;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写真实姓名";
//      else if(!(/^[\u4e00-\u9fa5]{2,4}$/.test(str)))this.registerErrorMsg = "姓名填写有误";
      else return true;
    },
    checkId(){
      let str = this.registerForm.identityId;
      this.registerErrorMsg = "";
      if(!str)this.registerErrorMsg = "请填写身份证号码";
      else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)))this.registerErrorMsg = "身份证填写有误";
      else return true;
    },
    login(){
      let form = this.form;
      if(!form.loginName){
        this.error_msg = "请填写用户名";
        return
      }
      if(!form.password){
        this.error_msg = "请填写密码";
        return
      }
      indexServer.login({data:{
        loginName:form.loginName,
        password:Base64.encode(form.password),
        loginType:1
      }},({errorCode,data})=>{
        this.error_msg = "";
        switch(errorCode){
          case 1000:
            this.error_msg = "用户名不存在";
            break;
          case 11006:
            this.error_msg = "该用户待审核";
            break;
          case 1007:
            this.error_msg = "密码输入错误";
            break;
          case 1008:
            this.error_msg = "密码输入错误，再次错误将锁定登录名";
            break;
          case 1009:
            this.error_msg = "登录账号已锁定10分钟";
            break;
          case 1006:
            this.error_msg = "登录账号被锁定";
            break;
          case 11005:
            this.error_msg = "手机号已存在";
            break;
          case 0:
            if(this.rememberPsd)storage.set('password',form.password,'7d');
            this.set(data,form);
            break;
          default:
            this.error_msg = "登录失败，请稍后再试";
            break;
        }
      })
    },
    next(){
      setTimeout(()=>{this.register.success = true},1000)
    },
    getCode(){
      //if(this.alreadyGetCode){this.registerErrorMsg = "验证码已发送，请注意查收";return}
      //this.alreadyGetCode = true;
      if(!this.checkMobile()||this.getCoded)return;
      indexServer.getCode({params:{mobile:this.registerForm.mobile,businessType:0}},({data,errorCode})=>{
        if(errorCode==11005){
          this.registerErrorMsg = "手机号已存在！";
        }else {
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
        }
      });
    },
    toSecond(){
      let flag = this.checkMobile()&&this.checkCode()&&this.checkPassword();
      if(flag){
        this.current = 1;
      }
    },
    toThird(){
      let flag = this.checkName()&&this.checkId();
      let select = this.select;
      if(flag){
        if(!select.villageModel){
          this.registerErrorMsg = "请选择您所在的地区";return
        }
        let form = this.registerForm;
        form.adminDivisionId = select.villageModel;
        form.address = select.village.find(l=>l.id === select.villageModel).fullName;
        form.password = Base64.encode(this.password);
        form.sourceId = 7001;
        indexServer.register({data:form},({data,errorCode})=>{
          if(data === "success"){
            this.current = 2;
            setTimeout(()=>{this.register.success = true;});
            let thirdId = this.$route.query.thirdId;
            if(thirdId){
              indexServer.bindWx({data:{
                loginName:form.mobile,
                password:form.password,
                thirdId:thirdId,
              }},({data,errorCode})=>{
                let error = this.$Message.error;
                switch(errorCode){
                  case 1000:
                    error("用户名不存在");
                    break;
                  case 1007:
                    error("密码输入错误");
                    break;
                  case 1008:
                    error("密码输入错误，再次错误将锁定登录名");
                    break;
                  case 1009:
                    error("登录账号已锁定10分钟");
                    break;
                  case 1006:
                    error("登录账号被锁定");
                    break;
                  case 0:
                    this.$Notice.success({
                      title: '通知',
                      desc:"绑定微信号成功！"
                    });
                    this.set(data,form);
                    break;
                  default:
                    this.error_msg = "登录失败，请稍后再试";
                    break;
                }
              });
            }
            return;
          }
          switch (errorCode){
            case 1001:
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
          this.current = 0;
        });
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
    swiperPrev(){
      this.mySwiper.swipePrev();
      this.$router.replace({name:"loginAndRegister",query:{type:0}});

    },
    swiperNext(){
      this.mySwiper.swipeNext();
      this.$router.replace({name:"loginAndRegister",query:{type:1}});
      this.register.choose = true;
      this.current = 0;
    },
    set(data,form){
      this.session.set("token",data.token,"2h").set('loginName',form.name||form.loginName,'7d');
      this.$store.commit("setToken",data.token);
      this.$store.commit("setLoginName",form.name||form.loginName);
      this.session.set("userId", data.userId);
      this.session.set("userDivisionId", (data.adminDivisionId+"").slice(0,6));
      this.session.set("orgId", data.orgId);
      this.session.set("roleIds", data.roleIds);
      this.session.set("userType", data.userType);
      this.session.set("userObj", JSON.stringify(data));
      if(this.$route.query.id){
        this.$router.go(-1);
      }else {
        this.$router.push("/");
      }
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .weiXinModal{
    .ivu-modal-footer{border-top: none}
  }
</style>
<style scoped lang='less'>
.login-and-register-container{
 background: url("../../assets/images/login_bg.jpg") no-repeat 0 -90px fixed;
  .rkk{
    &:hover{ text-decoration: underline; color: #00aca2;}
  }
  .to_login{
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
  button{
    margin-bottom: 50px;
    height: 60px;
    font-size: 20px;
    color:@base-text-hover-color;
    border:1px solid @base-text-hover-color;
    border-radius: 6px;
    background-color: transparent;
    width: 100%;
    cursor: pointer;
    transition: all 300ms ease-out;
    &:hover{
      color:@white;
      background-color:@base-text-hover-color;
    }
  }
  input{
    background-color: transparent;
    height: 53px;
    width: 100%;
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
  .login-and-register-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .login-and-register{
    .swiper-wrapper{
      height: 100%;
    }
    width: 860px;
    height: 600px;
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-430px;
    margin-top:-300px;
    box-shadow:0 25px 40px 5px rgba(255,118,43,0.4);
    overflow: hidden;
  }
  .login{
    width: 100%;
    height: 100%;
    position: relative;
    .left{
      position: absolute;
      width: 60px;
      height:100%;
      background-color:#fff0e4;
      overflow: hidden;
      .circle{
        width: 100px;
        height: 100px;
        position: absolute;
        right:-50px;
        top:50%;
        margin-top: -50px;
        background-color: @white;
        color:@base-text-hover-color;
        padding-right: 50px;
        text-align: right;
        border-radius: 50%;
        i{
          line-height: 100px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .main{
      background-color: @white;
      padding-left:60px;
      height: 100%;
      .to_register_wrapper{
        position: relative;
        width: 50%;
        float: left;
        height: 100%;
      }
      .to_register{
        width: 100%;
        position: absolute;
        top:50%;
        margin-top: -121px;
        text-align: center;
        p{
          font-size: 14px;
          color: @text_color_3;
          margin-bottom: 68px;
          line-height: 20px;
          span{
            color:@base-text-hover-color;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        img{
          width: 250px;
        }
      }
      .login_wrapper{
        float: left;
        width: 50%;
        height: 100%;
        padding: 100px 80px 0 20px;
        text-align: center;
        p.title{
          color:@base-text-hover-color;
          font-size: 24px;
          line-height:24px;
          margin-bottom: 28px;
        }
        .forget_and_remember_psd{
          padding-top: 19px;
          padding-bottom: 56px;
          color:@text_color_3;
          font-size: 12px;
          line-height: 12px;
          text-align: left;
          .forget{
            float: right;
            cursor: pointer;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .error_msg{
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          color:@base-text-hover-color;
          margin-bottom: 16px;
          height: 16px;
        }
        .third_party{
          font-size: 14px;
          color:@text_color_3;
          border-bottom: 1px solid @text_color_3;
          height: 14px;
          line-height: 14px;
          position: relative;
          margin-bottom: 15px;
          span{
            position: absolute;
            display: inline-block;
            padding: 0 15px;
            background-color: @white;
            top:8px;
            left:50%;
            margin-left: -71px;
          }
        }
        .third_party_wrapper{
          img{
            cursor: pointer;
            width: 30px;
          }
        }
      }
    }
  }
  .register{
    width: 100%;
    height: 100%;
    position: relative;
    .right{
      position: absolute;
      width: 60px;
      height:100%;
      right:0;
      top:0;
      background-color:@white;
      .circle{
        width: 100px;
        height: 100px;
        position: absolute;
        left:-50px;
        top:50%;
        margin-top: -50px;
        background-color: @white;
        color:@base-text-hover-color;
        padding-right: 50px;
        text-align: right;
        border-radius: 50%;
        i{
          line-height: 100px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .main{
      padding-right: 60px;
      background-color: #fff0e4;
      height: 100%;
      >div{
        width: 100%;
        height: 100%;
      }
      .choose_wrapper{
        padding-top: 50px;
        text-align: center;
        p.choose_title{
          font-size: 24px;
          color:@base-text-hover-color;
          line-height: 24px;
          margin-bottom: 20px;
        }
        p.choose_sub_title{
          font-size: 14px;
          line-height: 14px;
          color:#333;
          margin-bottom:80px;
        }
        .choose_box{
          width: 500px;
          margin:0 auto 174px;
          .person_wrapper,.company_wrapper{
            width: 120px;
            &:hover .icon_title{color:@base-text-hover-color;}
          }
          .person_wrapper{
            float:left;
          }
          .company_wrapper{
            float:right;
          }
          .person_icon_wrapper img{
            width: 71px;
          }
          .company_icon_wrapper img{
            height:92.8px;
          }
          .person_icon_wrapper,.company_icon_wrapper{
            border-radius: 50%;
            background-color: #bfbfbf;
            transition: background-color 300ms ease-in;
            cursor: pointer;
            height: 120px;
            position: relative;
            line-height: 120px;
            overflow: hidden;
            margin-bottom: 20px;
            img{
              vertical-align: middle;
              position: relative;
              z-index: 1;
            }
            svg{
              position: absolute;
              polyline{
                transition: fill 300ms ease-in;
                fill:#999
              }
            }
          }
          .person_icon_wrapper{
            svg{top:56px;left:24px;}
            &:hover{
              background-color: #fc6760;
              polyline{
                fill:#e25252;
              }
            }
          }
          .company_icon_wrapper{
            &:hover{
              background-color: #27c47d;
              polyline{
                fill:#1ba563;
              }
            }
            svg{top:46px;left:40px;}
          }
          .icon_title{
            font-size: 18px;
            color: #333;
            line-height: 18px;
            margin-bottom: 17px;
            cursor: default;
          }
          .icon_remark{
            font-size: 12px;
            color: @text_color_3;
            line-height: 12px;
            white-space: nowrap;
            margin-left: -8px;
            transition: color 300ms ease-in;
          }
        }
      }
      .first_wrapper{
        width:550px;
        height: 100%;
        text-align: center;
        padding-top: 50px;
        margin: 0 auto;
        p.title{
          padding-bottom: 26px;
          font-size: 24px;
          color: @base-text-hover-color;
          line-height: 24px;
        }
        .step_main{
          width: 300px;
          margin:0 auto;
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
        button{
          margin-bottom: 30px;
        }
        .error_msg{
          margin-top:70px;
          color:@base-text-hover-color;
          font-size: 12px;
          height: 12px;
          line-height: 12px;
          margin-bottom: 20px;
        }
        .input_type_title{
          text-align: left;
          font-size: 16px;
          color:#000;
          padding-top:28px;
          line-height: 16px;
          &:first-child{
            padding-top: 36px;
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
//      .secon
    }
  }
}
</style>
<style lang="less">
  .login-and-register-container{
    .ivu-select{
      width: 100px;
      margin-right:50px;
      float: left;
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
