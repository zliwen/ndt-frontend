/**
* Created by zhaowei on 2017/10/27.
*/

<template>
  <div class="MyCorporation">
  	<div v-if="roleIds==6||roleIds==11||roleIds==16||roleIds==23" class="tip">
	    <Button type="primary" v-on:click="edit()">编辑信息</Button>
	  </div>
    <ul class="ul clearfix">
    	<li v-if="data.parentName">
        <span>上级机构:</span>
        <b>{{data.parentName}}</b>
      </li>
    	<li>
        <span>机构名称:</span>
        <b>{{data.name}}</b>
      </li>
      <li>
        <span>机构代码:</span>
        <b>{{data.code}}</b>
      </li>
      <li>
        <span>联系电话:</span>
        <b>{{data.phone}}</b>
      </li>
      <li>
        <span>所在区域:</span>
        <b>{{data.adminDivisionName}}</b>
      </li>
      <li>
        <span>地址:</span>
        <b>{{data.address}}</b>
      </li>
      <li>
        <span>管辖范围:</span>
        <b v-for="item in data.divisionNames">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;</b>
      </li>
      <li v-if="userType==205||userType==206||userType==207||userType==203">
        <span>logo:</span>
        <img width="200" :src="data.logoImageUrl" alt="">
        <img width="200" :src="data.squareLogo" alt="">
      </li>
      <li>
        <span>简介:</span>
        <b>{{data.remark}}</b>
      </li>
    </ul>
    <Modal
      v-if="loading1"
        v-model="editMyCorporationFlag"
        title="编辑机构信息"
        width="50%"
        :mask-closable="false"
        :closable="false"
        @on-ok="addSave"
        @on-cancel="cancel">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="120">

	        <FormItem label="机构名称：" prop="name">
	          <Input v-model="formOrgItem.name" placeholder="请输入组织名称"></Input>
	        </FormItem>

	        <FormItem label="机构代码：" prop="code">
	          <Input v-model="formOrgItem.code" placeholder="请输入机构代码"></Input>
	        </FormItem>

	        <FormItem label="地址：" prop="address">
	          <Input type="textarea" :rows="2" v-model="formOrgItem.address" placeholder="请输入地址"></Input>
	        </FormItem>
	        <FormItem label="联系方式：" prop="phone">
	          <Input type="text" v-model="formOrgItem.phone" placeholder="请输入联系方式"></Input>
	        </FormItem>

	        <!--<FormItem label="机构所在区域：" prop="adminDivisionId">
	          <GetCity :set-value="formOrgItem.adminDivisionId" @onChange="adminDivisionIdChange"></GetCity>
	        </FormItem>-->

					<FormItem class="logo" label="机构logo：" prop="logo" v-if="userType==205||userType==206||userType==207||userType==203">
            <UploadImg
                       style="display: inline-block;"
                       :preview="true" :previewSize="[210,100]" :cut="true" :cutSize="logoSize"
                       v-model="formOrgItem.logoImageUrl"></UploadImg>
	        </FormItem>
          <FormItem class="logo" label="产品logo：" prop="logo" v-if="userType==205||userType==206||userType==207||userType==203">
            <UploadImg
              style="display: inline-block;"
              :preview="true" :previewSize="[200,200]" :cut="true" :cutSize="[200,200]"
              v-model="formOrgItem.squareLogo"></UploadImg>
          </FormItem>

	        <FormItem label="机构描述：" prop="remark">
	          <Input :rows="4"
	                 type="textarea" v-model="formOrgItem.remark"
	                 placeholder="请输入机构描述"></Input>
	        </FormItem>
	      </Form>
    </Modal>
  </div>
</template>

<script>
	import userServer from 'rs/userServer';
  import orgServer from 'rs/org';
  import {baseURL} from '@/config/constant';
  import regular from '@/services/regular';
  export default {
    name: 'Organization',
    data () {
    	const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('联系方式不能为空！'));
        } else if (!regular.test(value, '联系方式')) {
          callback(new Error('联系方式格式错误!'));
        } else {
          callback();
        }
      };
      const validateAdminDivisionId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择机构所在区域'));
        } else {
          callback();
        }
      };

      return {
        loading1:false,
      	editMyCorporationFlag:false,
        baseURL:baseURL,
        roleIds:this.session.get("roleIds"),
        userType:this.session.get('userType'),
        data:{},
        logoSize: [480, 200],
        formOrgItem: {},
        ruleCustom: {
          name: [
            {required: true, max: 100, message: '组织名称不能为空且不能超过100个字', trigger: 'blur'}
          ],
          code: [
            {required: true, max: 30, message: '机构代码必填且不能超过30位', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur', required: true}
          ],
          address: [
            {required: true, max: 125, message: '地址不能为空且不能超过125位', trigger: 'blur'}
          ]/*,
          adminDivisionId: [
            {required: true, validator: validateAdminDivisionId, trigger: 'blur'}
          ]*/
        }
      }
    },
    created: function () {
      orgServer.findById({id: this.session.get("orgId")}, {}, response => {
        this.data = response.data;
        this.formOrgItem.logoImageUrl=this.data.logoImageUrl;
        this.formOrgItem.squareLogo=this.data.squareLogo;
        this.loading1=true;
      }, err => {
      });
    },
    methods: {
      edit(){
          this.parentOrgSubtype = Number(this.data.orgSubtype);
          if (this.data.id) {
            this.formOrgItem = this.data;
        	}
					this.editMyCorporationFlag = true;
     	},
     	adminDivisionIdChange: function (data) {
        if (data && data.length) this.formOrgItem.adminDivisionId = data[data.length - 1];
      },
     	addSave() {
     		this.$refs.formOrgItem.validate((valid) => {
     			var json = {
     				"id": this.formOrgItem.id,
            "name": this.formOrgItem.name,
            "code": this.formOrgItem.code,
//          "adminDivisionId": this.formOrgItem.adminDivisionId,
            "address": this.formOrgItem.address,
            "logoImageUrl": this.formOrgItem.logoImageUrl,
            "squareLogo": this.formOrgItem.squareLogo,
            "phone": this.formOrgItem.phone,
            "remark": this.formOrgItem.remark,
          };
          console.log("json", json)
          userServer.updateOrgInfo({}, json, data => {
                if (data.errorCode == '0') {
                  this.$Message.success('编辑保存成功!');
                }else if(data.errorCode =="9999"){
                  if(data.data=="Code:12 existed!"){
                    this.$Message.error(
                      {
                        content: '已有相同机构代码',
                        duration: 10,
                        closable: true
                      });
                  }else {
                    this.$Message.error(
                      {
                        content: '银行不能添加子机构',
                        duration: 10,
                        closable: true
                      });
                  }
                }
              }, function (err) {
                this.$Message.error('编辑失败失败!');
          })
     		});
     	},
     	cancel(){

     	}
    }
  }
</script>

<style lang="less">
  .MyCorporation { width: 900px;margin: 20px auto;
    .ul{
    	font-size:14px;
      li{ float: left; width: 100%; padding: 10px 0;}
      b,span,img{ vertical-align: middle;}
    }
    .tip{ text-align: right;}
  }
</style>

