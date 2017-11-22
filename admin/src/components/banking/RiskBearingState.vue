/**
* 风险申请管理
* Created by chenchen on 2017/9/29.
*/

<template>
  <div class="RiskBearingState">
    <Loading v-show="loading"></Loading>
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/banking/financeloan-apply"> 贷款申请管理</BreadcrumbItem>
      <BreadcrumbItem>贷款申请管理</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div class="detail">
      <div class="ivu-steps ivu-steps-vertical">
        <div class="ivu-steps-item" v-for="(item,index) in stepList"
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
              <Row style="min-height: 40px;">
                <Col  v-if="item.status!='process'" span="16" >
                  <span >{{item.msg}}</span>
                </Col>
                <Col span="16" style="margin-top:5px; margin-bottom:5px; color:#606060;">
                  <p v-for="(o,i) in item.filesJson" :key="i" >{{o.name}}<a :href="o.url"> 点击下载</a></p>
                </Col>
                <Col v-if="item.status=='process'" span="16" style="text-align: center">
                  <Input v-model="item.msg" type="textarea" :rows="2" placeholder="请输入..." style="margin: 20px 0;"></Input>
                  <div v-if="item.nodeCode==5" style="margin: 5px 0; text-align:left">
                    <label>放款金额</label>
                    <InputNumber style="display:inline-block; width:300px; margin-left:10px;" v-model="Amount" :min="1" placeholder="放款金额"></InputNumber>
                    <label style="color:#909090;margin-left:10px;">元</label>
                  </div>
                  <div v-if="item.nodeCode==3" style="margin: 5px 0; text-align:left">
                    <label>上传审计结果</label>
                    <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:middle;" name="审计报告" :on-success="fileSuccess"  :action="uploadUrl" >
                       <Button class="upbtn" type="ghost" :disabled="uploadDisabled">{{uploadText}}</Button>
                    </Upload>
                  </div>
                  <div v-if="item.nodeCode==4" style="margin: 5px 0; text-align:left">
                    <label>上传拨付通知书</label>
                    <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:middle;" name="拨付通知书" :on-success="fileSuccess"  :action="uploadUrl" >
                       <Button class="upbtn" type="ghost" :disabled="uploadDisabled">{{uploadText}}</Button>
                    </Upload>
                  </div>
                  <Button type="success" @click="btnClick(item,item.btnK1,1)" v-if="item.btn1">{{item.btn1}}</Button>
                  <Button type="warning" @click="btnClick(item,item.btnK2,0)" v-if="item.btn2">{{item.btn2}}</Button>
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
            <h2>{{currentStep.nodeName}}</h2>
            <div class="btnbox"><Button v-if="currentStep.btn1" @click="btnClick(currentStep,currentStep.btnK1,1)" style="width:120px;" type="info">{{currentStep.btn1}}</Button></div>
            <div class="btnbox"><Button v-if="currentStep.btn3" @click="btnClick(currentStep,currentStep.btnK3,1)"  style="width:120px;" type="info">{{currentStep.btn3}}</Button></div>
            <div class="btnbox"><Button v-if="currentStep.btn2" @click="btnClick(currentStep,currentStep.btnK2,0)" style="width:120px;" type="default">{{currentStep.btn2}}</Button></div>
          </Col>

          <Col span="16" class="right">
            <Row>
              <Col v-if="riskShareFlowName!='二次风险分担'" v-for="(item,index) in stepList" :key="index" span="6"
                   :class="{'cur':item.current,'right-flow':index>=4,'right-up':(index==3&&riskShareFlowName!='二次风险分担'),
                   'right-down':index==4}" class="list-item-box">
                  <div class="list-item" >
                      <i :class="item.class" class="list-icon"></i>
                      <p class="node-name">{{item.nodeName}}</p>
                      <p class="time" v-if="item.createTime">{{item.createTime|date}}</p>
                  </div>
              </Col>
              <Col v-if="riskShareFlowName=='二次风险分担'" v-for="(item,index) in stepList" :key="index" span="6"
                   :class="{'cur':item.current,'list-item-box':index<3}"
                   class="">
              <div class="list-item" >
                <i :class="item.class" class="list-icon"></i>
                <p class="node-name">{{item.nodeName}}</p>
                <p class="time" v-if="item.createTime">{{item.createTime|date}}</p>
              </div>
              </Col>
            </Row>
          </Col>
        </Row>
    </div>

    <detailBox
      :data="data"
      :stepList="doneStepList"
      :cancleBtn="false"
      :submitBtn="false"></detailBox>

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
            <div v-if="currentStep.nodeCode==5" style="margin: 5px 0; text-align:left">
              <label>放款金额</label>
              <InputNumber style="display:inline-block; width:300px; margin-left:10px;" v-model="Amount" :min="1" placeholder="放款金额"></InputNumber>
              <label style="color:#909090;margin-left:10px;">元</label>
              <p style="line-height:32px; margin-top:5px;"><label>金额大写</label><b style="margin-left:20px;">{{Amount|formatterMoney}}</b></p>
            </div>
            <div v-if="currentStep.nodeCode==3" style="margin: 5px 0; text-align:left">
              <label>上传审计结果</label>
              <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:middle;" name="审计报告" :on-success="fileSuccess"  :action="uploadUrl" >
                  <Button class="upbtn" type="ghost">{{uploadText}}</Button>
              </Upload>
              <span>{{uploadFileName}}</span>
            </div>
            <div v-if="currentStep.nodeCode==4&&modalSubmitKey" style="margin: 5px 0; text-align:left">
              <label>上传拨付通知书</label>
              <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:middle;" name="拨付通知书" :on-success="fileSuccess"  :action="uploadUrl" >
                  <Button class="upbtn" type="ghost">{{uploadText}}</Button>
              </Upload>
              <span>{{uploadFileName}}</span>
            </div>

    </Modal>
  </div>
</template>

<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import riskshareServer from 'rs/riskshareServer';
  import userServer from 'rs/userServer';
  import {formatDate} from "@/filters/date";
  import detailBox from './RiskBearingDetail';
  export default {
    components:{detailBox},
    name: 'RiskBearingState',
    data () {
      return {
        uploadUrl:"/v1/file/upload",
        downloadUrl:"/v1/file/download/",
        uploadFileName:"",
        loading: false,
        uploadFileDown:false,
        uploadText:"选择文件",
        riskShareFlowName:this.$route.params.riskShareFlowName,
        data: {},
        files:[],
        // 弹窗属性
        modalText:"",
        textModal:false,
        modalPlaceHolder:"",
        modalSubmitKey:0,
        Amount:0,
        amountShow:false,

        doneStepList:[],
        currentStep:{},
        stepList:[],
        stepList2: [
          {
            nodeName: "申请",
            status: "finish",//可选值为wait、process、finish、error
            msg: "",
            class:["tj"],
            nodeCode: 0,
            btnK1: 4402,
            icon: ""
          },
          {
            nodeName: "初审",
            class:["cs"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 1,
            btn1: "初审通过",
            btnK1: 4403,
            btn2: "初审驳回",
            btnK2: 4408,
          },
          {
            nodeName: "复审",
            class:["fs"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 2,
            btn1: "复审通过",
            btnK1: 4404,
            btn2: "复审驳回",
            btnK2: 4408,
          },
          {
            nodeName: "审计",
            class:["sj"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 3,
            btn1: "审计通过",
            btnK1: 4405,
            btn2: "审计驳回",
            btnK2: 4408,
          },
          {
            nodeName: "审议",
            status: null,
            class:["sy"],
            msg: "",
            icon: "",
            nodeCode: 4,
            btn1: "审议通过",
            btnK1: 4406,
            btn2: "审议驳回",
            btnK2: 4408,

          },
          {
            nodeName: "拨款",
            class:["fk"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 5,
            btnK1:  4407,
            btn1: "已放款",
          },
          {
            nodeName: "结束",
            class:["js"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 6,
            btnK1:  4408,
            btn1: "手动结束",
          }
        ],
        stepList1:[
          {
            nodeName: "申请",
            status: "finish",//可选值为wait、process、finish、error
            msg: "",
            class:["tj"],
            nodeCode: 0,
            btnK1: 4402,
            icon: ""
          },
          {
            nodeName: "审议",
            status: null,
            class:["sy"],
            msg: "",
            icon: "",
            nodeCode: 4,
            btn1: "审议通过",
            btnK1: 4406,
            btn2: "审议驳回",
            btnK2: 4408,

          },
          {
            nodeName: "拨款",
            class:["fk"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 5,
            btnK1:  4407,
            btn1: "已放款",
          },
          {
            nodeName: "结束",
            class:["js"],
            status: null,
            msg: "",
            icon: "",
            nodeCode: 6,
            btnK1:  4408,
            btn1: "手动结束",
          }
        ],
        activeTep: {}
      }
    },
    created: function () {
        if(this.riskShareFlowName=="二次风险分担"){
            this.stepList=this.stepList1;
        }else {
          this.stepList=this.stepList2;
        }
      // 判断是否有详情id。
      if(this.$route.params.id == undefined){
        this.$router.push({name:"RiskBearing"});
        return;
      }
      // 判断是否是开发环境
      let host = window.location.host;
      if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
          this.uploadUrl = "http://192.168.1.42:18080/v1/file/upload"
          this.downloadUrl = "http://192.168.1.42:18080/v1/file/download/"
      }
      this.getDetail();
      this.getDict();
      // this.getStep();
    },
    methods: {
      fileSuccess(response,file){
          this.uploadFileDown=true
          this.uploadText="替换文件"
          this.uploadFileName = file.name;
          let retData ={};
          if(response.errorCode == 0&&response.data&&response.data.length>0){
              let fileId = response.data[0].fileId;
              let flag = true;
              for(let o in this.files){
                  if(o.name == response.data[0].inputName){
                    flag = false;
                     o.url =  this.downloadUrl+fileId
                  }
              }
              if(flag){
                this.files.push({
                  name:response.data[0].inputName,
                  url:this.downloadUrl+fileId,
                })
              }
          }
      },
      btnClick(item, key, pass){
        this.textModal = true;
        this.uploadFileDown = false;
        this.modalText = "";
        this.modalSubmitKey = !!pass;
        if(pass){
          this.modalPlaceHolder = "请填写通过理由";
        }
        else{
          this.modalPlaceHolder = "请填写驳回原因";
        }
      },
      modalSubmit(){
        if (this.modalText=="") {
          this.$Message.error('必须填写描述!');
          return
        }
        if(this.modalSubmitKey && this.currentStep.nodeCode == 3 &&  !this.uploadFileDown){
          this.$Message.error('请上传审计结果!');
          return
        }
        if(this.modalSubmitKey && this.currentStep.nodeCode == 4 &&  !this.uploadFileDown){
          this.$Message.error('请上传拨付通知书!');
          return
        }
        riskshareServer.reviewFlow({}, {
          riskshareApplyId:this.$route.params.id,
          handlerFiles:JSON.stringify(this.files),
          isPass:this.modalSubmitKey,
          msg:this.modalText,
          amount:this.Amount,
        }, response => {
            if(response.errorCode == 0){
              this.$Message.success("操作成功！");
              this.$router.push({name:"RiskBearing"});
            }
            else{
              this.$Message.error("操作失败！");
            }
        })

      },
      getDict(){
        this.getCodeTable('38', data => {
          this.userTypeList = data;
        });
      },
      getStep(){
        riskshareServer.stepDetail({
        }, {
          riskshareApplyId: this.$route.params.id
        }, response => {
          if (response.data && response.data.pageData && response.data.pageData.length) {
            this.doneStepList = JSON.parse(JSON.stringify(response.data.pageData)).reverse();
            this.stepList.forEach(obj => {
            });
            response.data.pageData.forEach((item, index) => {
              this.stepList.forEach(obj => {

                if (item.state && item.state == obj.btnK1) {
                  obj.current = true;
                  obj.createTime = item.createAt;
                  obj.status = "finish";
                }
                else if(item.state && item.state == obj.btnK2) {
                  obj.current = true;
                  obj.createTime = item.createTime;
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

        })
      },
      getDetail(){
        riskshareServer.detailById({
          riskshareApplyId: this.$route.params.id
        }, {
        }, response => {
          this.data = response.data;
          this.getStep();
        }, err => {

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

  .RiskBearingState {

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
              .list-icon.cs{
                  background-position: -135px @nomal-top1;
              }
              .list-icon.fs{
                  background-position: -178px @nomal-top1;
              }
              .list-icon.sj{
                  background-position: -50px @nomal-top1;
              }
              .list-icon.sy{
                  background-position: -92px @nomal-top1;
              }
              .list-icon.fk{
                  background-position: -137px @nomal-top2;
              }
              .list-icon.js{
                  background-position: -50px @nomal-top2;
              }
          }
          .list-item-box.cur{
            p{
              color: #333;
            }
            .list-icon.tj,.list-icon.sy,.list-icon.cs,.list-icon.sj,.list-icon.fs{
                background-position-y: @cur-top1;
            }
            .list-icon.fk,.list-icon.js{
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
