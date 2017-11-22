/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="VillageFarmerAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/village/village-farmer"> 农户管理</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Tabs value="name1">
        <TabPane label="基础信息" name="name1">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              农业信用基础信息
            </p>
            <Form ref="villagePersonalBaseinfo" :model="villagePersonalBaseinfo" :rules="formBaseCustom" :label-width="160">
              <Row>
                <Col span="8">
                    <FormItem label="姓名：" prop="name" :label-width="120">
                      <label>{{villagePersonalBaseinfo.name}}</label>
                    </FormItem>
                    <FormItem label="联系电话：" prop="phone"  :label-width="120">
                      <label>{{villagePersonalBaseinfo.phone}}</label>
                    </FormItem>
                    <FormItem label="证件类型："  :label-width="120">
                      <label>{{villagePersonalBaseinfo.papersType|codeName}}</label>
                    </FormItem>
                    <FormItem label="证件号码：" prop="papersId"  :label-width="120">
                      <label>{{villagePersonalBaseinfo.papersId}}</label>
                    </FormItem>
                </Col>
                <Col span="10">

                  <FormItem label="出生年月：" :label-width="140">
                      <label>{{villagePersonalBaseinfo.birth}}</label>
                  </FormItem>
                  <FormItem label="性别："  :label-width="140">
                      <label>{{villagePersonalBaseinfo.gender|codeName}}</label>
                  </FormItem>
                  <FormItem label="婚姻状况："  :label-width="140">
                      <label>{{villagePersonalBaseinfo.maritalStatus|codeName}}</label>
                  </FormItem>
                  <FormItem label="农业职业经理人等级：" :label-width="140" >
                      <label>{{villagePersonalBaseinfo.managerLevel|codeName}}</label>
                  </FormItem>
                </Col>

                <Col span="6">
                  <FormItem label="生产经营类型："  :label-width="120">
                      <label>{{villagePersonalBaseinfo.workingType|codeName}}</label>
                  </FormItem>
                  <FormItem label="流转经营面积(亩)："  :label-width="120">
                      <label>{{villagePersonalBaseinfo.operatingArea}}</label>
                  </FormItem>
                  <FormItem label="养殖数量(只/头)："  :label-width="120">
                      <label>{{villagePersonalBaseinfo.breedingNumber}}</label>
                  </FormItem>
                  <FormItem label="农机数量(台)："  :label-width="120">
                      <label>{{villagePersonalBaseinfo.machineNumber}}</label>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="所在区域：" :label-width="120">
                    <GetCity :set-value="villagePersonalBaseinfo.divisionId" :disabled="true"
                           @onChange="adminDivisionIdChange"
                           :changeOnSelect="changeOnSelect"
                            ></GetCity>
                  </FormItem>
                </Col>
                <Col span="16">
                  <FormItem label="居住地址：" :label-width="140">
                    <Input type="textarea" v-model="villagePersonalBaseinfo.address" readonly
                          :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入居住地址"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              家庭房产信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="8">
                      <span>房屋地址</span>
                    </Col>
                    <Col span="6">
                      <span>房屋性质</span>
                    </Col>
                    <Col span="5">
                      <span>构建年月</span>
                    </Col>
                    <Col span="4">
                     <span>建筑面积</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalHouse" :key="index">
                <Row>
                    <Col span="8">
                      <label>{{item.houseAddress}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      <label>{{item.houseType|codeName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="5">
                      <label>{{item.houseTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="4">
                      <label>{{item.floorage}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              家庭机动车信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="8">
                      <span>车牌号</span>
                    </Col>
                    <Col span="8">
                      <span>购买时间</span>
                    </Col>
                    <Col span="7">
                      <span>购买价格</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCarinfo" :key="index">
                <Row>
                    <Col span="8">
                      <label>{{item.carId}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.buyTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="7">
                      <label>{{item.buyAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              获得相关权证情况
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="4">
                      <span>权证名称</span>
                    </Col>
                    <Col span="4">
                      <span>描述</span>
                    </Col>
                    <Col span="4">
                      <span>权证编号</span>
                    </Col>
                    <Col span="4">
                      <span>发放时间</span>
                    </Col>
                    <Col span="1">
                      <span>是否抵押</span>
                    </Col>
                    <Col span="3">
                      <span>抵押时间</span>
                    </Col>
                    <Col span="3">
                      <span>抵押金额</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalWarrantinfo" :key="index">
                <Row>
                    <Col span="4">
                      <label>{{item.warrantName|codeName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="4">
                      <label>{{item.warrantRemark}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="4">
                      <label>{{item.warrantId}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="4">
                      <label>{{item.getTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                      <i-switch v-model="item.isPledge" disabled>
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                      <!-- <Select v-model=''>
                          <Option :value="1" >是</Option>
                          <Option :value="0" >否</Option>
                          <Switch v-model="switch1" @on-change="change"></Switch>
                      </Select> -->
                    </Col>
                    <Col span="3">
                      <label>{{item.pledgeTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="3">
                      <label>{{item.pledgeAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          <!-- <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              相关权证图片
            </p>
          </Card> -->
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              生产资料信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="8">
                      <span>养殖/种植品种</span>
                    </Col>
                    <Col span="8">
                      <span>数量/面积</span>
                    </Col>
                    <Col span="7">
                      <span>上半年经营收入(元)</span>
                    </Col>
                    <!-- <Col span="1">
                    </Col> -->
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalProductioninfo" :key="index">
                <Row>
                    <Col span="8">
                      <label>{{item.cultivatedVarieties}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.cultivatedArea}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="7">
                      <label>{{item.firstHalfRevenue}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <!-- <Col span="1">
                    </Col> -->
                </Row>
              </li>
            </ul>
          </Card> 
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              生产及运输设备
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="8">
                      <span>设备种类</span>
                    </Col>
                    <Col span="8">
                      <span>购入价格</span>
                    </Col>
                    <Col span="7">
                      <span>购入年月</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalEquipment" :key="index">
                <Row>
                    <Col span="8">
                      <label>{{item.equipmentType}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.equipmentAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="7">
                      <label>{{item.buyEquipmentTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              政策性保险参保信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>参加保险类型</span>
                    </Col>
                    <Col span="6">
                      <span>保险金额(元)</span>
                    </Col>
                    <Col span="6">
                      <span>参保日期</span>
                    </Col>
                    <Col span="5">
                      <span>参保到期日期</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalInsured" :key="index">
                <Row>
                    <Col span="6">
                      <label>{{item.insuredType}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      <label>{{item.insuredAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      
                      <label>{{item.insuredStartTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="5">
                      <label>{{item.insuredEndTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
             信用称号信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="12">
                      <span>取得信用称号情况</span>
                    </Col>
                    <Col span="7">
                     	<span>取得信用称号年度</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCreditTitle" :key="index">
                <Row>
                    <Col span="12">
                      <label>{{item.titleRemark}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="7">
                      <label>{{item.titleYear}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
        </TabPane>
        <TabPane label="辅助信息" name="name2">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              用工信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>用工人数</span>
                    </Col>
                    <Col span="8">
                      <span>用工时间</span>
                    </Col>
                    <Col span="8">
                      <span>用工工资</span>
                    </Col>
                    <!-- <Col span="1">
                    </Col> -->
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalRecruitment" :key="index">
                <Row>
                    <Col span="6">
                      <label>{{item.recruitmentNum}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.recruitmentTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.recruitmentMoney}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <!-- <Col span="1">
                    </Col> -->
                </Row>
              </li>
            </ul>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              其他情况
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="3">
                      <span>社会公德</span>
                    </Col>
                    <Col span="6">
                      <span>经营历史</span>
                    </Col>
                    <Col span="3">
                      <span>经营情况</span>
                    </Col>
                    <Col span="4">
                      <span>法院黑名单</span>
                    </Col>
                    <Col span="4">
                      <span>工商黑名单</span>
                    </Col>
                    <Col span="4">
                      <span>法院执行</span>
                    </Col>
                </Row>
              </li>
              <li class="content-list"v-for="(item,index) in villagePersonalOtherinfo" :key="index" >
                <Row>
                    <Col span="3">
                      <label>{{item.socialMoral|codeName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      <label>{{item.businessHistory}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="3">
                      <label>{{item.businessCase|codeName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isCourtBlackList" disabled>
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isBusinessBlackList" disabled>
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isCourtExecute" disabled>
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>

          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              奖励处罚信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>类型</span>
                    </Col>
                    <Col span="8">
                      <span>名称</span>
                    </Col>
                    <Col span="8">
                      <span>时间</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalAwardsPunishments" :key="index">
                <Row>
                    <Col span="6">
                    
                      <label>{{item.awardsPunishmentsType|codeName}}</label>
                      <span>&nbsp;</span>
                     <!-- <Input v-model='item.awardsPunishmentsType'></Input> -->
                    </Col>
                    <Col span="8">
                      <label>{{item.awardsPunishmentsName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.awardsPunishmentsTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>

          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              信用评价
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>类型</span>
                    </Col>
                    <Col span="8">
                      <span>等级</span>
                    </Col>
                    <Col span="8">
                      <span>时间</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCreditRating" :key="index">
                <Row>
                    <Col span="6">
                    
                      <label>{{item.creditRatingType|codeName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.creditRatingLevel}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.creditRatingTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>

          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              专利资质
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>专利名称</span>
                    </Col>
                    <Col span="8">
                      <span>专利编号</span>
                    </Col>
                    <Col span="8">
                      <span>获得时间</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPatent" :key="index">
                <Row>
                    <Col span="6">
                      <label>{{item.patentName}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.patentId}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.patentGetTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>


        </TabPane>
        <TabPane label="交易信息" name="name3">
          
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              申请贷款前三个月水电气费缴费情况
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>缴费月份</span>
                    </Col>
                    <Col span="6">
                      <span>缴费金额</span>
                    </Col>
                    <Col span="6">
                      <span>缴费类型</span>
                    </Col>
                    <Col span="5">
                      <span>用量</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPayment" :key="index">
                <Row>
                    <Col span="6">
                      <label>{{item.paymentMonth}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      <label>{{item.paymentAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="6">
                      <label>{{item.paymentType}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="5">
                      <label>{{item.useNum}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
          
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              采购信息
            </p>
            <ul>
              <li class="table-head">
                <Row>
                    <Col span="6">
                      <span>采购物资</span>
                    </Col>
                    <Col span="8">
                      <span>采购金额</span>
                    </Col>
                    <Col span="8">
                      <span>采购时间</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPurchasing" :key="index">
                <Row>
                    <Col span="6">
                      <label>{{item.purchasingCommodity}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.purchasingAmount}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="8">
                      <label>{{item.purchasingTime}}</label>
                      <span>&nbsp;</span>
                    </Col>
                    <Col span="1">
                    </Col>
                </Row>
              </li>
            </ul>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import villagePersonalServer from 'rs/villagePersonalServer';
  import villagePersonalBaseServer from 'rs/villagePersonalBaseinfoServer';
  import villagePersonalOtherServer from 'rs/villagePersonalOtherinfoServer';
  export default {
    name: 'VillageFarmerAdd',
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
        saveLoading:false,
        changeOnSelect: false,
        pageState:"new",
        title:"添加农户",
        villagePersonalBaseinfo: {
          gender:1,
          maritalStatus:1,
          managerLevel:1,
        },
        baseinfoId:0,
        // 各个card的数组
        villagePersonalHouse:[{}],
        villagePersonalCarinfo:[{}],
        villagePersonalWarrantinfo:[{isPledge:false}],
        villagePersonalEquipment:[{}],
        villagePersonalProductioninfo:[{}],
        villagePersonalInsured:[{}],
        villagePersonalCreditTitle:[{}],
        villagePersonalOtherinfo: [{}],
        villagePersonalAwardsPunishments:[{}],
        villagePersonalCreditRating:[{}],
        villagePersonalPatent:[{}],
        villagePersonalPayment:[{}],
        villagePersonalPurchasing:[{}],
        villagePersonalRecruitment:[{}],
        // 基本信息的表单验证
        formBaseCustom: {
          name: [
            {required: true, message: '姓名必填', trigger: 'change,blur'}
          ],
          phone: [
            {required: true, message: '电话号码必填', trigger: 'change,blur'}
          ],
          papersId: [
            {required: true, message: '身份证号必填', trigger: 'change,blur'}
          ],
        },
        formProperty:{},
        formPropertyCustom:{},
        genderList:[],
        maritalList:[],
        papersTypeList:[],
        workingTypeList:[],
        managerLevelList:[],
        houseTypeList:[],
        warrantinfoList:[],
        creditRatingTypeList:[],
        awardsPunishmentsTypeList:[],
        readOnly:false
      }
    },
    created: function () {
      this.getCodeTables();
      if(this.$route.query.id){
        this.pageState = "update",
        this.baseinfoId = this.$route.query.id;
        this.villagePersonalBaseinfo.id = this.$route.query.id;
        this.getPersonInfoById(this.$route.query.id);
        if(this.$route.path.indexOf("/view")!=-1){
          this.pageState = "view";
          this.readOnly = true;
        }
      }
    },
    methods: {
      getCodeTables(){
          this.getCodeTable('1', data => {
              this.genderList = data;
          });
          this.getCodeTable('10', data => {
              this.maritalList= data;
          });
          this.getCodeTable('46', data => {
              this.papersTypeList = data;
          });
          this.getCodeTable('47', data => {
              this.workingTypeList = data;
          });
          this.getCodeTable('48', data => {
              this.managerLevelList = data;
          });
          this.getCodeTable('49', data => {
              this.warrantinfoList = data;
          });
          this.getCodeTable('50', data => {
              this.socialMoralList = data;
          });
          this.getCodeTable('51', data => {
              this.businessCaseList = data;
          });
          this.getCodeTable('54', data => {
              this.houseTypeList = data;
          });
          this.getCodeTable('64', data => {
              this.creditRatingTypeList = data;
          });
          this.getCodeTable('63', data => {
              this.awardsPunishmentsTypeList = data;
          });
      },
      
      adminDivisionIdChange(data){
        this.villagePersonalBaseinfo.divisionId=data[data.length-1];
      },
      
      addSave () {
        this.$refs.villagePersonalBaseinfo.validate((valid) => {
          this.saveLoading = true;
          if(valid){
            if (this.pageState=="new") {
                villagePersonalBaseServer.add({},this.villagePersonalBaseinfo,(res)=>{
                    if(res.errorCode == 0){
                      this.$Message.success("添加用户成功");
                      this.pageState = "update";
                      this.baseinfoId = res.data;
                      this.villagePersonalBaseinfo.id = res.data;
                    }
                    else{
                      this.$Message.error("添加失败");
                    }
                     this.saveLoading = false;
                  },(err)=>{
                      this.$Message.error("网络异常，操作失败");
                     this.saveLoading = false;
                })
            } 
            else{
                villagePersonalBaseServer.update({},this.villagePersonalBaseinfo,(res)=>{
                    if(res.errorCode == 0){
                      this.$Message.success("保存成功");
                    }
                    else{
                      this.$Message.error("保存失败，请重新提交");
                    }
                     this.saveLoading = false;
                  },(err)=>{
                      this.$Message.error("网络异常，操作失败");
                     this.saveLoading = false;
                })
            }
          }else {
            this.$Message.error('表单验证失败!');
            this.saveLoading = false;
          }
        })
      },
      addLine(arr){
        if(arr == "villagePersonalWarrantinfo"){
          this.villagePersonalWarrantinfo.push({isPledge:false})
          return;
        }
        this[arr].push({})
      },
      deleteLine(arr,index){
        this[arr].splice(index,1);
      },
      save(key){
        if(this[key].length == 0){
          return;
        }
        for(let o of this[key]){
          o.baseinfoId = this.baseinfoId;
          console.log(o.baseinfoId )
        }
        villagePersonalOtherServer[key]({
        },this[key],res=>{
          if(res.errorCode == 0){
            this.$Message.success("保存成功");
          }
          else{
            this.$Message.error("保存失败，请重新提交");
          }
        },(err)=>{
            this.$Message.error("网络异常，操作失败");

        })
      },
      getPersonInfoById(baseInfoId){
          villagePersonalServer.getById({
            baseInfoId
          },{},res=>{
            if(res.errorCode == 0){
              for(let k in res.data){
                this[k.replace('DetailVos','')] = res.data[k];
              }
                this.villagePersonalBaseinfo = this.villagePersonalBaseinfoDetailVo
              if(this.villagePersonalOtherinfoDetailVo ==null){
                this.villagePersonalOtherinfo = [{}]
              }else{
                this.villagePersonalOtherinfo = [this.villagePersonalOtherinfoDetailVo];
              }
              if(JSON.stringify(this.villagePersonalProductioninfo) =="[]")
                this.villagePersonalProductioninfo = [{}];
              if(JSON.stringify(this.villagePersonalRecruitment) =="[]")
                this.villagePersonalRecruitment = [{}];
            }
          },err=>{

          })
      }
    }
  }
</script>

<style lang='less'>
  .VillageFarmerAdd {
    .ivu-card{
      min-width:1020px;
      margin: 20px 0;
      .ivu-input[disabled]{
        color:#657180;
      }
      .sub-title{
        font-size:12px;
        font-weight:900;
        color:#000;
      }
      ul{
        margin-bottom:16px;
        li.content-list{
          text-align: center;
          padding: 6px 0 ;
          .ivu-input-wrapper{
            width: auto;
          }
          .ivu-select{
            text-align: left;
          }
        }
        li.content-list:nth-of-type(2n-1){
          background-color: #ffddff;
        }
        li.content-list:nth-of-type(2n){
          background-color: #ddffff;
        }
        li.table-head{
          text-align: center;
          line-height:32px;
          white-space: nowrap;
        }
      }
      .save-btn{
        display:block;
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto;
      }
    }

  }
</style>
