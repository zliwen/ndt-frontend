/**
* 贷款申请
* Created by chenchen on 2017/9/7.
*/

<template>
  <div class="CustomLoanApplyAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/banking/customloan-apply"> 贷款申请管理</BreadcrumbItem>
      <BreadcrumbItem>贷款申请</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Steps :current="current">
        <Step title="产品选择"></Step>
        <Step title="信息填写"></Step>
        <Step title="申请提交"></Step>
      </Steps>
      <div v-if="current==0" class="item item2">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="220">
          <FormItem label="意向金融机构：" prop="orgId">
            <RadioGroup v-model="formOrgItem.orgId" @on-change="orgChange">
              <Radio v-for="item in orgIdList" :key="item.id" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem label="意向产品：" prop="loanProductId">
            <RadioGroup v-model="formOrgItem.loanProductId">
              <Radio v-for="item in loanProductIdList" :key="item.id" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="next(1)">下一步</Button>
          </FormItem>
        </Form>
      </div>
      <div v-if="current==1" class="item item1">
        <Form ref="formOrgItem" :model="formOrgItem" :rules="ruleCustom" :label-width="120">
          <FormItem label="贷款用途：" prop="applyPurpose">
            <Select v-model="formOrgItem.applyPurpose" style="display: inline-block; width: 100px;">
              <Option v-for="item in applyPurposeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <FormItem label="贷款类型：" prop="guaranteeType">
            <CheckboxGroup v-model="formOrgItem.guaranteeType">
              <Checkbox v-for="item in guaranteeTypeList"  :key="item.id"
                        :label="item.id">{{item.value}}
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="贷款金额：" prop="code">
            <InputNumber :max="999999999" :min="1" v-model="formOrgItem.applyAmount"></InputNumber>
            <Select v-model="formOrgItem.applyAmountUnit" style="display: inline-block; width: 100px;">
              <Option v-for="item in applyAmountUnitList"  :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>

          <FormItem label="贷款期限：" prop="address">
            <InputNumber :max="99999" :min="1" v-model="formOrgItem.applyTerm"></InputNumber>
            <Select v-model="formOrgItem.applyTermUnit" style="display: inline-block; width: 100px;">
              <Option v-for="item in applyTermUnitList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <div>
            <span>抵质押物物</span>
            <i style="color: #ff9900; margin-right: 20px;">（可以从产权库中选择抵质押物，或者填写一个新的抵质押物，
              可以选择1-3个抵质押物）</i>
            <Button shape="circle" icon="plus-round" @click="selectGuarantee" style="margin-right: 20px;">从产权库中选择
            </Button>
            <Button shape="circle" type="primary" icon="plus-round" @click="addDanBao"></Button>
          </div>
          <ul class="danBaoList" style=" ">

            <li v-for="(item,index) in guaranteeTypeItemsList"  :key="index">
              <FormItem label="抵质押物名称：" prop="name">
                <Input :disabled="!!item.id" v-model="item.name" style="width: 400px;" placeholder="请输入抵质押物名称"></Input>
              </FormItem>
              <FormItem label="抵质押物类型：" prop="prType">
                <Select :disabled="!!item.id" v-model="item.prType" style="display: inline-block; width: 100px;">
                  <Option v-for="item in prTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                </Select>
              </FormItem>
              <FormItem label="抵质押物描述：" prop="remark">
                <Input :disabled="!!item.id" v-model="item.remark" style="width: 400px;" type="textarea" :rows="3"
                       placeholder="请输入抵质押物描述"></Input>
              </FormItem>
              <!--<FormItem label="抵质押物图片：" prop="name">
                <UploadImg
                           style="display: inline-block;"
                           :preview="true" :cut="true" :cutSize="logoSize"
                           @onSuccess="upImgSuccess">
                </UploadImg>

                <img src="obj" alt="" v-for="obj in item.imageUrls">
              </FormItem>-->
              <div class="addDanBao">
                <Button v-if="index" shape="circle" type="warning" icon="close-round"
                        @click="removeDanBao(index)"></Button>

              </div>
              <div class="addDanBao1">

              </div>
            </li>
          </ul>


          <FormItem>
            <Button type="primary" @click="next(0)">上一步</Button>
            <Button type="primary" @click="next(2)">下一步</Button>

          </FormItem>
        </Form>
      </div>

      <div v-if="current==2" class="item item3" style="text-align: center">
        <p style="margin: 50px 0;">申请已经提交，等待金融机构审核联系您</p>
        <Button type="primary" @click="goBack">返回列表</Button>
      </div>
    </div>
    <Modal
      v-model="addModal"
      :title="modalTitle"
      :loading="addLoading"
      :mask-closable="false"
      :styles="{top: '20px'}"
      width="1200">
      <GuaranteeSelect v-on:close="closeModal"></GuaranteeSelect>
      <div slot="footer" style="display: none;"></div>
    </Modal>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import productServer from 'rs/productServer';
  import loanApplyServer from 'rs/loanApplyServer';
  import frontendServer from 'rs/frontendServer';
  import GuaranteeSelect from '@/components/banking/GuaranteeSelect';
  export default {
    name: 'CustomLoanApplyAdd',
    data () {

      return {
        logoSize:[600,400],
        addModal: false,
        modalTitle: "选择抵质押物",
        addLoading: true,
        current: 0,
        ProductTree: {},
        guaranteeTypeItemsList: [{
          name: "",
          prType: '',
          remark: "",
          imageUrls: [],
          id: ""
        }],
        prTypeList: [],
        applyPurposeList: [],
        loanProductIdList: [],
        orgIdList: [],
        applyTermUnitList: [],
        applyAmountUnitList: [],
        guaranteeTypeList: [],
        formOrgItem: {
          name: null,
          guaranteeType: [],
          applyAmount: null,
          applyAmountUnit: 1,
          applyTerm: null,
          applyTermUnit: 1,
          guaranteeTypeItems: [
            {"id": 123453, "name": "我的房子产权666", "prType": 1, "imageUrls": "/1.png,/2.png", "remark": "这是我的房屋产权"},
            {"name": "我的房子产权777", "prType": 1, "imageUrls": "/1.png,/2.png", "remark": "这是我的房屋产权"}
          ],
          orgId: null,
          loanProductId: null
        },
        ruleCustom: {
          verificationCode: [
            {required: true, message: ' 验证码不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          passwordRepeat: [
            {required: true, message: '重复密码不能为空', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'}
          ]
        },
      }
    },
    created: function () {
      this.dictList();
      this.getOrgList();
    },
    components: {
      'GuaranteeSelect': GuaranteeSelect
    },
    methods: {
      upImgSuccess(data){
        if (response.errorCode == 0) {
          this.formOrgItem.logoImageUrl = response.url;
        }
      },
      closeModal(data){
        data = data.filter(item => {
          if (item.imageUrls) item.imageUrls = item.imageUrls.split(",");
          return item
        });
        let arr = [];
        this.guaranteeTypeItemsList.forEach(item => {
          if (!item.id) arr.push(item);
        });
        this.guaranteeTypeItemsList = (data.concat(arr)).slice(0, 3);

        this.addModal = false;
      },
      selectGuarantee(){
        this.addModal = true
      },
      removeDanBao(index){
        this.guaranteeTypeItemsList.splice(index, 1)
      },
      addDanBao(){
        this.guaranteeTypeItemsList.push(
          {
            name: "",
            prType: '',
            remark: "",
            imageUrls: [],
            id: ""
          }
        )
      },
      goBack(){
        this.$router.push({name: 'CustomLoanApply'})
      },
      add(){
        this.$refs.formOrgItem.validate((valid) => {
          var json = {
            orgId: this.formOrgItem.orgId,
            loanProductId: this.formOrgItem.loanProductId,
            applyPurpose: this.formOrgItem.applyPurpose,
            applyAmount: this.formOrgItem.applyAmount,
            applyAmountUnit: this.formOrgItem.applyAmountUnit,
            applyTerm: this.formOrgItem.applyTerm,
            applyTermUnit: this.formOrgItem.applyTermUnit,
            guaranteeType: this.formOrgItem.guaranteeType,
            guaranteeTypeItems: [],
            deadline: this.formOrgItem.deadline
          };

          this.guaranteeTypeItemsList.forEach(item => {
            if (item.name) {
              let minJson = {
                id: item.id ? item.id : null,
                name: item.name,
                prType: item.prType,
                imageUrls: "",
                remark: item.remark
              };
              if (item.imageUrls.length) {
                let str = "";
                item.imageUrls.forEach((url, index) => {
                  let dh = "";
                  if (index > 0) dh = ",";
                  str = dh + url;
                });
                minJson.imageUrls = str;
              }
              json.guaranteeTypeItems.push(minJson)
            }
          });
          if (valid) {
            loanApplyServer.add({}, json, data => {

              if (data.errorCode == '0') {
                //this.$refs.formOrgItem.resetFields();
                this.current = 2;
                this.$Message.success('添加成功!');
              } else {
                this.$Message.error('添加失败失败!');
              }
            }, err => {
              this.$Message.error('添加失败失败!');
            })
          } else {
            //this.addLoading = false;
            this.$Message.error('表单验证失败!');
          }
        })


      },
      next (key) {
        if (key == 2) {
          this.add();
          return
        }
        if (key == 1&&(!this.formOrgItem.orgId||!this.formOrgItem.loanProductId)) {
          this.$Message.error('请选择产品!');
          return
        }
        this.current = key;
      },
      dictList(){
        this.getCodeTable('21', data => {
          this.applyPurposeList = data;
        });
        this.getCodeTable('28', data => {
          this.guaranteeTypeList = data;
        });
        this.getCodeTable('22', data => {
          this.applyAmountUnitList = data;
        });
        this.getCodeTable('23', data => {
          this.applyTermUnitList = data;
        });
        this.getCodeTable('25', data => {
          this.prTypeList = data;
        });
      },
      getOrgList(){
        frontendServer.orgFind({
          params3: 1,
          params4: 10,
        }, {
          orgType: 902
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) this.orgIdList = response.data.pageData;
          } else {
            this.$Message.error('获取数据失败!');
          }
        }, err => {
          this.loading = false;
        })
      },
      orgChange(key){
        this.getOrgProductList(key)
      },
      getOrgProductList(key){
        if (this.ProductTree[key]) {
          this.loanProductIdList = this.ProductTree[key];
          return;
        }
        frontendServer.getProductListForOwn({
          params3: 1,
          params4: 1000,
        }, {
          orgId: key
        }, response => {
          this.loading = false;
          if (response.errorCode == 0) {
            if (response.data) {
              this.ProductTree[key] = this.loanProductIdList = response.data.pageData;
            }
          } else {
            this.$Message.error('获取数据失败!');
          }
        }, err => {
          this.loading = false;
        })
      }

    }
  }
</script>

<style scoped lang='less'>
  .CustomLoanApplyAdd {

  .danBaoList > li {
    position: relative;
    padding: 20px;
    margin: 10px 0;
    border: 2px dashed #ededed;
    width: 750px;
  }

  .addDanBao, .addDanBao1 {
    text-align: left;
    position: absolute;
    top: -10px;
    right: -10px;

  }

  .addDanBao1 {
    top: 40px;
  }

  .contentBox {
    background: #fff;
    padding: 20px;
  }

  .item {
    padding: 40px 0;

    margin-left: 100px;
  }

  }


</style>
