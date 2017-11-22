/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="VillageAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/village"> 村站机构管理</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="120">
        <FormItem label="机构名称：" prop="name">
          <Input v-model="formOrgItem.name" placeholder="请输入组织名称"></Input>
        </FormItem>
        <FormItem label="机构代码：" prop="code">
          <Input v-model="formOrgItem.code" placeholder="请输入机构代码"></Input>
        </FormItem>
        <FormItem label="地址：" prop="address">
          <Input type="textarea" :rows="3" v-model="formOrgItem.address" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="联系方式：" prop="phone">
          <Input type="text" v-model="formOrgItem.phone" placeholder="请输入联系方式"></Input>
        </FormItem>

        <FormItem label="机构所在区域：" prop="adminDivisionId">
          <GetCity type="2" :changeOnSelect="changeOnSelect" :set-value="formOrgItem.adminDivisionId" @onChange="adminDivisionIdChange"></GetCity>
        </FormItem>
        <FormItem label="机构管辖范围：" prop="divisions">
          <GetCity type="2" :changeOnSelect="changeOnSelect" :set-value="formOrgItem.divisions" @onChange="divisionsChange"></GetCity>
        </FormItem>
        <FormItem>
          <Button type="primary" v-on:click="addSave">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import regular from '@/services/regular';
  export default {
    name: 'VillageAdd',
    props: ["orgItemData"],
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
        } else if(value <520000){
          callback(new Error('只能选择村，镇，街道'));
        }else {
          callback();
        }
      };
      const validateDivisions = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请选择机构管辖区域'));
        } else if(value <520000){
          callback(new Error('只能选择村，镇，街道'));
        }else {
          callback();
        }
      };
      return {
        changeOnSelect: false,
        isParent: false,
        title: "添加村站机构",
        orgObj: {
          name: '',
          code: '',
          parentName: "",
          adminDivisionId: "",
          address: '',
          phone: '',
          divisions: ''
        },
        labelInValue: true,
        loading1: false,
        parentList: [],
        formOrgItem: {
          divisions:''
        },
        ruleCustom: {
          name: [
            {required: true,max: 100, message: '组织名称不能为空且不能超过100个字', trigger: 'blur'}
          ],
          value: [
            {required: true, message: '社会统一信用代码/工商注册代码不能为空', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur', required: true}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ],
          adminDivisionId: [
            {required: true, validator: validateAdminDivisionId, trigger: 'blur'}
          ],
          divisions: [
            {required: true, validator: validateDivisions, trigger: 'blur'}
          ]
        },
      }
    },
    created: function () {
      let data = JSON.parse(this.session.get("orgObj"));
      this.isParent = data.isParent;
      if (data.id) {
        if (data.divisions.length) data.divisions = data.divisions[0];
        this.formOrgItem = data;
        this.title = "编辑机构(" + this.formOrgItem.name + ")";

      } else {
        this.formOrgItem = Object.assign(this.orgObj, data);
      }
    },
    methods: {
      divisionsChange: function (data) {
        if (data && data.length){
            this.formOrgItem.divisions=data[data.length - 1]
        }else{
          this.formOrgItem.divisions=""
        }
      },
      adminDivisionIdChange: function (data) {
        if (data && data.length){
          this.formOrgItem.adminDivisionId = data[data.length - 1];
        }else{
          this.formOrgItem.adminDivisionId=""
        }
      },
      addSave () {
        this.$refs.formOrgItem.validate((valid) => {
          var json = {
            name: this.formOrgItem.name,
            code: this.formOrgItem.code,
            orgType: 901,
            orgSubtype: 3007,
            adminDivisionId: parseInt(this.formOrgItem.adminDivisionId),
            address: this.formOrgItem.address,
            phone: parseInt(this.formOrgItem.phone),
            divisions: [this.formOrgItem.divisions]
          };
          if (valid) {
            if (!this.formOrgItem.id) {
              userServer.addOrg({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
                  this.$Message.success('添加成功!');
                } else {
                  this.$Message.error('添加失败失败!');
                }
              }, err => {
                this.$Message.error('添加失败失败!');
              })
            } else {
              json.id = this.formOrgItem.id;
              userServer.updateOrgInfo({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
                  this.$Message.success('编辑成功!');
                } else {
                  this.$Message.error('编辑失败失败!');
                }
              }, function (err) {
                this.$Message.error('编辑失败失败!');
              })
            }
          } else {
            this.$Message.error('表单验证失败!');
          }
        })

      }
    }
  }
</script>

<style lang='less'>

  .VillageAdd {

  .contentBox {
    background: #fff;
    padding: 20px;

  form {
    width: 400px;
  }

  }

  .detail > .ivu-col {
    margin: 10px 0;
  }

  }
</style>
