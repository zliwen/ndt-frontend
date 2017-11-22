<template>
    <div class="revisePassword">
      <div class="userTitleb">
        修改密码
      </div>
      <div class="fromBox">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="110">
          <FormItem class="fkipt" label="当前登录密码" prop="oldPassword">
            <Input v-model="formOrgItem.oldPassword" type="password" placeholder="请输入当前登录密码"/>
          </FormItem>
          <FormItem class="fkipt" label="新登录密码" prop="newPassword">
            <Input v-model="formOrgItem.newPassword" type="password" placeholder="密码为6-16位数字、字母或符号组合" style="width: 150px"/>
            <psd-intension-verify style="width: 130px;float: right;margin-top: 8px" :value="formOrgItem.newPassword" class="psd-intension-verify"/>
          </FormItem>
          <FormItem class="fkipt" label="确认新登录密码" prop="passwordRepeat">
            <Input v-model="formOrgItem.passwordRepeat" type="password" placeholder="请再次输入新登录密码"/>
          </FormItem>
          <div class="btBx">
            <Button class="rtb" @click="ret">暂不修改</Button>
            <Button class="bttt" v-on:click="addSave">确定修改</Button>
            <p class="err1">{{err}}</p>
          </div>
        </Form>
      </div>
    </div>
</template>

<script>
  import accountServer from "rs/account"
  import {Base64} from "js-base64"
  export default {
    name: 'revisePassword',
    data () {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formOrgItem.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        err:"",
        formOrgItem:{
          oldPassword:"",
          newPassword:"",
          passwordRepeat:""
        },
        ruleCustom:{
          oldPassword: [
            {required: true,max: 16,min:6, message: '长度只能在6-16个字符之间', trigger: 'blur'}
          ],
          newPassword: [
            {required: true,max: 16,min:6, message: '长度只能在6-16个字符之间', trigger: 'blur'}
          ],
          passwordRepeat: [
            {required: true, min: 6, max: 16, validator: validatePassCheck, trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
      addSave () {
        this.err="";
        this.$refs.formOrgItem.validate((valid) => {

          if(valid){
            accountServer.updatePasswd({data:{
              oldPassword:Base64.encode(this.formOrgItem.oldPassword),
              newPassword:Base64.encode(this.formOrgItem.newPassword)
            }},response=>{
              if(response.errorCode==0){
                this.$Message.success('修改成功!');
                storage.del("token");
                this.$store.commit("setToken","");
                this.$router.push({name:"loginAndRegister",query:{type:1}});
              }else if(response.errorCode==1007){
                  this.err="旧密码错误！";
              }
            })
          }else {

          }
        })
      },
      ret(){
        this.$refs.formOrgItem.resetFields();
      }
    }
  }
</script>

<style lang='less'>
  .revisePassword {
    .userTitleb{font-size: 16px; padding-left: 10px; border-left: 2px solid #ff762b; height: 18px;
    line-height: 18px;
  }
    .fromBox{ width:400px; margin: 60px 0 0 200px;}
    .fkipt{ border-bottom: 1px solid #ededed; margin-bottom:34px;
      .ivu-form-item-label{ text-align: left;}
      .ivu-input{ border: none; border-radius: 0; outline:none; box-shadow: none;}
    }
    .rtb{height: 40px; width: 120px; background: none; font-size: 16px;
      border: 1px solid #999999; color: #999999; margin-right: 20px;}
    .btBx{ margin-top: 60px; text-align: center;}
    .bttt{ height: 40px; width: 120px; background: none !important;
      border: 1px solid #ff762b; font-size: 16px; color: #ff762b;}
    .err1{ line-height: 40px; color: #c00; text-align: center;}
  }
</style>
