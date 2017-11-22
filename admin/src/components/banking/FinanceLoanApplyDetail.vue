/**
* 金融机构贷款申请管理
* Created by chenchen on 2017/9/7.
*/

<template>
  <div class="FinanceLoanApplyDetail">
    <Loading v-show="loading"></Loading>
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/banking/financeloan-apply"> 贷款申请管理</BreadcrumbItem>
      <BreadcrumbItem>贷款申请详情</BreadcrumbItem>
    </Breadcrumb>
    <detailBox :stepList="stepList" :data="data"></detailBox>
  </div>
</template>

<script>
  import loanInvitationServer from 'rs/loanInvitationServer';
  import loanFlowSyncServer from 'rs/loanFlowSyncServer';
  import detailBox from './FinanceLoanApplyDetailBox';
  export default {
    components:{detailBox},
    name: 'FinanceLoanApplyDetail',
    data () {
      return {
        loading: false,
        data: {},
        stepList:[]
      }
    },
    created: function () {
      this.getDetail();
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

</style>
