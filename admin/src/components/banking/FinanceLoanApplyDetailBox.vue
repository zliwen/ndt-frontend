/**
* 金融机构贷款申请管理
* Created by chenchen on 2017/10/13.
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
            <span class="label">区域:</span>
            <b>
              {{data.adminDivisionIdValue}}
              <!-- <span v-for="(item,index) in data.adminDivisionIdValue" :key="item">{{item}}
                      <i v-if="index!==data.adminDivisionIdValue.length-1">,</i>
              </span> -->
            </b>
          </p>
          <p>
            <span class="label">申请金额：</span>
            <b>{{data.applyAmount?(data.applyAmount+data.applyAmountUnitValue):"未填写"}}</b>
          </p>
          <p>
            <span class="label">申请期限：</span>
            <b>{{data.applyTerm?(data.applyTerm+data.applyTermUnitValue):"未填写"}}</b>
          </p>
          <p>
            <span class="label">贷款方式：</span>
            <b>
              <span v-for="(item,index) in data.guaranteeType" :key="item">{{item|codeName}}
                     <i v-if="index!==data.guaranteeType.length-1">,</i>
                    </span>
            </b>
          </p>
          <p>
            <span class="label">贷款用途：</span>
            <b>{{data.applyPurpose|codeName}}</b>
          </p>
          <p>
            <span class="label">贷款主体：</span>
            <b>{{data.name}}</b>
          </p>
          <p>
            <span class="label">联系方式：</span>
            <b>{{data.mobile}}</b>
          </p>
          <p>
            <span class="label">申请时间：</span>
            <b>{{data.createAt | date}}</b>
          </p>
        </Col>
        <Col span="16">
            <ul>
              <li v-for="(item,index) in stepList" :key="index">
                <i :class="{'first':index==0,'last':index==stepList.length-1}"></i>
                <span>{{item.syncTime|date}}</span>
                <span style="margin-left:10px">【{{item.nodeName||item.stateValue}}】</span>
                <span style="margin-left:10px">{{item.msg}}</span>
                <span style="margin-left:10px">更新人：{{item.operatorName}}</span>
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
      height: 50px;
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
        height: 36px;
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
