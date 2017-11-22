/**
* Created by zhaowei on 2017/10/27.
*/
<template>
  <div class="bankingEdit">
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
          <GetCity :set-value="formOrgItem.adminDivisionId" @onChange="adminDivisionIdChange"></GetCity>
        </FormItem>
        <FormItem label="机构管辖范围：" prop="divisions" style="margin-right:-40px;">
          <GetCitys :set-values="formOrgItem.divisionss" @onChange="divisionsChange"></GetCitys>
        </FormItem>

        <FormItem class="logo" label="LOGO：" prop="logo">
          <span v-if="formOrgItem.parentId">
             <span>是否沿用上级</span>
            <i-switch v-model="isLogoParent" style="display: inline-block;"></i-switch>
          </span>
          <img class="imgl" v-if="isLogoParent" :src="parentObj.logoImageUrl" alt="">
          <UploadImg v-if="!isLogoParent"
                     style="display: inline-block;"
                     :preview="true" :cut="true" :cutSize="logoSize"
                     v-model="formOrgItem.logoImageUrl"></UploadImg>
        </FormItem>
        <FormItem label="机构描述：" prop="remark">
          <span v-if="formOrgItem.parentId">
            <span>是否沿用上级</span>
            <i-switch v-model="isRemarkParent" @on-change="remarkParentChange()"></i-switch>
          </span>
          <Input v-if="!isRemarkParent||formOrgItem.parentId" :rows="3"
                 type="textarea" v-model="formOrgItem.remark"
                 placeholder="请输入机构描述"></Input>
        </FormItem>
        <FormItem label="允许创建子机构：" prop="isLeaf">
          <i-switch v-model="formOrgItem.isLeaf"></i-switch>
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
  import orgServer from 'rs/org';
  import regular from '@/services/regular';
  export default {
    name: 'bankingEdit',
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
        } else {
          callback();
        }
      };
      const validateDivisions = (rule, value, callback) => {
        if (!value.length) {
          callback(new Error('请选择机构管辖区域'));
        } else {
          callback();
        }
      };

      return {
        orgSubtypesList: [
          {"id": 3004, "key": 4, "typeId": 30, "typeName": "机构子类", "value": "银行"},
          {"id": 3005, "key": 5, "typeId": 30, "typeName": "机构子类", "value": "保险"},
          {"id": 3006, "key": 6, "typeId": 30, "typeName": "机构子类", "value": "担保"}
        ],
        parentObj:{},
        title: "添加机构",
        orgObj: {
          orgSubtype: "",
          name: '',
          parentId: "",
          parentName: "",
          adminDivisionId: "",
          address: '',
          logoImageUrl: "",
          phone: '',
          remark: "",
          divisions: [],
          isLeaf: true
        },
        parentOrgSubtype: 0,
        labelInValue: true,
        isLogoParent: false,
        isRemarkParent: false,
        loading1: false,
        logoSize: [480, 200],
        parentList: [],
        formOrgItem: {},
        ruleCustom: {
          orgSubtype: [
            {required: true, message: '金融机构类型不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, max: 100, message: '组织名称不能为空且不能超过100个字', trigger: 'blur'}
          ],
          code: [
            {required: true, max: 30, message: '机构代码必填且不能超过30位', trigger: 'blur'}
          ],
          value: [
            {required: true, max: 30, message: '社会统一信用代码/工商注册代码必填且不能超过30位', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur', required: true}
          ],
          address: [
            {required: true, max: 125, message: '地址不能为空且不能超过125位', trigger: 'blur'}
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
      this.findById(this.session.get("orgId"));
    },
    methods: {
      remarkParentChange(k){
        if(this.isRemarkParent){
          this.formOrgItem.remark=this.parentObj.remark;
        }else {
          this.formOrgItem.remark="";
        }
      },
      findById(id,k){
        orgServer.findById({id: id}, {}, response => {
          let data = response.data;
          this.parentOrgSubtype = Number(data.orgSubtype);
          if (data.id) {
            this.formOrgItem = data;
            this.formOrgItem.isLeaf=!this.formOrgItem.isLeaf;
            this.isLogoParent = this.isRemarkParent = false;
            if (this.formOrgItem.divisions.length) this.formOrgItem.divisionss = this.formOrgItem.divisions;

            if (this.formOrgItem.orgSubtype) {
              this.orgSubtypesList.forEach(item => {
                if (item.id == this.formOrgItem.orgSubtype) {
                  this.formOrgItem.orgSubtype = item.value;
                  this.getParentOrgList(item)
                }
              })
            }
            this.isLogoParent=data.imageFromParent;
            this.isRemarkParent=data.remarkFromParent;
        }})
      },
      orgSubtypeChange(data){
        this.orgSubtypesList.forEach(item => {
          this.formOrgItem.parentId = "";
          if (item.value == data && !item.list) {
            this.getParentOrgList(item)
          }
          if (item.value == data && item.list) {
            this.parentList = item.list;
          }
        })

      },
      divisionsChange: function (data) {
        this.formOrgItem.divisions = [];
        data.forEach(item => {
          if (!item.value) return;
          this.formOrgItem.divisions.push(item.value[item.value.length - 1])
        });
      },
      adminDivisionIdChange: function (data) {
        if (data && data.length){
            this.formOrgItem.adminDivisionId = data[data.length - 1];
        }else{
          this.formOrgItem.adminDivisionId =""
        }
      },
      upImgSuccess(response){
        if (response.errorCode == 0) {
          this.formOrgItem.logoImageUrl = response.url;
        }
      },
      getParentOrgList (item) {
        this.loading1 = true;
        this.parentList = [];
        userServer.findOrgList({
          params3: 1,
          params4: 10,
        }, {
          orgType: 902,
          orgSubtypes: [item.id]
        }, response => {
          this.loading1 = false;
          if (response.errorCode == 0) {
            let arr=[];
            response.data.pageData.forEach(item=>{
              if(!item.isLeaf)arr.push(item);
            });
            item.list = this.parentList = arr;
            // this.parentList.unshift({id: "#%#", name: "--请选择--"});
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err => {
          this.loading1 = false;
        });
      },
      addSave () {
        this.$refs.formOrgItem.validate((valid) => {
          let orgSubtype = null;
          if (this.formOrgItem.orgSubtype) {
            this.orgSubtypesList.forEach(item => {
              if (this.formOrgItem.orgSubtype == item.value) orgSubtype = item.id;
            })
          }
          var json = {
            "name": this.formOrgItem.name,
            "code": this.formOrgItem.code,
            "parentId": !this.formOrgItem.parentId? null : this.formOrgItem.parentId,
            "orgType": 902,
            orgSubtype: this.parentOrgSubtype,
            "adminDivisionId": this.formOrgItem.adminDivisionId,
            "address": this.formOrgItem.address,
            "logoImageUrl": this.isLogoParent ? "" : this.formOrgItem.logoImageUrl,
            "imageFromParent": this.isLogoParent,
            "phone": this.formOrgItem.phone,
            "remark": this.isRemarkParent ? "" : this.formOrgItem.remark,
            "remarkFromParent": this.isRemarkParent,
            "divisions": this.formOrgItem.divisions,
            "isLeaf": !this.formOrgItem.isLeaf
          };
          if (valid) {
            if (!this.formOrgItem.id) {
              userServer.addOrg({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
                }else if(data.errorCode =="9999"){
                  if(data.data.indexOf("Code:")!=-1){
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
              }, err => {
                this.$Message.error('添加失败失败!');
              })
            } else {
              json.id = this.formOrgItem.id;
              userServer.updateOrgInfo({}, json, data => {
                if (data.errorCode == '0') {
                  this.$router.go(-1);
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

  .bankingEdit {

  .contentBox {
    background: #fff;
    padding: 20px;

  form {
    width: 400px;
  }

  }

  .logo > label {
    line-height: 100px;
    padding-top: 0;
    padding-bottom: 0;

  }
  .logo{
  span,img,div{vertical-align: middle;}
  .imgl{ height: 100px; width: 100px;}
  }

  .detail > .ivu-col {
    margin: 10px 0;
  }

  }
</style>

