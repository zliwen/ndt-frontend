/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="bankingEdit">
    <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="220">
      <FormItem label="登录名称：" prop="loginName">
        <Input v-model="formOrgItem.loginName" placeholder="请输入用户名称"></Input>
      </FormItem>
      <FormItem v-if="formOrgItem.passwordRepeat != '#%#%#%#'" label="密码：" prop="password">
        <Input type="password" v-model="formOrgItem.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem v-if="formOrgItem.passwordRepeat != '#%#%#%#'" label=" 再次输入密码：" prop="passwordRepeat">
        <Input type="password" v-model="formOrgItem.passwordRepeat" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem label="全名：" prop="name">
        <Input v-model="formOrgItem.name" placeholder="请输入全名"></Input>
      </FormItem>
      <FormItem label="性别：" prop="gender">
        <RadioGroup v-model="formOrgItem.gender">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="联系方式：" prop="mobile">
        <Input type="text" v-model="formOrgItem.mobile" placeholder="请输入电话号码,可用于登陆本平台"></Input>
      </FormItem>

      <FormItem label="用户类型：" prop="roleType" v-if="roleList.list">
        <RadioGroup v-model="formOrgItem.roleType">
          <Radio label="管理员"></Radio>
          <Radio label="业务员"></Radio>
        </RadioGroup>
        <!--<CheckboxGroup style="margin-left: 60px;" v-model="formOrgItem.roleId" v-if="formOrgItem.roleType=='业务员'">
          <Checkbox v-for="item in roleList.list" :key="item.id" :label="item.name" :value="item.value"></Checkbox>
        </CheckboxGroup>-->

      </FormItem>
      <FormItem>
        <Button type="primary" v-on:click="addSave">提交</Button>
        <Button type="ghost" style="margin-left: 8px" v-on:click="remove">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import orgTypeList from '@/services/orgType';
  //import md5 from 'js-md5';
  import {Base64} from 'js-base64';
  import regular from '@/services/regular';
  export default {
    name: 'bankingEdit',
    props: ["orgItemData", "parentObj", "userType","orgType"],
    data () {
      const validatePhone = (rule, value, callback) => {
        if (value!=""&&!regular.test(value, '联系方式')) {
          callback(new Error('联系方式格式错误!'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formOrgItem.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelInValue: true,
        isLogoParent: true,
        isRemarkParent: true,
        loading1: false,
        orgTypeList: orgTypeList,
        parentList: [],
        formOrgItem: {
          loginName: '',
          password: "",
          passwordRepeat: "",
          name: "",
          gender: '男',
          mobile: "",
          roleType: '管理员',
          roleId: []
        },
        ruleCustom: {
          loginName: [
            {required: true, max: 20, message: '登录名称不能为空且不能超出20位', trigger: 'blur'}
          ],
          password: [
            {required: true, min: 6, max: 20, message: '密码不能为空且必须在6至20位之间', trigger: 'blur'}
          ],
          passwordRepeat: [
            {required: true, min: 6, max: 20, validator: validatePassCheck, trigger: 'blur'}
          ],
          name: [
            {required: true, max: 10, message: '全名不能为空且不能超出10位', trigger: 'blur'}
          ],
          mobile: [
            {validator: validatePhone, trigger: 'blur'}
          ]
        },
        roleLists: {
          3001: {
            admin: [23],
            list: [
              {name: "新闻维护员", value: 24},
              {name: "新闻审核员", value: 25},
              {name: "政策内容维护员", value: 26},
              {name: "政策内容审核员", value: 27},
              {name: "流程审批员", value: 28}
            ]
          },
          3002: {
            admin: [29]
          },
          3003: {
            admin: [36]
          },
          3004: {
            admin: [6],
            list: [
              {name: "产品维护员", value: 7},
              {name: "业务审核员", value: 8},
              {name: "项目邀约人员", value: 9},
              {name: "政策申请人员", value: 10}
            ]
          },
          3005: {
            admin: [11],
            list: [
              {name: "产品维护员", value: 12},
              {name: "业务审核员", value: 13},
              {name: "项目邀约人员", value: 14},
              {name: "政策申请人员", value: 15}
            ]
          },
          3006: {
            admin: [16],
            list: [
              {name: "产品维护员", value: 17},
              {name: "业务审核员", value: 18},
              {name: "项目邀约人员", value: 19},
              {name: "政策申请人员", value: 20}
            ]
          },
          3007: {
            admin: [34]
          }
        },
        roleList: []
      }
    },
    watch: {
      'orgItemData': {
        handler: function (val, oldVal) {
          this.$refs.formOrgItem.resetFields();
          if (val.name != null && val.name != undefined) {
            this.formOrgItem.loginName = val.loginName;
            this.formOrgItem.password = this.formOrgItem.passwordRepeat = "#%#%#%#";
            this.formOrgItem.name = val.name;
            this.formOrgItem.gender = val.gender == 102 ? "男" : "女";
            this.formOrgItem.mobile = val.mobile;

            debugger
            this.formOrgItem.roleType = "业务员";
            if (val.roleVos && val.roleVos.length) {
              this.formOrgItem.roleId = [];
              val.roleVos.forEach(item => {
                for( let ml in this.roleLists){
                  if(this.roleLists[ml].admin[0]==item.id){
                    this.formOrgItem.roleType = "管理员"
                  }
                }
                if (this.formOrgItem.roleType == "业务员") {
                  this.formOrgItem.roleId.push(item.name);
                }
              })
            }
          }else{
            this.formOrgItem.password = this.formOrgItem.passwordRepeat = "";
          }
        }
      }
    },
    created: function () {
      debugger
      this.roleList = this.roleLists[this.orgType];
    },
    methods: {
      addSave () {
        this.addLoading = true;
        this.$refs.formOrgItem.validate((valid) => {
          var json = {
            loginName: this.formOrgItem.loginName,
            name: this.formOrgItem.name,
            gender: this.formOrgItem.gender == '男' ? 102 : 103,
            mobile: this.formOrgItem.mobile,
            userType: this.userType,
            orgId: this.parentObj.id,
            adminDivisionId: this.parentObj.adminDivisionId,
            sourceId:7001
          };

          if (this.formOrgItem.roleType == '管理员') {
            json.roleId = this.roleList.admin;
          } else {
            json.roleId = [];

            /*this.formOrgItem.roleId.forEach(item => {
              this.roleList.list.forEach(obj => {
                if (obj.name == item) json.roleId.push(obj.value);
              })
            })*/

            this.roleList.list.forEach(obj => {
              json.roleId.push(obj.value);
            })
          }
          if (valid) {
            if (!this.orgItemData || !this.orgItemData.id) {
              json.password = Base64.encode(this.formOrgItem.password)
              userServer.userAdd({}, json, data => {
                if (data.errorCode == '0') {

                  this.remove();
                  this.$Message.success('添加成功!');
                }else {
                  this.$Message.error(
                    {
                      content: '失败!——'+data.data,
                      duration: 10,
                      closable: true
                    });
                }
              }, err => {
                this.$Message.error('添加失败!');
              })
            } else {
              json.id = this.orgItemData.id;
              if (this.formOrgItem.password != "#%#%#%#") json.password = Base64.encode(this.formOrgItem.password);
              userServer.updateUser({}, json, data => {
                if (data.errorCode == '0') {
                  this.remove();
                  this.$Message.success('修改成功!');
                }else {
                  this.$Message.error(
                    {
                      content: '失败!——'+data.data,
                      duration: 10,
                      closable: true
                    });
                }
              }, function (err) {
                this.$Message.error('添加失败!');
              })
            }
          } else {
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })

      },
      remove(){
        this.$emit("close", ["11"]);
      }
    }
  }
</script>

<style scoped lang='less'>

  .bankingEdit {
  }
</style>
