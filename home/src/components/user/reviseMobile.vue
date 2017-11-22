<template>
    <div class="reviseMobile">
      <div class="userTitleb">
        修改手机号
      </div>
      <div class="fromBox">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="110">
          <FormItem class="fkipt" label="当前手机号">
            <Input disabled v-model="formOrgItem.mobile" type="text"></Input>
          </FormItem>
          <FormItem class="fkipt" label="新手机号" prop="value">
            <Input v-model="formOrgItem.value" type="text" placeholder="密码为6-16位数字、字母或符号组合"></Input>
          </FormItem>
          <FormItem class="fkipt" label="新手机验证码" prop="verificationCode">
            <Input v-model="formOrgItem.verificationCode" type="text" placeholder="密码为6位数字"></Input>
            <b class="yzm" v-if="!getCoded" @click="getVerificationCode">获取验证码</b>
            <b class="yzm" v-if="getCoded">
              {{countDown}}后重新获取
            </b>
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
  import regular from '@/services/regular';
  import indexServer from "rs/index"
  import userServer from "rs/user"

  export default {
    name: 'reviseMobile',
    props:{
      data:{}
    },
    data () {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空！'));
        } else if (!regular.test(value, '手机号')) {
          callback(new Error('手机号格式错误!'));
        } else {
          callback();
        }
      };
      return {
        getCoded:false,
        countDown:"",
        err:"",
        formOrgItem:{
          mobile:this.data.mobile,
          value:"",
          verificationCode:""
        },
        ruleCustom:{
          value: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '验证码不能为空！', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      addSave () {
        this.err="";
        this.$refs.formOrgItem.validate((valid) => {
            //15823061208
          //13588888888
          if(valid){
            userServer.updateLoginName({data:{
              type:"mobile",
              value:this.formOrgItem.value,
              verificationCode:this.formOrgItem.verificationCode
            }},response=>{
              if(response.errorCode==0){
                this.$Message.success('修改成功!');
                storage.del("token");
                this.$store.commit("setToken","");
                this.$router.push({name:"loginAndRegister",query:{type:1}});
              }else {
                  alert("错误")
              }
            })
          }else {

          }
        })
      },
      ret(){
        this.$refs.formOrgItem.resetFields();
      },
      getVerificationCode(){
        indexServer.getCode({params:{mobile:this.formOrgItem.value}},rep=>{
          this.getCoded = true;
          this.countDown = 60;
          this.intervalId = setInterval(()=>{
            this.countDown--;
            if(this.countDown===0){
              clearInterval(this.intervalId);
              this.countDown = 60;
              this.getCoded = false;
            }
          },1000);
        });
      }
    }
  }
</script>

<style lang='less'>
  .reviseMobile {
    .userTitleb{font-size: 16px; padding-left: 10px; border-left: 2px solid #ff762b; height: 18px;
    line-height: 18px;
  }
    .fromBox{ width:400px; margin: 60px 0 0 200px;}
    .fkipt{ border-bottom: 1px solid #ededed; margin-bottom:34px; position: relative;
      .ivu-form-item-label{ text-align: center;}
      .ivu-input{ border: none; border-radius: 0; outline:none; box-shadow: none;}
      .ivu-input[disabled]{ background: #fff; color: #222;}
      .yzm{ position: absolute; right: 0; top:2px;
        display: inline-block; height: 26px; padding: 0 20px; border-radius: 15px;
        border: 1px solid #ff762b; color: #ff762b; line-height: 26px; cursor: pointer;

      }
    }
    .rtb{ height: 60px; width: 150px; background: none; font-size: 18px;
      border: 1px solid #999999; color: #999999; margin-right: 20px;}
    .btBx{ margin-top: 60px; text-align: center;}
    .bttt{ height: 60px; width: 150px; background: none !important;
      border: 1px solid #ff762b; font-size: 18px; color: #ff762b;}
    .err1{ line-height: 40px; color: #c00; text-align: center;}
  }
</style>
