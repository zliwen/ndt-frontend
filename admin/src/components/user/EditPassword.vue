/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="editPassword">
    <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="220">

      <FormItem label="密码：" prop="password">
        <Input type="password" v-model="formOrgItem.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label=" 再次输入密码：" prop="passwordRepeat">
        <Input type="password" v-model="formOrgItem.passwordRepeat" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" v-on:click="addSave">提交</Button>
        <Button type="ghost" style="margin-left: 8px" v-on:click="remove">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import otherServer from 'rs/otherServer';
  import orgTypeList from '@/services/orgType';
  //import md5 from 'js-md5';
  import {Base64} from 'js-base64';
  import regular from '@/services/regular';
  export default {
    name: 'editPassword',
    props: ["orgItemData"],
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
      return {
        userId: "",
        formOrgItem: {
          password: "",
          passwordRepeat: ""
        },
        ruleCustom: {
          password: [
            {required: true, min: 6, max: 20, message: '密码不能为空且必须在6至20位之间', trigger: 'blur'}
          ],
          passwordRepeat: [
            {required: true, min: 6, max: 20, validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      'orgItemData': {
        handler: function (val, oldVal) {
          this.$refs.formOrgItem.resetFields();
          if (val.name != null && val.name != undefined) {
            this.userId = val.id;
          } else {

          }
        }
      }
    },
    created: function () {

    },
    methods: {
      addSave () {
        this.addLoading = true;
        this.$refs.formOrgItem.validate((valid) => {
          var json = {
            userId: this.userId,
            newPassword: Base64.encode(this.formOrgItem.password)
          };
          if (valid) {
            otherServer.updatePwdByAdmin({}, json, data => {
              if (data.errorCode == '0') {
                this.$refs.formOrgItem.resetFields();
                this.remove();
                this.$Message.success('修改成功!');
              } else if (data.errorCode == '1001') {
              } else {
                this.$Message.error('修改失败!');
              }
            }, err => {
              this.$Message.error('修改失败!');
            })
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

  .editPassword {
  }
</style>
