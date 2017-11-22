/**
* Created by zhaowei on 2017/9/7.
*/

<template>
  <div class="BankingDetailed">
    <Loading v-show="loading"></Loading>
    <Breadcrumb style=" margin-bottom: 15px;">
      <BreadcrumbItem href="/user/banking"> 金融机构管理</BreadcrumbItem>
      <BreadcrumbItem>{{orgName}}</BreadcrumbItem>
    </Breadcrumb>
    <BankingEdit :org-item-data.sync="orgDetail" show-type="1"></BankingEdit>
  </div>
</template>

<script>
  import userServer from 'rs/userServer';
  import BankingEdit from '@/components/user/BankingEdit';
  export default {
    name: 'BankingDetailed',
    data () {
      return {
        orgDetail:{},
        loading:false,
        orgId: this.$route.params.orgId,
        orgName:this.$route.params.orgName,
        tabsName:'BankingDetailed'
      }
    },
    created:function () {
      this.getOrgDetail();
    },
    components:{
      'BankingEdit':BankingEdit
    },

    methods: {
      getOrgDetail (){

        this.loading = true;
        userServer.findOrgList({
          params3: 1,
          params4: 1,
        }, {
          name: this.orgName,
        }, response=> {
          this.loading = false;
          if (response.errorCode == 0) {
            this.orgDetail = response.data.pageData[0];
          } else {
            this.$Message.error('获取数据失败!');
          }

        }, err=> {
          this.loading = false;
        })
      },
    }

  }
</script>

<style scoped lang='less'>
  .BankingDetailed {
  }
</style>
