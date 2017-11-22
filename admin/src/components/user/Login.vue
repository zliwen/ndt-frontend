/**
* Created by zhaowei on 2017/9/6.
*/

<template>
  <div class="Login">
    <img src="../../assets/images/loginBg.png" alt="">
    <div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <div>
          <img src="../../assets/images/logo01.png" alt="">
        </div>
        <p style="margin: 0 0 16px; font-weight: bold; font-size: 20px; color: #fff;">账号登录</p>
        <div>
          <FormItem prop="loginType">
            <RadioGroup size="large" v-model="formInline.loginType">
              <Radio label="用户名" value="2"></Radio>
              <Radio label="手机号" value="1"></Radio>
            </RadioGroup>

          </FormItem>
        </div>
        <div>
          <FormItem prop="loginName">
            <Input @keyup.enter.native="handleSubmit" type="text" size="large" v-model.trim="formInline.loginName"
                   placeholder="手机号／登录名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </div>
        <div>
          <FormItem prop="password">
            <Input @keyup.enter.native="handleSubmit" type="password" size="large"
                   v-model.trim="formInline.password" placeholder="密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <p style="margin-bottom: 10px; margin-top: -10px; text-align: right; color: #fff;">
            <template>
              <Checkbox v-model="forget">记住密码？</Checkbox>
            </template>
          </p>
        </div>


        <div>
          <FormItem>
            <Button class="btno"
                    @keyup.enter.native="handleSubmit" type="primary" size="large" @click="handleSubmit">登录
            </Button>

            <a class="aaa" href="http://chrome.360.cn/" target="_blank"
               style="margin:15px 0; color: #fff;">为了更好体验，点击下载360
              浏览器使用</a>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import md5 from 'js-md5';
  import {Base64} from 'js-base64';
  import adminServer from 'rs/admin';
  import cityData from '../../services/cityData';

  export default {
    name: 'Login',
    data () {
      return {
        forget:false,
        formInline: {
          loginName: '',
          password: '',
          loginType: '用户名'
        },
        ruleInline: {
          loginName: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 4, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        }
      }
    },
    created: function () {
      if(this.session.get("loginPassword")){
        this.formInline.password="#%#@(*&^%#";
        this.formInline.loginName=this.session.get("adminLoginName");
        this.forget=true;
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.formInline.validate((valid) => {
          if (valid) {
            userServer.login({}, {
              loginName: this.formInline.loginName,
              //password: this.formInline.password,
              password:
                this.formInline.password=="#%#@(*&^%#"?this.session.get("loginPassword"):Base64.encode(this.formInline.password),
              loginType: this.formInline.loginType == '手机号' ? 1 : null
            }, response => {
              if (response.errorCode == 0) {
                if (response.data.userType == 202 || response.data.userType == 203) {
                  this.$Message.error({
                    content: '个人／企业不能登录',
                    duration: 10,
                    closable: true
                  });
                  return
                }
                this.session.set("adminToken", response.data.token);
                this.session.set("adminTokenTime", ((new Date()) - 0) + response.data.tokenExpireMinutes * 1000 * 60);
                this.session.set("adminTokenTimeKey", response.data.tokenExpireMinutes * 1000 * 60);
                this.session.set("adminRefreshToken", response.data.refreshToken);

                this.session.set("userId", response.data.userId);
                if (response.data.orgId) {
                  this.session.set("orgId", response.data.orgId);
                } else {
                  this.session.set("orgId", "");
                }
                this.session.set("roleIds", response.data.roleIds);
                this.session.set("userType", response.data.userType);
                this.session.set("adminLoginName", this.formInline.loginName);
                this.session.set("adminDivisionId", response.data.orgAdminDivisionId||response.data.adminDivisionId);

                if(this.forget&&this.formInline.password!="#%#@(*&^%#"){
                  this.session.set("loginPassword", Base64.encode(this.formInline.password));
                }else if(!this.forget){
                  this.session.remove("loginPassword");
                }

                adminServer.divisions({}, {}, response => {
                  if (response.data && response.data.length) {
                    let arr = [];
                    response.data.forEach(item => {
                      arr.push(item.id);
                    });
                    this.session.set("divisions", JSON.stringify(arr));
                    cityData.init(arr);
                  } else {
                    cityData.init([5101]);
                    this.session.set("divisions", JSON.stringify([5101]));
                  }
                })

                setTimeout(() => {
                  switch (response.data.userType) {
                    case 201:
                      switch (response.data.roleIds[0]) {
                        case 31://平台服务机构审核员
                        case 32://収储机构审核员
                          this.$router.push({name: 'RiskBearing'});
                          break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 35:
                          this.$router.push({name: 'Policy'});
                          break;
                      }
                      break;
                    case 202:
                      break;
                    case 203:
                      break;
                    case 204:
                      switch (response.data.roleIds[0]) {
                        case 34://乡镇
                          this.$router.push({name: 'News'});
                          break;
                        case 36://村站
                          this.$router.push({name: 'VillageInfo'});
                          break;
                        case 29://联协会
                          this.$router.push({name: 'Policy'});
                          break;
                        case 23://政府
                          this.$router.push({name: 'Policy'});
                          break;
                        case 24://政府业务员
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                          this.$router.push({name: 'Policy'});
                          break;
                      }
                      break;
                    case 205:
                    case 206:
                    case 207:
                      this.$router.push({name: 'FinanceLoanApply'});
                      break;
                    case 208:
                      this.$router.push({name: 'user_banking'});
                      break;
                  }
                }, 1000);

                this.$Message.success('登录成功!');
              } else {
                if (response.errorCode == 1000) {
                  this.$Message.error({
                    content: '用户名或密码错误',
                    duration: 10,
                    closable: true
                  });
                } else if (response.errorCode == 1007) {
                  this.$Message.error({
                    content: '用户名或密码错误',
                    duration: 10,
                    closable: true
                  });
                } else {
                  this.$Message.error({
                    content: '登录失败（' + response.errorCode + "）",
                    duration: 10,
                    closable: true
                  });
                }
              }
            }, err => {

            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>

<style lang='less'>
  .Login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ededed;
    overflow: hidden;
  .aaa{
    &:hover{ text-decoration: underline; color: #00aca2;}
  }
  >
  img {
    width: 100%;
    height: 100%;
  }

  >
  div {
    width: 360px;
    background: rgba(106, 57, 6, 0.8);
    padding: 20px 30px;
    position: absolute;
    top: 50%;
    margin-top: -250px;
    left: 50%;
    margin-left: -180px;
    text-align: center;
    border-radius: 6px;
  }

  .ivu-input-wrapper {
    height: 50px !important;
    width: 100%;
    font-size: 30px;

  input {
    height: 50px !important;
  }

  }
  .ivu-input-group-large > .ivu-input-group-prepend {
    font-size: 30px;
  }

  .btno {
    width: 100%;
    height: 50px;
    font-size: 18px;
    background: #ffbc1b;
    border: none;
  }

  .ivu-radio-group {
    color: #fff;
    font-size: 20px !important;
  }

  .ivu-input-group-prepend {
    background: #f1f1f1;
    padding: 0 15px;
    color: #aaa;
  }

  .ivu-radio-wrapper {
    font-size: 18px;
  }

  }


</style>
