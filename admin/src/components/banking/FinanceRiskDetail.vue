/**
* 风险申请管理
* Created by chenchen on 2017/9/29.
*/

<template>
  <div class="FinanceLoanApplyState">
    <Loading v-show="loading"></Loading>
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/banking/financeloan-apply"> 风险分担申请</BreadcrumbItem>
      <BreadcrumbItem>风险分担申请详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- <div class="detail">
        <div class="ivu-steps ivu-steps-vertical">
            <div class="ivu-steps-item" :class="{'ivu-steps-status-finish': data.state != 4401,
                  'ivu-steps-status-process': data.state == 4401}">
                <div class="ivu-steps-tail">
                    <i></i>
                </div>
                <div class="ivu-steps-head">
                    <div class="ivu-steps-head-inner">
                        <span class="ivu-steps-icon ivu-icon ivu-icon-ios-checkmark-empty"></span>
                    </div>
                </div>
                <div class="ivu-steps-main">
                    <div class="ivu-steps-title">申请</div>
                    <div class="ivu-steps-content">
                        <Row>
                            <Col span="8">
                                <span class="label">业务号：</span> <b>{{data.id}}</b>
                                <p>贷款主体：{{data.userName}}</p>
                            </Col>
                            <Col  span="8">
                                <div style="margin-left: 20px;">
                                </div>
                            </Col>
                            <Col  span="8">
                            <div style="margin-left: 20px;">
                                <p>金额：{{data.loanDoneAmount}}</p>
                                <p>类型：{{data.invitationUserTypeValue}}</p> 
                            </div>
                            </Col>
                            <Col  span="8">
                                <span class="label">状态:</span>
                                <b>{{data.state|codeName}}</b>
                                <p>贷款机构：{{data.orgIdName}}</p>
                            </Col>
                            <Col span="16" style="margin-top:8px; margin-bottom:10px; color:#606060;">
                              <p v-for="(o,i) in data.filesJson" :key="i" >{{o.name}}<a :href="o.url"> 点击下载</a></p> 
                            </Col>
                        </Row>
                        <Button v-if="data.state == 4401" @click="submitApply">提交申请</Button>
                        <Button v-if="data.state == 4402" @click="cancleApply">撤回申请</Button>
                    </div>
                </div>
            </div>
            <div class="ivu-steps-item" v-if="index"  v-for="(item,index) in stepList"
                :class="{'ivu-steps-status-finish': item.status=='finish',
                  'ivu-steps-status-wait': item.status=='wait',
                  'ivu-steps-status-process': item.status=='process',
                  'ivu-steps-status-error': item.status=='error',
                  'ivu-steps-status-no': item.status=='no'}" :key='index'>
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
                  <Row  style="min-height: 40px;">
                    <Col span="16" >
                      <p >
                        <span>{{item.msg}}</span>
                      </p>
                    </Col>
                    <Col span="16" style="color:#606060; margin-bottom:8px;">
                      <p v-for="(o,i) in item.filesJson" :key="i" >{{o.name}}<a :href="o.url"> 点击下载</a></p> 
                    </Col>
                    <Col span="16" v-if="item.nodeCode == 5 && item.status=='finish'" style="color:#606060; margin-bottom:8px;">
                      <span style="color:#606060">拨款金额： {{item.amount}} 元</span>
                    </Col>
                    <Col span="16" v-if="item.nodeCode!=6 && item.status=='finish'">
                      <p >
                        <span>审核人：{{item.handlerName}}</span>
                        <span style=" margin-left:5px;">审核时间：{{item.createTime}}</span>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
        </div>
    </div> -->
    <detailBox
      :data="data"
      :stepList="stepList" 
      :cancleBtn="cancleBtn" 
      :submitBtn="submitBtn" 
      :submitApply="submitApply"
      :cancleApply="cancleApply"></detailBox>
    <Modal
      v-model="modalShow"
      title="上传资料"
      class="sub-modal"
      :mask-closable="false"
      :styles="{top: '50px'}"
      :transfer ='false'
      width="700">
        <div style=" margin-left:100px; height:40px; line-height:40px;">
          <span style="display:inline-block;width:120px; text-align:right;">借款合同：</span>
          <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:top;" name="借款合同" :on-success="fileSuccess"  :action="uploadUrl" >
            <Button class="upbtn" type="ghost" style="display:inline-block;width:120px;" :disabled="uploadDisabled">{{uploadText.jk}}</Button>
          </Upload>
          <span class="file-name-preview" >{{uploadFileName.jk}}</span>
        </div>
        <div style=" margin-left:100px; height:40px; line-height:40px;">
          <span style="display:inline-block;width:120px; text-align:right;">抵质押合同：</span>
          <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:top;" name="抵质押合同" :on-success="fileSuccess"  :action="uploadUrl" >
            <Button class="upbtn" type="ghost" style="display:inline-block;width:120px;" :disabled="uploadDisabled">{{uploadText.zy}}</Button>
          </Upload>
          <span class="file-name-preview" >{{uploadFileName.zy}}</span>
        </div>
        <div style=" margin-left:100px; height:40px; line-height:40px;">
          <span style="display:inline-block;width:120px; text-align:right;">催收通知书：</span>
          <Upload  style="" :show-upload-list="false"  style="display:inline-block;vertical-align:top;" name="催收通知书" :on-success="fileSuccess"  :action="uploadUrl" >
            <Button class="upbtn" type="ghost" style="display:inline-block;width:120px;" :disabled="uploadDisabled">{{uploadText.cs}}</Button>
          </Upload>
          <span class="file-name-preview" >{{uploadFileName.cs}}</span>
        </div>
        <div style="margin-left:100px; height:40px; line-height:40px;">
          <span style="display:inline-block;width:120px; text-align:right;">申请金额(元)：</span>
          <InputNumber v-model="applyAmont" style="display:inline-block;width:120px;"></InputNumber>
        </div>
        <div style="margin-left:100px; height:40px; line-height:40px;">
          <span style="display:inline-block;width:120px; text-align:right;">金额大写：</span>
          <b>{{applyAmont|formatterMoney}}</b>
        </div>
        <div class="footer">
            <Button class="save-btn" type="default" icon="" size="large"
                    @click="modalCancle">取消
            </Button>
            <Button class="save-btn" type="info" icon="" size="large"
                    @click="modalSubmit">提交
            </Button>
        </div>
     </Modal>
  </div>
</template>

<script>
  import riskshareServer from 'rs/riskshareServer';
  import {formatDate} from "@/filters/date";
  import detailBox from './RiskBearingDetail';
  export default {
    components:{detailBox},
    name: 'FinanceLoanApplyState',
    data () {
      return {
        uploadUrl:"/v1/file/upload",
        downloadUrl:"/v1/file/download/",
        uploadFileName:{
          zy:'',
          jk:"",
          cs:"",
        },
        applyAmont:1,
        cancleBtn:false,
        submitBtn:false,
        describe: "",
        loading: false,
        modalShow:false,
        uploadDisabled:false,
        uploadText:{
          zy:'点击上传',
          jk:"点击上传",
          cs:"点击上传",
        },
        files:[],
        data: {},
        stepList: [],
        //   {
        //     nodeName: "申请",
        //     nodeCode:0,
        //     status: "finish",//可选值为wait、process、finish、error
        //     msg: "",
        //   },
        //   {
        //     nodeName: "初审",
        //     nodeCode:1,
        //     status: null,
        //     msg: "",
        //     btnK1: 4403,
        //     btnK2: 4408,
        //   },
        //   {
        //     nodeName: "复审",
        //     nodeCode:2,
        //     status: null,
        //     msg: "",
        //     btnK1: 4404,
        //     btnK2: 4408,
        //   },
        //   {
        //     nodeName: "审计",
        //     nodeCode:3,
        //     status: null,
        //     msg: "",
        //     btnK1: 4405,
        //     btnK2: 4408,
        //   },
        //   {
        //     nodeName: "审议",
        //     nodeCode:4,
        //     status: null,
        //     msg: "",
        //     btnK1: 4406,
        //     btnK2: 4408,

        //   },
        //   {
        //     nodeName: "拨款",
        //     nodeCode:5,
        //     status: null,
        //     msg: "",
        //     btnK1: 4407,
        //     btnK2: 4408,
        //   },
        //   {
        //     nodeName: "结束",
        //     nodeCode:6,
        //     status: null,
        //     msg: "",
        //   }
        // ],
        activeTep: {}
      }
    },
    created: function () {
      let host = window.location.host;
      if(host.indexOf("127.0.0.1")>=0||host.indexOf("localhost")>=0){
          this.uploadUrl = "http://192.168.1.42:18080/v1/file/upload"
          this.downloadUrl = "http://192.168.1.42:18080/v1/file/download/"
      }
      if(this.$route.params.id == undefined){
        this.$router.push({name:"FinanceRisk"});
        return;
      }
      this.getDetail();
    },
    methods: {
      submitApply(){
          this.modalShow = true;
      },
      fileSuccess(response,file){
          // this.uploadDisabled=true
          if(response.data[0].inputName=="借款合同"){      
            this.uploadFileName.jk=file.name;
            this.uploadText.jk="点击替换";
          }
          else if(response.data[0].inputName=="抵质押合同"){      
            this.uploadFileName.zy=file.name;
            this.uploadText.zy="点击替换";
          }
          else if(response.data[0].inputName=="催收通知书"){      
            this.uploadFileName.cs=file.name;
            this.uploadText.cs="点击替换";
          }
          if(response.errorCode == 0&&response.data&&response.data.length>0){
              let fileId = response.data[0].fileId;
              let flag = true;
              for(let o of this.files){
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
      modalCancle(){
        this.modalShow = false;
      },
      modalSubmit(){
        console.log(this.files);
        let filsesOk = true;
        for(let o in this.uploadText){
          if(this.uploadText[o] == "点击上传"){
            this.$Message.info("请完整上传所有文件！");
            filsesOk = false;
            break;
          }
        }
        if(filsesOk){
          riskshareServer.startFlow({},{
            riskshareApplyId:this.data.id,
            amount:this.applyAmont,
            handlerFiles:JSON.stringify(this.files)
          },res=>{
            if(res.errorCode == 0){
              this.$Message.success("提交成功")
              this.submitBtn = false;
              this.getDetail();
            }
            else{
              if(res.exceptResult&&res.exceptResult.msg=="user error")
              this.$Message.error("前用户无操作权限！")
              else
              this.$Message.error("提交操作失败！")              
            }
          },err=>{
              this.$Message.error("网络错误")
          })
           this.modalShow = false;
        }
        return;
      },
      cancleApply(){
          this.$Modal.confirm({
              title: '确定撤回申请吗',
              content: '撤回后不可再次申请！',
              onOk: () => {
                  riskshareServer.delete({
                    id:this.data.id,
                  },{
                  },res=>{
                    if(res.errorCode == 0){
                      this.$Message.success("申请已撤回")
                      this.$router.push({name:"FinanceRisk"});
                    }
                    else{
                      this.$Message.error("撤回失败")
                    }
                  },err=>{
                      this.$Message.error("网络错误")
                  })
              },
              onCancel: () => {
              }
          });

      },
      getStep(){
        riskshareServer.stepDetail({
        }, {
          riskshareApplyId: this.$route.params.id
        }, response => {
          if(response.data.pageData){
            this.stepList = response.data.pageData.reverse();
            // for(let i in  response.data.pageData){
            //   let item  = response.data.pageData[i];
            //   let j = Number(i)+1;
            //   this.stepList[i].msg = item.msg;
            //   this.stepList[i].amount = item.amount;
            //   this.stepList[i].filesJson = item.filesJson||item.handlerFilesJson;
            //   this.stepList[i].handlerName = item.handlerName;
            //   this.stepList[i].createTime = item.createTime;
            //   if(item.state!= 4408){
            //     this.stepList[i].status = "finish";
            //     if(this.stepList[j]) this.stepList[j].status = "process";
            //   }
            //   else
            //      this.stepList[i].status = "error";
            // }
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
          if(response.data.state == 4401){
            this.submitBtn = true;
          }
          else if(response.data.state == 4402){
            this.cancleBtn = true;
          }
          if(response.data.state != 4401){
              this.getStep();
          }
        }, err => {

        })
      }

    }
  }
</script>

<style lang='less'>
  .FinanceLoanApplyState {

  .detail {
    background: #fff;
    padding: 20px;
  }
  .file-name-preview{
    width: 260px;
    height: 40px;
    vertical-align: middle;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ivu-steps-status-no .ivu-steps-title {
    color: #bbb;
  }
   .sub-modal{
      .footer{
        text-align: right;
        border-top:1px solid #f0f0f0;
        padding-top: 10px;
        button{
          margin-right: 20px;
        }
      } 
      .ivu-modal-footer{
        display: none;
      }
    }
  }

</style>
