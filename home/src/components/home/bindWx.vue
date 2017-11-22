<template>
  <div class="bind_wei_xin_container" :style="{height:Math.max($store.state.screenHeight - 70,610)+'px'}" v-if="token">
    <div class="bind_wei_xin">
      <div style="width: 316px;margin: 0 auto">
        <p class="name" v-text="name"></p>
        <p class="hint">为了更好的为您服务，请关联一个农贷通账号</p>
        <p class="choose">已有农贷通账号？</p>
        <Button @click="modal = true">关联已有账号</Button>
        <p class="choose">还没有农贷通账号？</p>
        <router-link :to="{name:'loginAndRegister',query:{type:0,thirdId:form.thirdId}}" tag="Button">立即注册一个农贷通账号</router-link>
      </div>
    </div>
    <Modal
      v-model="modal"
      :mask-closable="false"
      title="绑定已有账号">
      <Form :model="form" :rules="rules" :label-width="80" ref="form">
        <FormItem label="手机号" prop="loginName">
          <Input v-model="form.loginName" placeholder="请输入登陆手机号"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button @click="ok" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {Base64} from "js-base64"
  import indexServer from "rs/index"
export default {
  props:{
  },
	data() {
    const checkPsd = (r,v,c)=>{
      if(!v)c("请输入密码");
      else if(!/^\S{6,16}$/.test(v))c("密码由6-16位数字、字母或符号组成");
      else c();
    };
    const checkName = (r,v,c)=>{
      if(!v)c("请填写手机号码");
      else if(!(/^1(3|4|5|7|8)[0-9]{9}$/.test(v)))c("手机号格式不正确");
      else c();
    };
    return {
      token:true,
      modal:false,
      form:{
        thirdId:"",
        loginName:"",
        password:"",
      },
      name:"",
      rules:{
        loginName:[{ validator: checkName, trigger: 'blur' }],
        password:[{ validator: checkPsd, trigger: 'blur' }]
      }
    }
	},
	beforeCreate() {
	},
  created(){
    let query = this.$route.query;
    let token = query.token;
    let sessionId = query.sessionId;
    if(token){
      this.token = false;//不去渲染
      this.session.set("token",token,"2h");
      this.$store.commit("setToken",token);
      indexServer.getMsg({params:{params2:sessionId}},({data})=>{
        this.session.set('loginName',data.mobile,'7d');
        this.$store.commit("setLoginName",data.mobile);
        this.set(data);
      });
      return;
    }
    this.name = this.$route.query.nickname;
    this.form.thirdId = this.$route.query.thirdId;
  },
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {
    ok(){
      this.$refs.form.validate(l=>{
        if(l){
          let form = this.form;
          let obj = {
            loginName:form.loginName,
            password:Base64.encode(form.password),
            thirdId:form.thirdId,
          };
          indexServer.bindWx({data:obj},({errorCode,data})=>{
            this.modal = false;
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
                this.session.set("token",data.token,"2h").set('loginName',form.loginName,'7d');
                this.$store.commit("setLoginName",form.loginName);
                this.$store.commit("setToken",data.token);
                this.set(data);
                break;
              default:
                this.error_msg = "登录失败，请稍后再试";
                break;
            }
          });
        }
      });
    },
    set(data){
      this.session.set("userId", data.userId);
      this.session.set("userDivisionId", (data.adminDivisionId+"").slice(0,6));
      this.session.set("orgId", data.orgId);
      this.session.set("roleIds", data.roleIds);
      this.session.set("userType", data.userType);
      this.session.set("userObj", JSON.stringify(data));
      this.$router.push("/");
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .bind_wei_xin_container{
    background: url("../../assets/images/login_bg.jpg") no-repeat 0 -90px;
    position: relative;
    .bind_wei_xin{
      background-color: #fff;
      width: 760px;
      height: 450px;
      position: absolute;
      top:50%;
      left:50%;
      margin-left:-380px;
      margin-top:-225px;
      box-shadow:0 25px 40px 5px rgba(255,118,43,0.4);
      overflow: hidden;
      padding-top:50px;
      .name{
        font-size: 24px;
        padding-left: 10px;
        margin-bottom: 30px;
      }
      .hint{
        padding-left: 30px;
        margin-bottom: 60px;
        font-size: 14px;
      }
      .choose{
        margin-bottom: 10px;
      }
      .ivu-btn{
        background-color: #fff;
        width: 300px;
        &:nth-of-type(1){
          color: #ff762b;
          border-color: #ff762b;
          margin-bottom: 30px;
          &:hover{
            background-color: #ff762b;
            color: #fff;
          }
        }
        &:nth-of-type(2){
        }
      }
    }
  }
</style>
