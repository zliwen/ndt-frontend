/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="VillageEnterpriseAdd">
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/village/village-enterprise">农业经营主体</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="contentBox">
      <Tabs v-model="tabName" @on-click="tabClick">
        <TabPane label="基础信息" name="name1">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              农业经营主体基础信息
            </p>

            <Form ref="formBase" :model="formBase" :rules="formBaseCustom" :label-width="160">
              <Row>
                <Col span="24" class="clearFix codeObj">
                  <FormItem label="经营主体代码：" prop="code" :label-width="130" style="width: 400px;">
                    <Input v-model="formBase.code" placeholder="请输入经营主体代码"></Input>
                  </FormItem>

                  <div class="codeBtn" v-if="!isSee" >
                    <Button type="info" @click="getDataByName">获取信息</Button>
                    <b>根据经营主体代码获取信息，填充下面字段</b>
                  </div>
                </Col>
                <Col span="8">
                <FormItem class="codeType" label="经营主体代码类型：" prop="certificateType" :label-width="130">
                  <Select v-model="formBase.certificateType">
                    <Option v-for="item in loanTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </FormItem>
                <FormItem class="codeNb" label="经营主体名称：" prop="name" :label-width="120">
                  <Input v-model="formBase.name" placeholder="请输入经营主体名称"></Input>
                </FormItem>
                <FormItem label="所在区域：" prop="divisionId" :label-width="130">
                  <GetCity :set-value="formBase.divisionId"
                           @onChange="adminDivisionIdChange"
                           :changeOnSelect="changeOnSelect"></GetCity>
                </FormItem>
                 <p v-if="divisionError" style="text-indent:100px;font-size:12px; color:#099">*所在区域数据不准确请重新输入，确认到村</p>
                </Col>
                <Col span="9">
                <FormItem label="生产经营规模：" prop="businessSize">
                  <InputNumber v-model="formBase.businessSize"></InputNumber>
                  <Select v-model="formBase.businessSizeUnit" style="width: 140px;">
                    <Option v-for="item in businessSizeUnitList" :value="item.id" :key="item.id">{{ item.value
                      }}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="经营收入：" prop="businessIncome">
                  <InputNumber v-model="formBase.businessIncome"></InputNumber>
                  <Input v-model="formBase.businessIncomeUnit" placeholder="单位"
                    style="width: 60px;"></Input>

                </FormItem>
                <FormItem label="	成员人数：" prop="memberTotal">
                  <InputNumber v-model="formBase.memberTotal"></InputNumber>
                </FormItem>
                </Col>
                <Col span="7">

                <FormItem label="生产经营类型：" prop="productionType">
                  <Select v-model="formBase.productionType">
                    <Option v-for="item in productionTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="登记注册类型：" prop="companyType">
                  <Select v-model="formBase.companyType">
                    <Option v-for="item in companyTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </FormItem>

                </Col>
                <Col span="15">
                <FormItem label="注册地址：" prop="address" :label-width="130">
                  <Input type="textarea" v-model="formBase.address"
                         :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入居住地址"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                <FormItem label="法人代表姓名：" prop="legalPerson" :label-width="120">
                  <Input v-model="formBase.legalPerson" placeholder="请输入法人代表姓名"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="法人代表联系方式：" prop="legalPersonPhone">
                  <Input v-model="formBase.legalPersonPhone" placeholder="请输入法人代表联系方式"></Input>
                </FormItem>
                </Col>
                <Col span="10">
                <FormItem label="法人代表身份证号：" prop="legalPersonIdentityId">
                  <Input v-model="formBase.legalPersonIdentityId" placeholder="请输入法人代表身份证号"></Input>
                </FormItem>
                </Col>

              </Row>
            </Form>

            <Button v-if="!isSee" class="save-btn" type="success" icon="" size="large" @click="saveBase">
              保存</Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              获得相关权证情况
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button  @click="addWarrant" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>权证名称</th>
                <th>描述</th>
                <th>权证编号</th>
                <th>发放时间</th>
                <th>是否抵押</th>
                <th>抵押时间</th>
                <th>抵押金额</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in warrantList">
                <td class="addBtn" v-if="!isSee" >
                  <Button @click="delWarrant(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Select v-model="item.name">
                    <Option v-for="sub in warrantNameList" :value="sub.id"
                            :key="sub.id">{{ sub.value}}
                    </Option>
                  </Select>
                </td>
                <td>
                  <Input v-model="item.remark"></Input>
                </td>
                <td>
                  <Input v-model="item.code"></Input>
                </td>
                <td>
                  <Input v-model="item.grantTime" placeholder="请输入时间"></Input>
                </td>
                <td>
                  <RadioGroup v-model="item.isMortgage">
                    <Radio label="是" value="true"></Radio>
                    <Radio label="否" value="false"></Radio>
                  </RadioGroup>
                </td>
                <td>
                  <Input :disabled="item.isMortgage=='否'" v-model="item.mortgageTime" placeholder="请输入时间"></Input>
                </td>
                <td>
                  <Input  :disabled="item.isMortgage=='否'" v-model="item.mortgageMoney"></Input>
                </td>

              </tr>
              </tbody>
            </table>
            <Button  v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large" @click="saveWarrant">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              参保信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addInsurance" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>参加保险类型</th>
                <th>保险金额(元)</th>
                <th>参保日期</th>
                <th>保险到期日期</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in insuranceList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delInsurance(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.insuranceType"></Input>
                </td>
                <td>
                  <Input v-model="item.insuranceAmt"></Input>
                </td>
                <td>
                  <Input v-model="item.insuranceTime" placeholder="请输入时间"></Input>
                </td>
                <td>
                  <Input v-model="item.insuranceDuetime" placeholder="请输入时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveInsurance">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              信用称号信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addCredit" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>获得信用称号情况</th>
                <th>取得信用称号年度</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in creditList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delCredit(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.situation"></Input>
                </td>
                <td>
                  <Input v-model="item.year" placeholder="请输入时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveCredit">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              财务指标信息
            </p>
            <Form ref="formFinance" :model="formFinance" :rules="formFinanceCustom" :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="目前贷款余额(元)：" prop="loanBalance" :label-width="120">
                  <Input v-model="formFinance.loanBalance" placeholder="请输入目前贷款余额"></Input>
                </FormItem>
                <FormItem label="资产年度：" prop="calendarYear" :label-width="120">
                  <Input v-model="formFinance.calendarYear" placeholder="请输入资产年度"></Input>
                </FormItem>

                </Col>
                <Col span="8">
                <FormItem label="资产信息：" prop="financeData" :label-width="120">
                  <Input v-model="formFinance.financeData" placeholder="请输入资产信息"></Input>
                </FormItem>
                <FormItem label="所有者权益：" prop="name" :label-width="120">
                  <Input v-model="formFinance.ownerEquity" placeholder="请输入所有者权益"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="资产负债：" prop="ownerEquity" :label-width="120">
                  <Input v-model="formFinance.debtAmt" placeholder="请输入资产负债"></Input>
                </FormItem>
                </Col>
              </Row>
            </Form>

            <Button  v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveFinance">保存
            </Button>
          </Card>


        </TabPane>
        <TabPane label="辅助信息" name="name2">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              用工信息（用户采集）
            </p>
            <Form  :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="用工人数：" prop="workerTotal" :label-width="120">
                  <Input v-model="formBase.workerTotal" placeholder="请输入用工人数"></Input>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="用工时间：" prop="workerTime" :label-width="120">
                  <Input v-model="formBase.workerTime" placeholder="请输入用工时间"></Input>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="用工工资：" prop="workerMoney" :label-width="120">
                  <Input v-model="formBase.workerMoney" placeholder="请输入用工工资"></Input>
                </FormItem>
                </Col>
              </Row>
            </Form>

            <Button  v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveBase">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              其他情况（金融服务站采集）
            </p>
            <Form :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="社会公德：" prop="socialMorality" :label-width="120">
                  <Select v-model="formBase.socialMorality">
                    <Option v-for="item in socialMoralityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="经营历史：" prop="operatingHistory" :label-width="120">
                  <Input v-model="formBase.operatingHistory" placeholder="请输入经营历史"></Input>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="经营情况：" prop="operationSituation" :label-width="120">
                  <Select v-model="formBase.operationSituation">
                    <Option v-for="item in operationSituationList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
            </Form>

            <Button  v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveBase">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              企业评价信息
            </p>
            <h2><span>荣誉称号</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addHonor" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>荣誉称号</th>
                <th>获得时间</th>
                <th>荣誉级别</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in honorList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delHonor(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.honorName" placeholder="请输入荣誉称号"></Input>
                </td>
                <td>
                  <Input v-model="item.awardDate" placeholder="请输获得时间"></Input>
                </td>
                <td>
                  <Select v-model="item.level">
                    <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>资质</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50"  v-if="!isSee">
                  <Button @click="addHonor1" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>资质名称</th>
                <th>获得时间</th>
                <th>资质级别</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in honor1List">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delHonor1(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.honorName" placeholder="请输入资质名称"></Input>
                </td>
                <td>
                  <Input v-model="item.awardDate" placeholder="请输入获得时间"></Input>
                </td>
                <td>
                  <Select v-model="item.level">
                    <Option v-for="item in levelList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>知识产权</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50"  v-if="!isSee">
                  <Button @click="addKnowledge" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>产权名称</th>
                <th>获得时间</th>
                <th>登记号</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in knowledgeList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delKnowledge(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.name" placeholder="请输入产权名称"></Input>
                </td>
                <td>
                  <Input v-model="item.awardDate" placeholder="请输入获得时间"></Input>
                </td>
                <td>
                  <Input v-model="item.registrationNumber" placeholder="请输入登记号"></Input>
                </td>
              </tr>
              </tbody>
            </table>

            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveAppraise">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              其它情况
            </p>
            <Form  :label-width="160">
              <Row>
                <Col span="8">
                <FormItem label="法院黑名单：" prop="isCourtBlacklist" :label-width="120">
                  <RadioGroup type="button"  v-model="formBase.isCourtBlacklist">
                    <Radio key="是" label="是" >是</Radio>
                    <Radio key="否" label="否" >否</Radio>
                  </RadioGroup>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="工商黑名单：" prop="isBusinessBlacklist" :label-width="120">
                  <RadioGroup type="button"  v-model="formBase.isBusinessBlacklist">
                    <Radio key="是" label="是" >是</Radio>
                    <Radio key="否" label="否" >否</Radio>
                  </RadioGroup>
                </FormItem></Col>
                <Col span="8">
                <FormItem label="法院执行：" prop="isCourtEnforcement" :label-width="120">
                  <RadioGroup type="button"  v-model="formBase.isCourtEnforcement">
                    <Radio key="是" label="是" >是</Radio>
                    <Radio key="否" label="否" >否</Radio>
                  </RadioGroup>
                </FormItem>
                </Col>
              </Row>
            </Form>
            <h2><span>添加奖励/处罚</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addReward" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>奖励或处罚 </th>
                <th>类型</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in rewardList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delReward(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Select v-model="item.reorpuType">
                    <Option v-for="item in reorpuTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>
                </td>
                <td>
                  <Input v-model="item.type" placeholder="请输入类型"></Input>
                </td>
                <td>
                  <Input v-model="item.awardDate" placeholder="请输入时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>添加信用评价</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addEvaluation" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>评价</th>
                <th>等级</th>
                <th>时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in evaluationList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delEvaluation(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Select v-model="item.evaluateType">
                    <Option v-for="item in evaluateTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                  </Select>

                </td>
                <td>
                  <Input v-model="item.level" placeholder="请输入等级"></Input>
                </td>
                <td>
                  <Input v-model="item.evaluateDate" placeholder="请输入时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            <h2><span>添加专利资质</span></h2>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addPatent" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>专利资质名称</th>
                <th>专利资质编号</th>
                <th>获得时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in patentList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delPatent(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.patentName" placeholder="请输入资质名称"></Input>
                </td>
                <td>
                  <Input v-model="item.patentNo" placeholder="请输入资质编号"></Input>
                </td>
                <td>
                  <Input v-model="item.acquireDate" placeholder="请输入获得时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>

            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="saveFuckFuck">保存
            </Button>
          </Card>
        </TabPane>
        <TabPane label="交易信息" name="name3">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              缴费情况
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addPayment" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>缴费类型</th>
                <th>缴费月份</th>
                <th>用量</th>
                <th>缴费金额(元)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in paymentList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delPayment(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.payType" placeholder="请输入缴费类型"></Input>
                </td>
                <td>
                  <Input v-model="item.payDate" placeholder="请输入时间"></Input>
                </td>
                <td>
                  <InputNumber v-model="item.consumption"></InputNumber>
                </td>
                <td>
                  <InputNumber v-model="item.payAmt"></InputNumber>
                </td>
              </tr>
              </tbody>
            </table>
            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="savePayment">保存
            </Button>
          </Card>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              采购信息
            </p>
            <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th width="50" v-if="!isSee">
                  <Button @click="addPayment" type="primary" shape="circle" icon="plus-round"></Button>
                </th>
                <th>采购物资名称</th>
                <th>采购金额</th>
                <th>采购采购时间</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in purchaseList">
                <td class="addBtn" v-if="!isSee">
                  <Button @click="delPayment(index)" type="error" shape="circle" icon="minus-round"></Button>
                </td>
                <td>
                  <Input v-model="item.purchaseMaterial" placeholder="请输入采购物资名称"></Input>
                </td>
                <td>
                  <InputNumber v-model="item.purchaseAmt"></InputNumber>
                </td>
                <td>
                  <Input v-model="item.purchaseDate" placeholder="请输入采购采购时间"></Input>
                </td>
              </tr>
              </tbody>
            </table>
            <Button v-if="!isSee" :disabled="!id" class="save-btn" type="success" icon="" size="large"
                    @click="savePurchase">保存
            </Button>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>

  import creditServer from 'rs/credit';
  import villageCompanyBaseInfoServer from 'rs/villageCompanyBaseInfo';
  import villageCompanyWarrantServer from 'rs/villageCompanyWarrant';
  import villageCompanyInsuranceServer from 'rs/villageCompanyInsurance';
  import villageCompanyCreditServer from 'rs/villageCompanyCredit';
  import villageCompanyFinanceServer from 'rs/villageCompanyFinance';
  import villageCompanyPaymentServer from 'rs/villageCompanyPayment';
  import villageCompanyPurchaseServer from 'rs/villageCompanyPurchase';
  import villageCompanyHonorServer from 'rs/villageCompanyHonor';
  import villageCompanyKnowledgeServer from 'rs/villageCompanyKnowledge';


  import villageCompanyRewardServer from 'rs/villageCompanyReward';
  import villageCompanyEvaluationServer from 'rs/villageCompanyEvaluation';
  import villageCompanyPatentServer from 'rs/villageCompanyPatent';

  export default {
    name: 'VillageEnterpriseAdd',
    props: ["orgItemData"],
    data () {
      const validateDivisions = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择所在区域'));
        } else {
          callback();
        }
      };
      const validateCertificateType = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择经营主体代码类型'));
        } else {
          callback();
        }
      };


      return {
        divisionError:false,
        tabName:this.$route.query.tabName||"name1",
        villageCompanyInfoId: "",
        title: "添加农业经营主体",
        changeOnSelect: false,
        houseArray: [{}],
        id: this.$route.query.id,
        isSee:this.$route.query.isSee,
        userType:this.session.get("userType"),
        formBase: {
          name: null,
          certificateType: null,
          code: null,
          memberTotal: null,
          workerTime:null,
          workerTotal:null,
          businessSize:null,
          workerMoney:null,
          businessIncome:null
        },
        formBaseCustom: {
          name: [
            {required: true, max: 100, message: '请输入企业名称且不能超过100个字', trigger: 'blur'}
          ],
          code: [
            {required: true, max: 100, message: '请输入企业代码且不能超过100个字', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, max: 100, message: '请输入法人代表且不能超过100个字', trigger: 'blur'}
          ],
          certificateType: [
            {validator: validateCertificateType, trigger: 'change', required: true}
          ],
          companyCounty: [
            {validator: validateDivisions, trigger: 'change', required: true}
          ],
          divisionId:[
            {validator: validateDivisions, trigger: 'change', required: true}
          ]
        },
        formFinance:{
          loanBalance:"",
          calendarYear:"",
          debtAmt:"",
          financeData:"",
          ownerEquity:""
        },
        formFinanceCustom:{
          loanBalance:[],
          calendarYear:[],
          debtAmt:[],
          financeData:[],
          ownerEquity:[]
        },

        warrantList: [],
        insuranceList:[],
        creditList:[],
        honorList:[],
        honor1List:[],
        patentList:[],
        knowledgeList:[],
        evaluationList:[],
        rewardList:[],


        paymentList:[],
        purchaseList:[],

        loanTypeList: [],
        businessIncomeUnitList: [],
        businessSizeUnitList: [],
        companyTypeList: [],
        productionTypeList: [],
        warrantNameList:[],
        socialMoralityList:[],
        operationSituationList:[],
        levelList:[],
        cityList: []

      }
    },
    created: function () {

      if (this.id) {
        villageCompanyBaseInfoServer.findById({id: this.id}, {}, reponse => {
          reponse.data.isCourtBlacklist=reponse.data.isCourtBlacklist?"是":"否";
          reponse.data.isBusinessBlacklist=reponse.data.isBusinessBlacklist?"是":"否";
          reponse.data.isCourtEnforcement=reponse.data.isCourtEnforcement?"是":"否";
          if(reponse.data)this.formBase = reponse.data;
          if(String(this.formBase.divisionId).length<12){
                  this.divisionError = true;
              }
        }, err => {

        });
        villageCompanyWarrantServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length)reponse.data.forEach(item=>{
            item.isMortgage=item.isMortgage?"是":"否";
          });
          if(reponse.data&&reponse.data.length){
            this.warrantList = reponse.data;
          }else {
            this.addWarrant();
          }
        }, err => {

        });
        villageCompanyInsuranceServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.insuranceList = reponse.data;
          }else {
            this.addInsurance();
          }
        }, err => {

        });
        villageCompanyCreditServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.creditList = reponse.data;
          }else {
            this.addCredit();
          }
        }, err => {

        });

        villageCompanyFinanceServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data) this.formFinance = reponse.data;
        }, err => {

        });

        villageCompanyPaymentServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.paymentList = reponse.data;
          }else {
            this.addPayment();
          }
        }, err => {

        });
        villageCompanyPurchaseServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.purchaseList = reponse.data;
          }else {
            this.addPurchase();
          }
        }, err => {

        });
        villageCompanyHonorServer.findByBaseInfoId({baseInfoId: this.id,type:0}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.honorList = reponse.data;
          }else {
            this.addHonor();
          }
        }, err => {

        });
        villageCompanyHonorServer.findByBaseInfoId({baseInfoId: this.id,type:1}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.honor1List = reponse.data;
          }else {
            this.addHonor1();
          }
        }, err => {

        });
        villageCompanyKnowledgeServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.knowledgeList = reponse.data;
          }else {
            this.addKnowledge();
          }
        }, err => {

        });
        villageCompanyPatentServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.patentList = reponse.data;
          }else {
            this.addPatent();
          }
        }, err => {

        });
        villageCompanyRewardServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.rewardList = reponse.data;
          }else {
            this.addReward();
          }
        }, err => {

        });
        villageCompanyEvaluationServer.findByBaseInfoId({baseInfoId: this.id}, {}, reponse => {
          if(reponse.data&&reponse.data.length){
            this.evaluationList = reponse.data;
          }else {
            this.addEvaluation();
          }
        }, err => {

        });

      }else{
        this.addCredit();
        this.addWarrant();
        this.addInsurance();
        this.addPayment();
        this.addPurchase();
        this.addHonor();
        this.addHonor1();
        this.addKnowledge();
        this.addPatent();
        this.addReward();
        this.addEvaluation();
      }
      this.getCodeTable('55', data => {
        this.loanTypeList = data;
      });
      this.getCodeTable('58', data => {
        this.businessSizeUnitList = data;
      });
      this.getCodeTable('56', data => {
        this.companyTypeList = data;
      });
      this.getCodeTable('58', data => {
        this.businessIncomeUnitList = data;
      });
      this.getCodeTable('57', data => {
        this.productionTypeList = data;
      });
      this.getCodeTable('59', data => {
        this.warrantNameList = data;
      });
      this.getCodeTable('60', data => {
        this.socialMoralityList = data;
      });
      this.getCodeTable('61', data => {
        this.operationSituationList = data;
      });
      this.getCodeTable('62', data => {
        this.levelList = data;
      });
      this.getCodeTable('63', data => {
        this.reorpuTypeList = data;
      });
      this.getCodeTable('64', data => {
        this.evaluateTypeList = data;
      });

    },
    methods: {
      tabClick(name){
        this.tabName=name;
        this.$router.push({name: "VillageEnterpriseAdd", query: {id: this.id,tabName:this.tabName,isSee:this.isSee}})
      },
      delWarrant(index){
        this.warrantList.splice(index, 1);
      },
      addWarrant(){
        this.warrantList.push({
          villageCompanyInfoId: this.id,
          name: null,
          remark: null,
          code: null,
          grantTime: null,
          isMortgage: "否",
          mortgageTime: null,
          mortgageMoney: null,
          imgUrl: null
        })
      },

      delInsurance(index){
        this.insuranceList.splice(index, 1);
      },
      addInsurance(){
          this.insuranceList.push({
            villageCompanyInfoId: this.id,
            insuranceType:null,
            insuranceAmt:null,
            insuranceTime:null,
            insuranceDuetime:null
          })
      },
      delCredit(index){
        this.creditList.splice(index, 1);
      },
      addCredit(){
        this.creditList.push({
          villageCompanyInfoId: this.id,
          situation:null,
          year:null
        })
      },
      delPayment(index){
        this.creditList.splice(index, 1);
      },
      addPayment(){
        this.paymentList.push({
          villageCompanyInfoId: this.id,
          payType:"",
          payDate:null,
          payAmt:null,
          consumption:null,
          imgUrl:null
        })
      },

      delPurchase(index){
        this.purchaseList.splice(index, 1);
      },
      addPurchase(){
        this.purchaseList.push({
          villageCompanyInfoId: this.id,
          purchaseMaterial:null,
          purchaseAmt:null,
          purchaseDate:null,
          imgUrl:null
        })
      },
      delHonor(index){
        this.honorList.splice(index, 1);
      },
      addHonor(){
        this.honorList.push({
          villageCompanyInfoId: this.id,
          type:0,
          honorName:null,
          awardDate:null,
          level:null
        })
      },
      delHonor1(index){
        this.honor1List.splice(index, 1);
      },
      addHonor1(){
        this.honor1List.push({
          villageCompanyInfoId: this.id,
          type:1,
          honorName:null,
          awardDate:null,
          level:null
        })
      },
      delPatent(index){
        this.patentList.splice(index, 1);
      },
      addPatent(){
        this.patentList.push({
          villageCompanyInfoId: this.id,
          patentName:null,
          acquireDate:null,
          patentNo:null
        })
      },
      delKnowledge(index){
        this.knowledgeList.splice(index, 1);
      },
      addKnowledge(){
        this.knowledgeList.push({
          villageCompanyInfoId: this.id,
          name:null,
          awardDate:null,
          registrationNumber:null
        })
      },
      delReward(index){
        this.rewardList.splice(index, 1);
      },
      addReward(){
        this.rewardList.push({
          villageCompanyInfoId: this.id,
          reorpuType:null,
          type:null,
          awardDate:null
        })
      },

      delEvaluation(index){
        this.evaluationList.splice(index, 1);
      },
      addEvaluation(){
        this.evaluationList.push({
          villageCompanyInfoId: this.id,
          evaluateType:null,
          level:null,
          evaluateDate:null
        })
      },


      adminDivisionIdChange(data){
        this.formBase.divisionId=data[data.length-1];
         this.divisionError = false;
      },
      setId(list){
          list.forEach(item=>{
              item.villageCompanyInfoId=this.id;
          })
      },
      saveBase () {
        this.$refs.formBase.validate((valid) => {
          this.formBase.isCourtBlacklist=this.formBase.isCourtBlacklist=="是"?true:false;
          this.formBase.isBusinessBlacklist=this.formBase.isBusinessBlacklist=="是"?true:false;
          this.formBase.isCourtEnforcement=this.formBase.isCourtEnforcement=="是"?true:false;
          debugger;
          if (valid) {
            if (this.id) {
              villageCompanyBaseInfoServer.update({}, Object.assign(this.formBase, {id: this.id}), response => {
                this.$Message.success('保存成功!');
              })
            } else {
              villageCompanyBaseInfoServer.add({}, this.formBase, response => {
                if (response.errorCode == 0) {
                  this.id = response.data;
                  this.$router.push({name: "VillageEnterpriseAdd", query: {id: this.id}})
                  this.$Message.success('保存成功!');
                }
              })
            }
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      saveWarrant(){
        let vos=[];
        this.warrantList.forEach(item=>{
          if(item.name){
            vos.push({
              villageCompanyInfoId: this.id,
              name: item.name,
              remark: item.remark,
              code: item.code,
              grantTime: (new Date(item.grantTime))-0,
              isMortgage: item.isMortgage=="否"?false:true,
              mortgageTime: (new Date(item.mortgageTime))-0,
              mortgageMoney: item.mortgageMoney,
              imgUrl: item.imgUrl
            })
          }
        });
        villageCompanyWarrantServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:vos
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      saveInsurance(){
          this.setId(this.insuranceList);
        villageCompanyInsuranceServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.insuranceList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      saveCredit(){
        this.setId(this.creditList);
        villageCompanyCreditServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.creditList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      saveFinance(){
        villageCompanyFinanceServer.batchAdd({},
          Object.assign(this.formFinance,{villageCompanyInfoId:this.id}),
          response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      savePayment(){
        this.setId(this.paymentList);
        villageCompanyPaymentServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.paymentList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      savePurchase(){
        this.setId(this.purchaseList);
        villageCompanyPurchaseServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.purchaseList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })
      },
      saveAppraise(){
        this.setId(this.honorList);
        villageCompanyHonorServer.update({}, {
          villageCompanyInfoId:this.id,
          type:0,
          addVos:this.honorList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        });
        villageCompanyHonorServer.update({}, {
          villageCompanyInfoId:this.id,
          type:1,
          addVos:this.honor1List
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        });
        villageCompanyKnowledgeServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.knowledgeList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        });

      },
      saveFuckFuck(){
        this.saveBase();
        this.setId(this.rewardList);
        villageCompanyRewardServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.rewardList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        });
        villageCompanyEvaluationServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.evaluationList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        });
        villageCompanyPatentServer.update({}, {
          villageCompanyInfoId:this.id,
          addVos:this.patentList
        }, response => {
          if (response.errorCode == 0) this.$Message.success('保存成功!');
        })

      },
      queryCompanyInfoByName(){
        creditServer.searchCompanyInfoByKey({params: {name: this.formBase.code,type:'company',page:1,
          pageSize:1}}, response => {
          if(response.data.result.length){
            let data = response.data.result[0];
            this.formBase.name = data.companyName;
            this.formBase.address = data.address;
            this.formBase.companyCounty = data.companyCounty;
            this.formBase.legalPerson = data.frName;
          }else {
            this.$Message.error(
              {
                content: '没有查询到（'+this.formBase.name+"）相关数据",
                duration: 10,
                closable: true
              });
          }

        })
      },
      getDataByName(){
        this.queryCompanyInfoByName();

      }
    }
  }
</script>

<style lang='less'>
  .VillageEnterpriseAdd {
    .ivu-card {
      margin: 20px 0;
    }
    .ivu-form .ivu-form-item-label {
      padding-right: 0px;
    }
    .codeObj {
      border-bottom: 1px dashed #ededed;
      margin-bottom: 20px;
      >div {
        float: left;
      }
      .codeType {
        width: 250px;
      }
      .codeNb {
        width: 450px;
      }
      .codeBtn {
        padding-left: 20px;
        b {
          color: #c00;
        }
      }
    }
    .save-btn {
      display: block;
      padding-left: 30px;
      padding-right: 30px;
      margin: 20px auto;
    }
    .addBtn{ text-align: center;}
    td{ text-align: center; padding: 6px;}
    thead{ background: #f1f1f1; padding: 10px 0; line-height: 40px;}
    table{ border: 1px solid #ededed;}
    h2{ font-size: 16px; margin: 40px 0 0; line-height: 40px;
      border-bottom: 1px solid #ededed; color: #222;
      span{display: inline-block; padding: 0 20px; background: #ededed; width: 170px; text-align: center;}
    }
  }
</style>
