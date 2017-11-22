/**
* Created by zhaowei on 2017/9/26.
*/

<template>
  <div class="applyFor">
    <h1 style="margin: 46px 0 26px;">
      <span style="font-size:20px; color: #000;">借款流程</span>
      <span style="display: inline-block; padding-left: 20px; border-left: 1px solid #ededed;
color: #999; margin-left: 20px; font-size: 14px;">只需三步 轻松借款</span>
    </h1>
    <img style="width:100%;" src="../../assets/images/applyFor09.jpg" alt="">
    <div class="mainBox">
      <h2>您正在申请的贷款服务</h2>
      <Row>
        <Col span="12" class="left">
        <img :src="data.logoImageUrl" alt=""/>
        <div>
          <h3 class="overflow">{{data.name}}</h3>
          <p class="overflow">{{data.orgName}}</p>
          <div class="bq overflow">
            <span v-for="item in data.labels" :key="item.id">{{item|codeName}}</span>
          </div>
        </div>
        </Col>
        <Col span="12">
        <ul class="ul">
          <li v-if="userObj.userType!=203">
            <img src="../../assets/images/applyFor10.png" alt="">
            <span>申请主体</span>
            <i>{{userObj.name}}</i>
          </li>
          <li v-if="userObj.userType!=203">
            <img src="../../assets/images/applyFor11.png" alt="">
            <span>身份证号码</span>
            <i>{{userObj.identityId}}</i>
          </li>
          <li v-if="userObj.userType!=203">
            <img src="../../assets/images/applyFor12.png" alt="">
            <span>地址</span>
            <i>{{userObj.adminDivisionName}}</i>
          </li>
          <li v-if="userObj.userType==203">
            <img src="../../assets/images/applyFor10.png" alt="">
            <span>申请主体</span>
            <i>{{companyObj.name}}</i>
          </li>
          <li v-if="userObj.userType==203">
            <img src="../../assets/images/applyFor11.png" alt="">
            <span>组织机构代码</span>
            <i>{{companyObj.code}}</i>
          </li>
          <li v-if="userObj.userType==203">
            <img src="../../assets/images/applyFor10.png" alt="">
            <span>联系人</span>
            <i>{{companyObj.legalPerson}}</i>
          </li>
          <li>
            <img src="../../assets/images/applyFor13.png" alt="">
            <span>联系电话</span>
            <i>{{userObj.mobile}}</i>
          </li>

        </ul>
        </Col>
      </Row>
      <Form class="formBox" ref="formValidate" :model="formValidate"
            :rules="ruleValidate" :label-width="180">
        <FormItem label="贷款金额" prop="applyAmount">
          <InputNumber
            :max="Math.min(data.maxAmount,999999999)" :min="1"
                       v-model="formValidate.applyAmount" placeholder="请输入借款金额" style="width:300px;">
          </InputNumber>
          <b class="dw">元</b>
          <span style="font-size: 12px; margin-left: 10px; color: #999;">最大额度：</span>
          <span style="font-size: 12px; color: #999;">&nbsp;{{data.maxAmount}}&nbsp;元</span>
          <p><b>{{formValidate.applyAmount|formatterMoney}}</b></p>
        </FormItem>
        <FormItem label="贷款期限" prop="applyTerm">
          <InputNumber :max="data.maxTerm" :min="data.mixTerm"
                       v-model="formValidate.applyTerm" placeholder="请输入借款金额" style="width:300px;">
          </InputNumber>
          <b class="dw">月</b>
          <span style="font-size: 12px; margin-left: 10px; color: #999;">最长期限：</span>
          <span style="font-size: 12px; color: #999;">&nbsp;{{data.maxTerm}}&nbsp;月</span>
        </FormItem>
        <FormItem label="贷款方式" prop="guaranteeType">
          <span class="checkbox" v-for="(item,index) in guaranteeTypeList" :key="item.id" v-text="item.value" @click="check(item,index)" :class="{checked:item.checked}"></span>
        </FormItem>
        <FormItem label="贷款用途" prop="applyPurpose">
          <Select placeholder="请选择贷款用途" v-model="formValidate.applyPurpose"
                  >
            <Option v-for="item in applyPurposeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="formValidate.guaranteeType[0]&&formValidate.guaranteeType[0] !== 2801" label="质押/担保物描述" prop="guaranteeTypeItems">
          <Input type="textarea" :rows="3" placeholder="请输入担保物描述" style="width: 478px"
                 v-model="guaranteeTypeItems"/>
        </FormItem>
        <div class="zx" @click="modal=true">
          <img src="../../assets/images/applyFor15.png" alt="">
          <span>提交申请即表示您已阅读并同意</span>
          <b style="color: #ff762b;">《征信协议》</b>
        </div>
        <FormItem class="last">
          <Button class="btn" type="primary" :loading="loading"
                  @click="submit">
            <span v-if="!loading">提交申请</span>
            <span v-else>提交中...</span>
          </Button>
        </FormItem>
      </Form>
    </div>
    <Modal
      v-model="modal"
      title="征信协议"
      width="760">
      <div style="padding: 0 20px; font-size: 16px;">
        <h2 style="font-size: 30px; text-align: center;">声 明</h2>
        <p>尊敬的“农贷通”注册用户：</p>
        <div style="text-indent: 2em; margin: 20px 0; line-height: 30px;">
          为给用户提供优质、高效的服务，确保用户信贷、产业需求通过平台得到准确、快速的响应，依照中华人民共和国相关法律法规规定，需要用户特别授权“农贷通”平台在用户账号存续期间归集、整理、保存、加工和向其他业务关联使用方提供注册用户相关信息（包括但不限于身份识别、居住地址等个人基本信息；在对外经济交往中形成的信贷交易信息；“农贷通”村级服务站或相关行政事业单位、金融机构、其他部门在业务或职权范围内合法收集并上传的个人或企业信息）。业务关联使用方承诺将严格依法、审慎使用注册用户以上信息。
        </div>
      </div>
      <div slot="footer">
        <Button type="primary"  size="large" @click="cancel">同意协议</Button>
      </div>
    </Modal>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import loanProductServer from "rs/loanProduct"
  import loanApplyServer from "rs/loanApply"
  import personServer from "rs/person"
  import companyServer from "rs/company"


  export default {
    name: 'applyFor',
    data () {
      const validateApplyAmount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入申请金额!'));
        }else if(value ==0){
          callback(new Error('请输入有效贷款金额'));
        } else {
          callback();
        }
      };
      const validateApplyTerm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入申请期限!'));
        }else if(value ==0){
          callback(new Error('请输入有效申请期限'));
        } else {
          callback();
        }
      };
      const validateApplyPurpose = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择贷款用途!'));
        } else{
          callback();
        }
      };
      const validateGuaranteeType = (rule, value, callback) => {
        if (value.length==0) {
          callback(new Error('请选择贷款方式!'));
        } else {
          callback();
        }
      };
      const validateGuaranteeTypeItems = (rule, value, callback) => {
        if (this.userType==203&&value=='') {
          callback(new Error('请输入担保物描述!'));
        } else {
          callback();
        }
      };


      return {
        guaranteeTypeItems:"",
        userType:this.session.get('userType'),
        companyObj:{},
        modal:false,
        loading:false,
        userObj:JSON.parse(this.session.get('userObj'))||{},
        data: {},
        guaranteeTypeList: [],
        applyPurposeList: [],
        formValidate: {
          applyAmount: 0,
          applyTerm: 0,
          guaranteeType: [],
          applyPurpose: ''
        },
        ruleValidate: {
          applyAmount: [
            {required: true, validator: validateApplyAmount, trigger: 'blur'}
          ],
          applyTerm: [
            {required: true, validator: validateApplyTerm, trigger: 'blur'}
          ],
          guaranteeType: [
            {required: true, validator: validateGuaranteeType, trigger: 'change'}
          ],
          applyPurpose: [
            {required: true, validator: validateApplyPurpose, trigger: 'change'}
          ]
          /*guaranteeTypeItems:[
            {required: true, validator: validateGuaranteeTypeItems, trigger: 'blur'}
          ]*/
        }
      }
    },
    created: function () {
      this.findById();
    },
    methods: {
      check(item,index){
        let flag = item.checked;
        item.checked = !item.checked;
        if(item.checked){
          this.guaranteeTypeList.forEach(obj=>{
              if(obj != item){
                obj.checked = false;
              }
          });
        }
        let array = this.formValidate.guaranteeType;
        array.length = 0;
        if(item.checked){
          array.push(item.id);
        }

        // if (flag)array = array.filter(l => l!== item.id);
        // else array.push(item.id);
        this.$refs.formValidate.validateField("guaranteeType");
      },
      findById: function () {
        loanProductServer.findById({params: {id: this.$route.query.id}}, responce => {
            let unit = responce.data.maxAmountUnitName==="万元"?10000:1;
            let timeUnit = responce.data.maxTermUnitName==="年"?12:1;
            let min = responce.data.mixAmount;
            let max = responce.data.maxAmount;
            let maxTerm = responce.data.maxTerm;
            responce.data.mixAmount = min*unit;
            responce.data.maxAmount = max*unit;
            responce.data.maxTerm = maxTerm*timeUnit;
            this.data = responce.data;
            this.formValidate.applyAmount = this.data.mixAmount;
            this.formValidate.applyTerm = this.data.mixTerm;
            this.getCodeTable('28', data => {
              let arr=[];
              this.data.loanTypeNames.forEach(obj=>{
                data.forEach(item=>{
                    if(obj==item.value) {
                      item.checked = false;
                      arr.push(item)
                    }
                });
              });
              this.guaranteeTypeList = arr;
            });
          }
        );
        personServer.findByUserId({},response=>{
            this.userObj=response.data;
        });
        if(this.userType==203){
          companyServer.detail({params:{params4:this.session.get('userId')}},response=>{
            this.companyObj=response.data;
          })
        }
        this.getCodeTable('21', data => {
          this.applyPurposeList = data;
        });

      },
      submit: function () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            let json = this.formValidate;
            json.orgId=this.data.orgId;
            json.loanProductId=this.data.id;
            json.applyAmountUnit = 2201;
            json.applyTermUnit=2302;
            json.sourceId=7001;
            if(this.formValidate.guaranteeType[0] !== 2801){
              json.guaranteeTypeItems=[
                {
                  "name": "担保/抵押/质押物",
                  "remark": this.guaranteeTypeItems
                }
              ];
            }

            this.loading=true;
            loanApplyServer.add({
              data: json
            }, response => {
              this.loading=false;
              this.$refs.formValidate.resetFields();
              let that=this;
              this.$Modal.confirm({
                title: '申请成功',
                content: '<p>是否跳转到我的贷款记录？</p>',
                onOk: () => {
                  this.$router.push({name:this.$route.fullPath.includes('/xian')?"xianMeLoan":"meLoan"})
                },
                onCancel: () => {

                }
              });


            },err=>{
              this.loading=false;
            })

          } else {
            //this.$Message.error('表单验证失败!');
          }
        });

      },
      cancel:function () {
          this.modal=false
      }
    }
  }
</script>

<style lang='less'>
  .applyFor { width: 1200px; margin: 0 auto;
    .ivu-input-number input{
      padding-right: 30px;
      font-size: 14px;
    }
    .dw{ display: inline-block; width: 40px; margin-left: 10px; font-size: 16px;}
    h1{b,span{vertical-align: middle;}}
    .mainBox{ width: 1000px; margin: 50px auto 100px; box-shadow: 0 0 12px rgba(0,0,0,0.08);border-radius: 6px;padding-bottom: 100px;
      .formBox{ width: 790px;margin: 100px auto 0;
        span.checkbox{
          display: inline-block;
          height:40px;
          font-size: 14px;
          padding-left: 20px;
          padding-right: 20px;
          line-height: 40px;
          border:1px solid #dddee1;
          background-color: #f9f9f9;
          border-radius: 2px;
          margin-right: 26px;
          cursor: pointer;
          &:nth-last-of-type(1){
            margin-right: 0;
          }
          &.checked{
            background-image: url("../../assets/images/checked.png") ;
            background-repeat: no-repeat;
            background-position: right top;
            border-color: #ff762b;
          }
        }
        .ivu-form-item{
          height: 40px;
          line-height: 40px;
          margin-bottom: 50px;
          textarea{
            height: 100%;
          }
          &.last{
            margin-bottom: 0;
            height: 60px;
          }
          .ivu-form-item-label{
            height: 40px;
            line-height: 40px;
            padding:0 30px 0 0 ;
          }
          .ivu-form-item-error-tip{
            margin-top: 10px;
          }
        }
        .ivu-form-item-label{font-size: 16px; line-height: 40px;}
        .ivu-input-number{ height:40px; line-height: 40px; font-size: 16px; width:400px;
          .ivu-input-number-input-wrap{ height: 40px;}
          a{ height: 50%;
            span{ margin-top: 8px;}
          }
        }
        .ivu-checkbox-group{
          label{ line-height: 40px; font-size: 16px;}
        }
        .ivu-select{ height: 40px; font-size: 20px; width: 300px !important;
          .ivu-select-selection{ height: 40px;}
          .ivu-select-placeholder{ height: 40px; line-height: 40px;  font-size: 14px;}
          .ivu-select-selected-value{ height: 40px;line-height: 40px; font-size: 14px;}
        }
        .btn{ height: 60px; width: 478px; font-size: 20px;
          background: #fff; color: #ff933d;
          &:hover{
            background-color: #ff762b;
            color: #fff;
          }
        }
        .zx{ cursor: pointer; margin-left: 160px;width: 320px;margin-bottom: 50px;font-size: 14px;
          b,i,span,img{vertical-align: middle;}
          img{
            margin-right: 10px;
            width: 12px;
          }
        }
      }
      h2{ height: 60px; font-size: 20px; color: #fff;border-radius: 6px 6px 0 0;text-align: center;
        background: url("../../assets/images/financial13.png") repeat-x; line-height: 60px;
      }
      .left{ padding: 50px 0 0 30px; height: 200px; position: relative; color:#999;
        img{ height: 100px; width: 100px;float: left}
        >div{padding-left: 120px;padding-right: 10px}
        h3{ font-size: 24px; color: #000; line-height: 24px;padding-bottom: 12px}
        .bq{ height: 20px; overflow: hidden; margin-top:26px;
          span{  display: inline-block; height:20px;  border-radius: 20px;min-width: 70px;
            padding: 0 10px;
            background: #f7f7f7; border: 1px solid #c5c5c5; color: #999; line-height: 20px;
            text-align: center;
            margin-right:10px;
            &:nth-last-of-type(1){
              margin-right: 0;
            }
          }
        }
        border-bottom: 1px solid #ededed;
      }
      .ul{
        border-left: 1px solid #ededed;
        line-height: 50px;
        li{ height: 50px; border-bottom: 1px solid #ededed; padding-left:50px;
          padding-right:50px;
          font-size:16px; color:#999;
          span,img,b,i{ vertical-align: middle;}
          i{ font-style: normal; color: #000; float: right;}
          img{
            margin-right: 8px;
            position: relative;
            top:-2px;
          }
        }
      }

    }
  }
</style>
