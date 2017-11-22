/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="UserAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/user">平台用户</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="120">
      <FormItem label="用户类型：" prop="userType">
        <RadioGroup v-model="formOrgItem.userType">
          <Radio value="202" label="个人"></Radio>
          <Radio value="203" label="企业"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="登录名：" prop="loginName">
        <Input v-model="formOrgItem.loginName" placeholder="请输入登录名"></Input>
      </FormItem>
      <FormItem label="手机号：" prop="mobile">
        <Input type="text" v-model="formOrgItem.mobile"
               placeholder="请输入手机号"></Input>
      </FormItem>
      <FormItem label="密码：" prop="password" v-if="!isEdit">
        <Input type="password" v-model="formOrgItem.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="再次输入密码：" prop="passwordRepeat" v-if="!isEdit">
        <Input type="password" v-model="formOrgItem.passwordRepeat" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem label="姓名：" prop="name">
        <Input type="text" v-model="formOrgItem.name"
               placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="性别：" prop="gender">
        <RadioGroup v-model="formOrgItem.gender">
          <Radio label="男" value="102"></Radio>
          <Radio label="女" value="103"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="所在区域：" prop="adminDivisionId">
        <GetCity :changeOnSelect="changeOnSelect" :setValue="cityInit" @onChange="adminDivisionIdChange"></GetCity>
      </FormItem>
      <FormItem>
        <Button type="primary" v-on:click="addSave">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import orgTypeList from '@/services/orgType';
  import {Base64} from 'js-base64';
  import frontendServer from 'rs/frontendServer';
  import roleServer from 'rs/roleServer';
  export default {
    name: 'UserAdd',
    data () {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formOrgItem.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if ((value + "").length < 6) {
          callback(new Error('密码不能小于6个字!'));
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
        changeOnSelect: false,
        title: "添加用户",
        isEdit: false,
        verificationDisabled: false,
        verificationText: "获取验证码",
        cityInit: "",

        labelInValue: true,
        isLogoParent: true,
        isRemarkParent: true,
        loading1: false,
        orgTypeList: orgTypeList,
        parentList: [],
        formOrgItem: {
          loginName: "",
          password: "",
          passwordRepeat: "",
          name: '',
          gender: "男",
          mobile: "",
          userType: "个人",
          adminDivisionId: ""
        },
        ruleCustom: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '登录名不能为空', trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur', required: true}
          ],
          passwordRepeat: [
            {validator: validatePassCheck, trigger: 'blur', required: true}
          ],
          mobile: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ],
          adminDivisionId: [
            {required: true, validator: validateAdminDivisionId, trigger: 'blur'}
          ],
        }
      }
    },
    watch: {},
    created: function () {
      if (!this.session.get('userObj')) {
        this.modalCancle();
        return;
      }
      let userObj = JSON.parse(this.session.get('userObj'));
      if (userObj.type == "edit") {
        this.title = "编辑用户(" + userObj.data.name + ")";
        this.isEdit = true;
        this.modalType = userObj.type;
        this.formOrgItem = userObj.data;
        this.formOrgItem.password = "#%#%#%#";
        this.formOrgItem.passwordRepeat = "#%#%#%#";
        this.formOrgItem.gender = this.formOrgItem.gender == '102' ? '男' : '女';
        this.formOrgItem.userType = this.formOrgItem.userType == 202 ? '个人' : '企业';
        this.cityInit = userObj.data.adminDivisionId;
      }


    },
    methods: {

      modalCancle(){
        this.$router.push('./user')
      },
      adminDivisionIdChange: function (data) {
        if (data && data.length){
            this.formOrgItem.adminDivisionId = data[data.length - 1];
        }else{
          this.formOrgItem.adminDivisionId="";
        }
      },
      goBack(str){
        this.$Modal.confirm({
          title: str,
          content: '<p>是否返回列表？</p>',
          onOk: () => {
            this.$router.go(-1);
          },
          onCancel: () => {
            this.$refs.formOrgItem.resetFields();
          }
        });
      },
      addSave () {//保存

        this.addLoading = true;
        this.$refs.formOrgItem.validate((valid) => {
          if (valid) {
            var json = {
              loginName: this.formOrgItem.loginName,
              password: this.formOrgItem.password,
              name: this.formOrgItem.name,
              gender: this.formOrgItem.gender == '男' ? 102 : 103,
              mobile: this.formOrgItem.mobile,
              userType: this.formOrgItem.userType == '个人' ? 202 : 203,
              adminDivisionId: this.formOrgItem.adminDivisionId,
              roleId: this.formOrgItem.userType == '个人' ? [21] : [22],
              sourceId:7001
            };

            if (!this.isEdit) {
              json.password = Base64.encode(this.formOrgItem.password);
              userServer.add({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
                  this.goBack("添加成功")
                } else {
                  this.$Message.error(
                    {
                      content: '失败!——' + data.data,
                      duration: 10,
                      closable: true
                    });
                }
              }, err => {
                this.$Message.error('添加失败失败!');
              })
            } else {
              json.id = this.formOrgItem.id;
              if (this.formOrgItem.password != "#%#%#%#") json.password = Base64.encode(this.formOrgItem.password);
              userServer.updateUser({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
                  this.goBack("修改成功");
                } else {
                  this.$Message.error(
                    {
                      content: '失败!——' + data.data,
                      duration: 10,
                      closable: true
                    });
                }
              }, function (err) {
                this.$Message.error('添加失败失败!');
              })
            }
          } else {
            //this.$Message.error('表单验证失败!');
          }
        })

      }
    }
  }
</script>

<style scoped lang='less'>
  .UserAdd {
    .ivu-form-label-right {
      width: 500px;
      margin: 0 auto;
    }
  }
</style>
