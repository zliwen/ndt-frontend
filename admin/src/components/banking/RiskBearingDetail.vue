/**
* 风险申请管理
* Created by chenchen on 2017/9/29.
*/

<template>
    <div class="detail">
      <Row>
        
        <Col span="8">
          <h3>贷款申请信息</h3>
          <p>
            <span class="label">业务号:</span>
            <b>{{data.id}}</b>
          </p>
          <p>
            <span class="label">贷款机构：</span>
            <b>{{data.orgIdName}}</b>
          </p>
          <p>
            <span class="label">申请分担金额：</span>
            <b>{{ data.applyAmount?data.applyAmount+"元":""}}</b>
          </p>
          <p>
            <span class="label">贷款主体：</span>
            <b>{{data.userName}}</b>
          </p>
          <p>
            <span class="label">主体类型：</span>
            <b>{{data.invitationUserTypeValue}}</b>
          </p>
          <p>
            <span class="label">当前状态：</span>
            <b>{{data.stateValue}}</b>
          </p>
          <p>
            <Button v-if="submitBtn" @click="submitApply">提交申请</Button>
            <Button v-if="cancleBtn" @click="cancleApply">撤回申请</Button>
          </p>
        </Col>
        <Col span="16">
            <ul>
              <li v-for="(item,index) in stepList" :key="index">
                <i :class="{'first':index==0,'last':index==stepList.length-1}"></i>
                <span style="margin-left:10px">{{item.createTime|date}}</span>
                <span style="margin-left:10px">【{{item.stateValue+(item.state==4407?' '+item.amount+'元':'')}}】</span>
                <span style="margin-left:10px">{{item.msg}}</span>
                <span v-if="item.handlerName" style="margin-left:10px">（更新人：{{item.handlerName}}）</span>
                <p style="margin-left:40px" v-for="(o,i) in item.handlerFilesJson" :key="i" >{{o.name}}<a :href="o.url" target="_blank"> 点击下载</a></p> 
                <p style="margin-left:40px" v-for="(o,i) in item.filesJson" :key="i" >{{o.name}}<a :href="o.url" target="_blank"> 点击下载</a></p> 
              </li>
            </ul>
        </Col>
      </Row>
    </div>
</template>

<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import loanFlowSyncServer from 'rs/loanFlowSyncServer';

  export default {
    name: 'FinanceLoanApplyDetail',
    data () {
      return {
        loading: false,
      }
    },
    props:[
      'stepList',
      'data',
      'submitBtn',
      'submitApply',
      'cancleBtn',
      'cancleApply',
    ],
    created: function () {
      
    },
    methods: {
      getDetail(){
        loanInvitationServer.detailById({
          id: this.$route.params.id
        }, {}, response => {
          this.data = response.data;
          this.getState();
        }, err => {

        })
      },
      getState(){
        loanFlowSyncServer.list({
          params2: 1,
          params3: 20
        }, {
          invitationId: parseInt(this.$route.params.id)
        }, response => {

          if (response.errorCode == 0) {
            this.stepList = response.data.pageData;
          }
        }, err => {

        })
      },
    }
  }
</script>

<style scoped lang='less'>
  .detail{
    background: #fff;
    border: 1px solid #efefef;
    border-radius: 6px;
    padding: 20px;
    h3{
      font-size: 14px;
      line-height: 28px;
    }
    p{
      font-size: 12px;
      line-height: 24px;
      .label{
        display: inline-block;
        min-width: 60px;  
      }
    }
    li{
      line-height: 24px;
      min-height: 50px;
      position: relative;
      span{
        vertical-align: middle;
      }
      i{
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #ccc;
        margin-right: 10px;
        vertical-align: middle;
      }
      i.first{
        background-color: #ff8e33;
        box-shadow:0 0 5px 2px #ff8e33;
      }
      i:after{
        content: "";
        display: block;
        position: absolute;
        height: 75%;
        width: 1px;
        background-color: #ccc;
        top:20px;
        left:2px;
      }
      i.last:after{
        display: none;
      }
    }
  }
</style>
