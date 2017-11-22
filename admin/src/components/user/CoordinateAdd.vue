/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="CoordinateAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/coordinate">联席会议管理</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="140">
        <FormItem label="联席会议名称：" prop="name">
          <Input v-model="formOrgItem.name" placeholder="请输入联席会议"></Input>
        </FormItem>
        <FormItem label="联席会议管辖范围：" prop="divisions" style="margin-right:-40px;">
          <GetCity :set-value="formOrgItem.divisions" @onChange="divisionsChange"></GetCity>
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
    name: 'CoordinateAdd',
    props: ["orgItemData"],
    data () {
      const validateDivisions = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择管辖区域'));
        } else {
          callback();
        }
      };
      return {
        title:"添加联席会议",
        orgObj: {
          name: '',
          divisions: ''
        },
        labelInValue: true,
        loading1: false,
        parentList: [],
        formOrgItem: {},
        ruleCustom: {
          name: [
            {required: true,max: 100,  message: '请输入联席会议名称且不能超过100个字', trigger: 'blur'}
          ],
          divisions: [
            {validator: validateDivisions, trigger: 'blur', required: true}
          ]
        },
      }
    },
    created: function () {
      let data = JSON.parse(this.session.get("orgObj"));
      this.isParent = data.isParent;
      if (data.id) {
        this.formOrgItem = data;
        this.title = "编辑政府机构(" + this.formOrgItem.name + ")";
        if (this.formOrgItem.divisions.length) this.formOrgItem.divisions = this.formOrgItem.divisions[0];
      } else {
        this.formOrgItem = Object.assign(this.orgObj, data);
      }
    },
    methods: {
      divisionsChange: function (data) {
        if (data && data.length){
            this.formOrgItem.divisions = data[data.length - 1];
        }else{
          this.formOrgItem.divisions =""
        }
      },
      addSave () {
        this.$refs.formOrgItem.validate((valid) => {
          var json = {
            name: this.formOrgItem.name,
            orgType: 901,
            orgSubtype: 3002,
            code:(new Date())-1+Math.floor(Math.random() * (100 - 1) + 1),
            divisions: [this.formOrgItem.divisions]
          };
          if (valid) {
            if (!this.formOrgItem.id) {
              userServer.addOrg({}, json, data => {
                if (data.errorCode == '0') {
                  this.$Message.success('添加成功!');
                  this.$router.go(-1);
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

  .CoordinateAdd {

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
