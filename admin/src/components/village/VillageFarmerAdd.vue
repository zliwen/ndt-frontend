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
                      <Input v-model="villagePersonalBaseinfo.name" placeholder="请输入农户姓名"></Input>
                    </FormItem>
                    <FormItem label="联系电话：" prop="phone"  :label-width="120">
                      <Input v-model="villagePersonalBaseinfo.phone" placeholder="请输入联系电话"></Input>
                    </FormItem>
                    <FormItem label="证件类型："  :label-width="120">
                      <Select v-model="villagePersonalBaseinfo.papersType">
                        <Option v-for="(item,index) in papersTypeList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="证件号码：" prop="papersId"  :label-width="120">
                      <Input v-model="villagePersonalBaseinfo.papersId" placeholder="请输入证件号码"></Input>
                    </FormItem>
                </Col>
                <Col span="10">

                  <FormItem label="出生年月：" :label-width="140">
                    <Input v-model="villagePersonalBaseinfo.birth" placeholder="yyyy-MM-dd"></Input>
                    <!-- <DatePicker v-model="villagePersonalBaseinfo.birth" format="yyyy年MM月dd日" type="date"
                                placeholder="选择日期" ></DatePicker> -->
                  </FormItem>
                  <FormItem label="性别："  :label-width="140">
                    <RadioGroup type="button"  v-model="villagePersonalBaseinfo.gender">
                      <Radio v-for="(item,index) in genderList" :key="index" :label="item.id" >{{item.value}}</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="婚姻状况："  :label-width="140">
                    <RadioGroup type="button" v-model="villagePersonalBaseinfo.maritalStatus">
                      <Radio v-for="(item,index) in maritalList" :key="index" :label="item.id" >{{item.value}}</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="农业职业经理人等级：" :label-width="140" >
                    <RadioGroup type="button" v-model="villagePersonalBaseinfo.managerLevel">
                      <Radio v-for="(item,index) in managerLevelList" :key="index" :label="item.id" >{{item.value}}</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>

                <Col span="6">
                  <FormItem label="生产经营类型："  :label-width="120">
                    <Select v-model="villagePersonalBaseinfo.workingType">
                      <Option v-for="(item,index) in workingTypeList" :key="index" :value="item.id" >{{item.value}}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="流转经营面积(亩)："  :label-width="120">
                    <InputNumber :min="0" v-model="villagePersonalBaseinfo.operatingArea"></InputNumber>
                  </FormItem>
                  <FormItem label="养殖数量(只/头)："  :label-width="120">
                    <InputNumber :min="0" v-model="villagePersonalBaseinfo.breedingNumber"></InputNumber>
                  </FormItem>
                  <FormItem label="农机数量(台)："  :label-width="120">
                    <InputNumber :min="0" v-model="villagePersonalBaseinfo.machineNumber"></InputNumber>
                  </FormItem>
                </Col>
                <Col span="8">

                    <FormItem label="所在区域：" prop="divisionId" :label-width="130">
                      <GetCity :set-value="villagePersonalBaseinfo.divisionId"
                              @onChange="adminDivisionIdChange"
                              :changeOnSelect="changeOnSelect"></GetCity>
                    </FormItem>
                    <p v-if="divisionError" style="text-indent:100px;font-size:12px; color:#099">* 所在区域数据不准确请重新输入，确认到村</p>
                </Col>
                <Col span="16">
                  <FormItem label="居住地址：" :label-width="120">
                    <Input type="textarea" v-model="villagePersonalBaseinfo.address"
                          :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入居住地址"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Button class="save-btn" v-if="!readOnly" :loading="saveLoading"  type="success" icon="" size="large" @click="addSave()">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalHouse')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalHouse" :key="index">
                <Row>
                    <Col span="8">
                      <Input v-model='item.houseAddress'></Input>
                    </Col>
                    <Col span="6">
                      <Select v-model='item.houseType'>
                        <Option v-for="(item,index) in houseTypeList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="5">
                    <Input v-model="item.houseTime"  placeholder="yyyy-MM"></Input>
                      <!-- <DatePicker v-model="item.houseTime" format="yyyy年MM月" type="month"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="4">
                      <InputNumber v-model='item.floorage'></InputNumber>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalHouse',index)"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalHouse')">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info"@click="addLine('villagePersonalCarinfo')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCarinfo" :key="index">
                <Row>
                    <Col span="8">
                      <Input v-model='item.carId'></Input>
                    </Col>
                    <Col span="8">
                    <Input v-model="item.buyTime"   placeholder="yyyy-MM"></Input>
                    <!-- <DatePicker v-model="item.buyTime" format="yyyy年MM月" type="month"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="7">
                      <InputNumber v-model='item.buyAmount'></InputNumber>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalCarinfo',index)"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalCarinfo')">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalWarrantinfo')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalWarrantinfo" :key="index">
                <Row>
                    <Col span="4">
                      <Select v-model="item.warrantName">
                        <Option v-for="(item,index) in warrantinfoList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="4">
                      <Input v-model='item.warrantRemark'></Input>
                    </Col>
                    <Col span="4">
                      <Input v-model='item.warrantId'></Input>
                    </Col>
                    <Col span="4">
                      <Input v-model="item.getTime"    placeholder="yyyy-MM-dd"></Input>
                      <!-- <DatePicker v-model="item.getTime" format="yyyy年MM月dd日" type="date"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="1">
                      <i-switch v-model="item.isPledge">
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
                      <Input v-model="item.pledgeTime"  :disabled="!item.isPledge"   placeholder="yyyy-MM-dd"></Input>
                      <!-- <DatePicker :v-model="item.pledgeTime" format="yyyy年MM月dd日" type="date"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="3">
                      <Input v-model='item.pledgeAmount' :disabled="!item.isPledge" ></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalWarrantinfo')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalWarrantinfo')">保存</Button>
          </Card>
          <!-- <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              相关权证图片
            </p>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('base')">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalProductioninfo')"></Button>
                    </Col> -->
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalProductioninfo" :key="index">
                <Row>
                    <Col span="8">
                     <Input v-model='item.cultivatedVarieties' placeholder="种/养产品名称"></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.cultivatedArea' placeholder="填写数字"></Input>
                    </Col>
                    <Col span="7">
                      <Input v-model='item.firstHalfRevenue'></Input>
                    </Col>
                    <!-- <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalProductioninfo')"></Button>
                    </Col> -->
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalProductioninfo')">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalEquipment')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalEquipment" :key="index">
                <Row>
                    <Col span="8">
                     <Input v-model='item.equipmentType'></Input>
                    </Col>
                    <Col span="8">
                      <InputNumber v-model='item.equipmentAmount'></InputNumber>
                    </Col>
                    <Col span="7">
                      <Input v-model="item.buyEquipmentTime"    placeholder="yyyy-MM-dd"></Input>
                      <!-- <DatePicker v-model="item.buyEquipmentTime" format="yyyy年MM月dd日" type="date"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalEquipment')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalEquipment')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalInsured')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalInsured" :key="index">
                <Row>
                    <Col span="6">
                     <Input v-model='item.insuredType'></Input>
                    </Col>
                    <Col span="6">
                     <Input v-model='item.insuredAmount'></Input>
                    </Col>
                    <Col span="6">

                      <Input v-model="item.insuredStartTime"    placeholder="yyyy-MM"></Input>
                      <!-- <DatePicker v-model="item.insuredStartTime" format="yyyy年MM月" type="month"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="5">

                      <Input v-model="item.insuredEndTime"    placeholder="yyyy-MM"></Input>
                      <!-- <DatePicker v-model="item.insuredEndTime" format="yyyy年MM月" type="month"
                                  placeholder="选择日期" ></DatePicker> -->
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalInsured')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalInsured')">保存</Button>
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
                      <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalCreditTitle')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCreditTitle" :key="index">
                <Row>
                    <Col span="12">
                     <Input v-model='item.titleRemark'></Input>
                    </Col>
                    <Col span="7">
                      <Input v-model='item.titleYear'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalCreditTitle')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalCreditTitle')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalRecruitment')"></Button>
                    </Col> -->
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalRecruitment" :key="index">
                <Row>
                    <Col span="6">
                     <Input v-model='item.recruitmentNum'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.recruitmentTime'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.recruitmentMoney'></Input>
                    </Col>
                    <!-- <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalRecruitment')"></Button>
                    </Col> -->
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalRecruitment')">保存</Button>
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
                      <Select v-model="item.socialMoral">
                        <Option v-for="(item,index) in socialMoralList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="6">
                     <Input v-model="item.businessHistory"></Input>
                    </Col>
                    <Col span="3">
                      <Select v-model="item.businessCase">
                        <Option v-for="(item,index) in businessCaseList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isCourtBlackList">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isBusinessBlackList">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                    <Col span="4">
                      <i-switch v-model="item.isCourtExecute">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalOtherinfo')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalAwardsPunishments')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalAwardsPunishments" :key="index">
                <Row>
                    <Col span="6">

                      <Select v-model="item.awardsPunishmentsType">
                        <Option v-for="(item,index) in awardsPunishmentsTypeList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                     <!-- <Input v-model='item.awardsPunishmentsType'></Input> -->
                    </Col>
                    <Col span="8">
                      <Input v-model='item.awardsPunishmentsName'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.awardsPunishmentsTime'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalAwardsPunishments')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalAwardsPunishments')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalCreditRating')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalCreditRating" :key="index">
                <Row>
                    <Col span="6">

                      <Select v-model="item.creditRatingType">
                        <Option v-for="(item,index) in creditRatingTypeList" :key="index" :value="item.id" >{{item.value}}</Option>
                      </Select>
                     <!-- <Input v-model='item.creditRatingType'></Input> -->
                    </Col>
                    <Col span="8">
                      <Input v-model='item.creditRatingLevel'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.creditRatingTime'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalCreditRating')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalCreditRating')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalPatent')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPatent" :key="index">
                <Row>
                    <Col span="6">
                     <Input v-model='item.patentName'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.patentId'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.patentGetTime'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalPatent')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalPatent')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalPayment')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPayment" :key="index">
                <Row>
                    <Col span="6">
                     <Input v-model='item.paymentMonth'></Input>
                    </Col>
                    <Col span="6">
                     <Input v-model='item.paymentAmount'></Input>
                    </Col>
                    <Col span="6">
                     <Input v-model='item.paymentType'></Input>
                    </Col>
                    <Col span="5">
                      <Input v-model='item.useNum'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalPayment')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" type="success" icon="" size="large" @click="save('villagePersonalPayment')">保存</Button>
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
                     <Button icon="plus-round" :disabled="readOnly" type="info" @click="addLine('villagePersonalPurchasing')"></Button>
                    </Col>
                </Row>
              </li>
              <li class="content-list" v-for="(item,index) in villagePersonalPurchasing" :key="index">
                <Row>
                    <Col span="6">
                     <Input v-model='item.purchasingCommodity'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.purchasingAmount'></Input>
                    </Col>
                    <Col span="8">
                      <Input v-model='item.purchasingTime'></Input>
                    </Col>
                    <Col span="1">
                      <Button icon="minus-round" :disabled="readOnly" type="error" @click="deleteLine('villagePersonalPurchasing')"></Button>
                    </Col>
                </Row>
              </li>
            </ul>
            <Button class="save-btn" v-if="!readOnly" :disabled="pageState=='new'" :title="pageState=='new'?'请先完成基本信息保存':''"  type="success" icon="" size="large" @click="save('villagePersonalPurchasing')">保存</Button>
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
        if (!value) {
          callback(new Error('请选择所在区域'));
        } else {
          callback();
        }
      };
      return {
        divisionError:false,
        saveLoading:false,
        changeOnSelect: false,
        pageState:"new",
        title:"添加农户",
        villagePersonalBaseinfo: {
          gender:"",
          maritalStatus:"",
          managerLevel:""
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
          divisionId:[
            {validator: validateDivisions, trigger: 'change', required: true}
          ]
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
         this.divisionError = false;
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
                      this.$router.push({name:"VillageFarmerUpdate",query:{id:res.data}})
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
              this.villagePersonalBaseinfo = this.villagePersonalBaseinfoDetailVo;
              if(String(this.villagePersonalBaseinfo.divisionId).length<12){
                  this.divisionError = true;
              }
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
