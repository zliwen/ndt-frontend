/**
* 金融机构贷款申请管理
* Created by chenchen on 2017/9/7.
*/

<template>
  <div class="FinanceLoanApplyState">
    <Loading v-show="loading"></Loading>
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/banking/financeloan-apply"> 贷款申请管理</BreadcrumbItem>
      <BreadcrumbItem>贷款申请管理</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div class="detail">
      <div class="ivu-steps ivu-steps-vertical">
        <div class="ivu-steps-item ivu-steps-status-finish">

          <div class="ivu-steps-tail">
            <i></i>
          </div>
          <div class="ivu-steps-head">
            <div class="ivu-steps-head-inner">
              <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark-empty"></span>
            </div>
          </div>
          <div class="ivu-steps-main">
            <div class="ivu-steps-title">提交申请</div>
            <div class="ivu-steps-content">
              <Row>
                <Col span="8">
                <span class="label">业务号:</span>
                <b>{{data.id}}</b>
                </Col>
                <Col>
                <span class="label">申请产品:</span>
                <b>{{data.productName}}</b>
                </Col>
                <Col  span="8">
                <span class="label">贷款主体</span>
                <div style="margin-left: 20px;">
                  <p>申请人：{{data.name}}</p>
                  <p>类型：{{data.userTypeValue|codeName}}</p>
                  <p>地址：
                    <span v-for="(item,index) in data.adminDivisionIdValue" :key="item">{{item}}
                      <i v-if="index!==data.adminDivisionIdValue.length-1">,</i>
                    </span>
                  </p>
                  <p>电话：{{data.mobile}}</p>
                </div>
                </Col>
                <Col  span="8">
                <span class="label">贷款信息</span>
                <div style="margin-left: 20px;">
                  <p>金额：{{data.applyAmount+data.applyAmountUnitValue}}</p>
                  <p>期限：{{data.applyTerm+data.applyTermUnitValue}}</p>
                  <p>方式：
                    <span v-for="(item,index) in data.guaranteeType" :key="item">{{item|codeName}}
                     <i v-if="index!==data.guaranteeType.length-1">,</i>
                    </span>
                  </p>
                  <p>用途：{{data.applyPurpose|codeName}}</p>
                  <p>申请时间：{{data.createAt | date}}</p>
                </div>
                </Col>
                <Col  span="8">
                <span class="label">状态:</span>
                <b>{{data.stateValue}}</b>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div class="ivu-steps-item" v-if="index" v-for="(item,index) in stepList"
             :class="{'ivu-steps-status-finish': item.status=='finish',
               'ivu-steps-status-wait': item.status=='wait',
               'ivu-steps-status-process': item.status=='process',
               'ivu-steps-status-error': item.status=='error',
               'ivu-steps-status-no': item.status=='no'}" :key="index">
          <div class="ivu-steps-tail">
            <i></i>
          </div>
          <div class="ivu-steps-head">
            <div class="ivu-steps-head-inner">
              <span v-if="item.status=='finish'" class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark-empty"></span>
              <span v-if="!item.status||item.status=='wait'||item.status=='process'">{{index+1}}</span>
              <span v-if="item.status=='error'" class="ivu-steps-icon ivu-icon ivu-icon-ios-close-empty"></span>

            </div>
          </div>
          <div class="ivu-steps-main">
            <div class="ivu-steps-title">{{item.nodeName}}</div>
            <div class="ivu-steps-content">
              <Row>
                <Col span="12" style="min-height: 50px;">
                {{item.msg}}</Col>
                <Col v-if="item.status=='process'" span="12" style="text-align: center">
                <Input v-model="item.msg" type="textarea" :rows="3" placeholder="请输入..."
                       style="margin: 20px 0;"></Input>
                <Button type="warning" @click="btnClick(item,item.btnK1,1)" v-if="item.btn1">{{item.btn1}}</Button>
                <Button type="success" @click="btnClick(item,item.btnK2,0)" v-if="item.btn2">{{item.btn2}}</Button>
                <Button type="warning" @click="btnClick(item,item.btnK3,1)" v-if="item.btn3">{{item.btn3}}</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="detail">
        <Row>
          <Col span="8" class="left">
            <p>
              贷款流水号：{{data.id}}
            </p>
            <h2>{{currentStep.nodeName||currentStep.stateValue}}</h2>
            <div class="btnbox"><Button v-if="currentStep.btn1" @click="btnClick(currentStep,currentStep.btnK1,1)" style="width:120px;" type="default">{{currentStep.btn1}}</Button></div>
            <div class="btnbox"><Button v-if="currentStep.btn3" @click="btnClick(currentStep,currentStep.btnK3,1)"  style="width:120px;" type="default">{{currentStep.btn3}}</Button></div>
            <div class="btnbox"><Button v-if="currentStep.btn2" @click="btnClick(currentStep,currentStep.btnK2,0)" style="width:120px;" type="info">{{currentStep.btn2}}</Button></div>
          </Col>

          <Col span="16" class="right">
            <Row>
              <Col v-for="(item,index) in stepList" :key="index" span="6" :class="{'cur':item.current,'right-flow':index>=4,'right-up':index==3,'right-down':index==4}" class="list-item-box">
                  <div class="list-item" >
                      <i :class="item.class" class="list-icon"></i>
                      <p class="node-name">{{item.nodeName||item.stateValue}}</p>
                      <p class="time" v-if="item.createTime">{{item.createTime|date}}</p>
                  </div>
              </Col>
            </Row>
              <!-- <div v-for="(item,index) in stepList" :key="index" class="list-item">
                  <i :class="item.class" class="list-icon"></i>
                  <p class="node-name">{{item.nodeName}}</p>
                  <p class="time" v-if="item.createTime">{{item.createTime}}</p>
              </div> -->
          </Col>
        </Row>
    </div>
    <detailBox  :stepList="stepListArray" :data="data" style="margin-top:20px;"></detailBox>
     <Modal
      v-model="textModal"
      :mask-closable="true"
      :styles="{top: '200px'}"
      :transfer ='false'
      @on-ok="modalSubmit"
      ok-text="确认"
      cancle-text="取消"
      width="600">
          <Input type="textarea" v-model="modalText" :rows="4" style="resize:none"  :placeholder="modalPlaceHolder"></Input>
     </Modal>
  </div>
</template>

<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import loanFlowSyncServer from 'rs/loanFlowSyncServer';
  import loanFlowServer from 'rs/loanFlowServer';
  import detailBox from './FinanceLoanApplyDetailBox';
  import {formatDate} from "@/filters/date";
  export default {
    components:{detailBox},
    name: 'FinanceLoanApplyState',
    data () {
      return {
        modalText:"",
        textModal:false,
        modalPlaceHolder:"",
        modalSubmitKey:0,
        describe: "",
        loading: false,
        data: {},
        stepListArray:[],
        currentStep:{},
        stepList: [
          {
            current:true,
            createTime:"",
            class:["tj"],
            nodeName: "提交申请",
            status: "finish",//可选值为wait、process、finish、error
            msg: "",
            nodeCode: 1,
            btnK2: 1,
            icon: ""
          },
          {
            class:["sl"],
            nodeName: "受理",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 2,
            btn1: "受理驳回",
            btnK1: 2,
            btn2: "已受理",
            btnK2: 3,
            btn3: "拒绝受理",
            btnK3: 4
          },
          {
            class:["dd"],
            nodeName: "贷前尽职调查",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 3,
            btn1: "调查驳回",
            btnK1: 5,
            btn2: "已调查",
            btnK2: 6,
            btn3: "拒绝调查",
            btnK3: 7,
          },
          {
            class:["cs"],
            nodeName: "银行初审",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 3,
            btn1: "初审驳回",
            btnK1: 8,
            btn2: "已初审",
            btnK2: 9,
            btn3: "拒绝初审",
            btnK3: 10,
          },
          {
            class:["fs"],
            nodeName: "银行复审",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 4,
            btn1: "复审驳回",
            btnK1: 11,
            btn2: "已复审",
            btnK2: 12,

          },
          {
            class:["hq"],
            nodeName: "合同签订",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 5,
            btn3: "签订合同失败",
            btnK3: 14,
            btn2: "已签订合同",
            btnK2: 13,


          },
          {
            class:["fk"],
            nodeName: "放款",
            status: null,
            msg: "",
            icon: "",
            nodeCode: 6,
            btn2: "已放款",
            btnK2: 15,

          }
        ],
        activeTep: {}
      }
    },
    created: function () {
      this.getDetail();
      this.getDict();
      this.getState();
    },
    methods: {
      btnClick(item, key, err){
        this.textModal = true;
        this.modalSubmitKey = key;
        this.modalText = "";
        if(err){
          this.modalPlaceHolder = "请填写驳回原因";
        }
        else{
          this.modalPlaceHolder = "请填写通过理由";
        }
      },
      modalSubmit(){
          if (this.modalText=="") {
            this.$Message.error('必须填写描述!');
            return
          }
          loanFlowServer.review({}, {
            orgId: parseInt(this.data.orgId),
            userId: parseInt(this.session.get("userId")),
            recordId: parseInt(this.data.id),
            productId: parseInt(this.data.productId),
            reviewStatus: this.modalSubmitKey,
            reviewOpinion: this.modalText + ""
          }, response => {
            this.getState();
            this.getDetail();
          })
      },
      getDict(){
        this.getCodeTable('38', data => {
          this.userTypeList = data;
        });
      },
      getState(){
        loanFlowSyncServer.list({
          params2: 1,
          params3: 100
        }, {
          invitationId: parseInt(this.$route.params.id)
        }, response => {

          if (response.data && response.data && response.data.pageData.length) {
            this.stepListArray =JSON.parse(JSON.stringify(response.data.pageData)) ;
            response.data.pageData.reverse().forEach((item, index) => {
              this.stepList.forEach(obj => {
                if (item.state && item.state == obj.btnK2) {
                  obj.current = true;
                  obj.createTime = item.createAt;
                  obj.status = "finish";
                }
                else if(item.state && (item.state == obj.btnK1 || item.state == obj.btnK3)) {
                  obj.current = true;
                  obj.createTime = item.createAt;
                  obj.status = "error";
                }
              });
            });
            let index = 0, back = false;
            this.stepList.forEach((obj, i) => {
              if (obj.status == "finish") index = i + 1;
              if (obj.status == 'error') back = true;
            });
            if (!back && this.stepList[index]) this.currentStep = this.stepList[index];
            else if(back)  this.currentStep = {nodeName:"流程已中止"}
            else this.currentStep = {nodeName:"流程已结束"}

          }
        }, err => {
          this.$Message.error("请求申请状态失败！")

        })
      },
      getDetail(){
        loanInvitationServer.detailById({
          id: this.$route.params.id
        }, {}, response => {
            if(response.data){
              this.data = response.data;
            }else {
              this.$Message.error("请求贷款信息失败！")
            }
        }, err => {
          this.$Message.error("请求贷款信息失败！")
        })
      }

    }
  }
</script>

<style lang='less'>
@nomal-top1 : -9px;
@nomal-top2 : -45px;

@cur-top1 : -110px;
@cur-top2 : -146px;

  .FinanceLoanApplyState {

    .detail {
      background: #fff;
      border: 1px solid #efefef;
      border-radius: 6px;
      padding: 10px 20px 30px;
      .left{
        text-align: center;
        p{
          margin-top: 20px;
          color:#909090;
        }
        h2{
          font-size: 28px;
          letter-spacing: 4px;
          font-weight: 100;
          margin: 40px 0 32px;
        }
        .btnbox{
          padding: 5px 0 ;
          margin: 5px 0 10px;
        }
      }
      .right{
          .list-item-box{
            position: relative;
          }
          .list-item-box::after{
            content:"";
            height: 0;
            width: 100%;
            border-top:4px dotted #bfbfbf;
            display: block;
            position: absolute;
            top:10px;
            right:0px;
            z-index: 1;
          }
          .list-item-box.cur::after{
            border-color: #ff8e33;
          }
          .list-item-box.right-flow{
            float: right;
          }
          .list-item-box.right-up::after{
            content:"";
            height: 55px;
            width: 70%;
            border-top:4px dotted #bfbfbf;
            border-right:4px dotted #bfbfbf;
            border-top-right-radius: 26px;
            display: block;
            position: absolute;
            top:10px;
            left:0;
            z-index: 1;
          }
          .list-item-box.right-up::before{
            content:"";
            height: 10px;
            width: 10px;
            border-radius: 5px;
            background-color:#bfbfbf;
            display: block;
            position: absolute;
            top:70px;
            left:70%;
            transform: translateX(-7px);
            z-index: 1;
          }
          .list-item-box.cur.right-up::before{
              background-color: #ff8e33;
          }
          .list-item-box.cur.right-up::after,.list-item-box.cur.right-down::after{
            border-color:#ff8e33;
          }
          .list-item-box.right-down::after{
            content:"";
            height: 50px;
            width: 70%;
            border-bottom:4px dotted #bfbfbf;
            border-right:4px dotted #bfbfbf;
            border-top:0;
            border-bottom-right-radius: 26px;
            display: block;
            position: absolute;
            top:-35px;
            left:0;
            z-index: 1;
          }
          .list-item{
              background-color: #fff;
              z-index: 2;
              position: relative;
              display: inline-block;
              width: 80px;
              height: 120px;
              p{
                text-align: center;
                color:#bfbfbf;
              }
              .list-icon{
                  display: block;
                  margin: 0 auto;
                  width: 30px;
                  height: 30px;
                  margin-bottom: 10px;
                  background-image:url('../../assets/images/icos.png');
              }
              .list-icon.tj{
                  background-position: -8px @nomal-top1;
              }
              .list-icon.sl{
                  background-position: -50px @nomal-top1;
              }
              .list-icon.dd{
                  background-position: -92px @nomal-top1;
              }
              .list-icon.cs{
                  background-position: -135px @nomal-top1;
              }
              .list-icon.fs{
                  background-position: -178px @nomal-top1;
              }
              .list-icon.hq{
                  background-position: -178px @nomal-top2;
              }
              .list-icon.fk{
                  background-position: -137px @nomal-top2;
              }
          }
          .list-item-box.cur{
            p{
              color: #333;
            }
            .list-icon.tj,.list-icon.cs,.list-icon.dd,.list-icon.sl,.list-icon.fs{
                background-position-y: @cur-top1;
            }
            .list-icon.hq,.list-icon.fk{
                background-position-y: @cur-top2;
            }
          }
      }
    }

    .ivu-steps-status-no .ivu-steps-title {
      color: #bbb;
    }

  }

</style>
