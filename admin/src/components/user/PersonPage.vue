/**
* 个人中心
* Created by chenchen on 2017/9/15.
*/

<template>
    <div class="User">
      <div class="tip">
        <Button type="primary" v-on:click="editPw('info')">编辑信息</Button>
        <Button type="primary" v-on:click="editPw('paw')">修改密码</Button>
      </div>
        <ul class="ul">
          <li>
            <span class="msg-label"  >登陆名 : </span>
            <b>{{userData.loginName}}</b>
          </li>
          <li>
            <span class="msg-label"  >姓名 : </span>
            <b>{{userData.name}}</b>
          </li>
          <li>
            <span class="msg-label"  >性别 : </span>
            <b>{{userData.gender==102?'男':(userData.gender==103?'女':'未知')}}</b>
          </li>
          <li>
            <span class="msg-label"  >手机 : </span>
            <b>{{userData.mobile}}</b>
          </li>
          <li>
            <span class="msg-label"  >所在地区 : </span>
            <b>{{userData.adminDivisionName}}</b>
          </li>


        </ul>
      <Modal
        class-name="EditPasswordBo"
        v-model="editPasswordModal"
        title="修改密码"
        :mask-closable="false"
        :styles="{top: '20px'}"
        width="900">
        <EditPasswordOwn v-on:close="closeModal"></EditPasswordOwn>
      </Modal>
      <Modal
        class-name="EditPasswordBo"
        v-model="editINfoModal"
        title="编辑信息"
        :mask-closable="false"
        :styles="{top: '20px'}"
        width="900">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="220">
		  
		  <FormItem label="登录名：">
	        <label>{{formOrgItem.logonname}}</label>
	      </FormItem>
	      <FormItem label="姓名：" prop="fullname">
	        <Input type="text" v-model="formOrgItem.fullname" placeholder="请输入全名"></Input>
	      </FormItem>
	      <FormItem label="性别：" prop="gender">
	        <RadioGroup v-model="formOrgItem.gender">
		        <Radio label="男"></Radio>
		        <Radio label="女"></Radio>
		    </RadioGroup>
	      </FormItem>
	      <FormItem label="手机：">
	      	<label>{{formOrgItem.contactInformation}}</label>
	      </FormItem>
	      <FormItem>
	        <Button type="primary" v-on:click="addSave">提交</Button>
	        <Button type="ghost" style="margin-left: 8px" v-on:click="closeModal">取消</Button>
	      </FormItem>
	    </Form>
      </Modal>
    </div>
</template>

<script>
  import EditPasswordOwn from './EditPasswordOwn'
  import userServer from 'rs/userServer';
  import session from '@/config/session'
  export default {
    name: 'Organization',
    data () {
	    const validatePhoneCheck = (rule, value, callback) => {
	    	if (value === '') {
	          callback(new Error('请输入联系方式'));
	        }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))){ 
	        	callback(new Error('不是完整的11位手机号或者正确的手机号前七位'));
		    } else {
	          callback();
	        }
	    };
    	
      	return {
        	editPasswordModal:false,
        	editINfoModal:false,
        	userData:{},
        	userId: "",
	        formOrgItem: {
	          logonname: "",
	          fullname: "",
	          gender: "",
	          contactInformation:''
	        },
	        ruleCustom: {
	          fullname: [
	          	{required: true, max: 10, message: '全名不能为空且不能超出10位', trigger: 'blur'}
	          ]
	        }
      	}
    },
    components:{
    	'EditPasswordOwn':EditPasswordOwn
    },
    created: function () {
        userServer.findByUserId({},{},response=>{
            if(response.errorCode == 0 ){
                this.userData = response.data;
            }
        },error=>{

        });
    },
    methods: {
      editPw(type){
      	if(type == 'paw'){
      		this.editPasswordModal=true
      	}else if(type == 'info'){
      		this.formOrgItem.logonname = this.userData.loginName;
	        this.formOrgItem.fullname = this.userData.name;
	        if(this.userData.gender == 102){
	        	this.formOrgItem.gender = '男'
	        }else if(this.userData.gender == 103){
	        	this.formOrgItem.gender = '女'
	        }
	        this.formOrgItem.contactInformation = this.userData.mobile
	        this.editINfoModal = true
      	}
        
        
      },
      closeModal(){
        this.editPasswordModal=false;
        this.editINfoModal = false;
      },
      addSave () {
      	this.$refs.formOrgItem.validate((valid) => {
      		let json = {
      			id: session.get('userId'),
	            loginName: this.formOrgItem.logonname,
	            name: this.formOrgItem.fullname,
	            gender: this.formOrgItem.gender == '男' ? 102 : 103,
	            mobile: this.formOrgItem.contactInformation,
	          }
      		if(valid){
	        	userServer.updateUser({}, json, rsp=>{
	      			if (rsp.errorCode == '0') {
	                  this.$refs.formOrgItem.resetFields();
	                  this.closeModal();
	                  this.$Message.success('修改成功!');
	                  userServer.findByUserId({},{},response=>{
				          if(response.errorCode == 0 ){
				              this.userData = response.data;
				          }
				      },error=>{
				
				      });
	                }else if(data.errorCode=='1001'){} else {
	                  this.$Message.error('修改失败!');
	                }
	      		}, err => {
	      			this.$Message.error('修改失败!');
	      		});
      		}
      	})
      }
    }
  }
</script>

<style lang="less">
  .User {
    width: 900px;margin: 30px auto;
    .ul{
      font-size: 14px;
      li{ float: left; width: 50%; padding: 10px 0;}
      b,span,img{ vertical-align: middle;}
    }
    .tip{ text-align: right;}
  }
  .EditPasswordBo{
    .ivu-modal-footer{ display: none;}
  }
</style>
