<template>
  <div class="patent_container">
    <header class="overflow">
      <img src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEwNkY4NkU4NDI4MDExRTc5RkU0OUZFNzJEMUY5MEY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEwNkY4NkU5NDI4MDExRTc5RkU0OUZFNzJEMUY5MEY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTA2Rjg2RTY0MjgwMTFFNzlGRTQ5RkU3MkQxRjkwRjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTA2Rjg2RTc0MjgwMTFFNzlGRTQ5RkU3MkQxRjkwRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gIYORAAACgElEQVR42rSWXYhNURTH75WPeymaMs2DBw9K8eJBUoYID/KtRAZDPspMMzT5yIOmuOGBEYUHSsSMMZgkRZRCjfGRRAoxD0aSh0HJx7gavzX9b+1O9559trLqN3vWuWuf/z5rr7P2SWdrmlMBNhBWwGI4AJ3fj1cFTU5iI6EB1sAoXRsGc0JXGmezJLASBkR++5UKtGJig2EprJNYKeu1P0NrWyoZJkMrKf0QJ+audgTk4B00R4R2wGg44lz7pvEqNEEXwtuSiKXhHuyCiiJxd7SIx8613xrzGodY0SD4FBbFiVk6x8Ys6go8gMNF5v6MxE6weARbYXwxsT7oca5fg2N6msINfyQoikdwVAtbDi8Q3Flsz1xbAHVwWf5CmAFbPGK1FEk94yrn2n4EK+JKfze8hGnyTeQ2LPOIbebG1515BcvEiTVG/A3CZ6uFa7ZFf+LSOB0GQbv8jfJzHrF6xVX73jPXulTSX+R3y//oEetmz/KKT9yuXuulLXeqs0c9Ms6s5D8xloU8mRXDJaf0rZQvwvMEpW9x90PE5lsZwwX5a/UqNHrE1pPGOjXuxGk8A2+h0Hasc3QmOFIOkUZrbZNCxKrVNTLy58FMyHrEZkNlqbhSaRynCefkL7HTBLZ6xKpIo8XNDRHLRp4863T2OMtE4hOl8Ql81Rln1qLGXOYRO8WeNYWW/kGogWfyLZ2b4IZHrF1xp0PEtsN5uCV/L7TBCY9Yjj1rUyMvmca8c+KmtLJXOlr6Sxru6ugp2OfIiV0o/ZuMU1wRFvC+/3OA78apjBNhDwwP+FjqgLOwL8FeWjN4aGJv+GdM6v9br6XxpF7avn+4QTrhPKuNjr8CDAAuRZx6dpjLPAAAAABJRU5ErkJggg=="/>
      <span v-text="name"></span>
    </header>
    <p class="description">法人：
      <span v-text="session.get('firmName')"></span>资本：
      <span v-text="session.get('firmRegCap')"></span>
      <span class="tip" v-text="session.get('firmStatus')"></span>
    </p>
    <Collapse style="background-color: #f2f2f6" :value="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]">
      <Panel>
        工商资料
        <table slot="content" v-show="!loading.queryCompanyInfoByName">
          <tr>
            <td width="120">资料名称</td>
            <td width="340">资料数据</td>
            <td width="120">资料名称</td>
            <td>资料数据</td>
          </tr>
          <template v-if="data.queryCompanyInfoByName[0]">
            <tr>
              <td>法人：</td>
              <td v-text="data.queryCompanyInfoByName[0].frName"></td>
              <td>地址：</td>
              <td v-text="data.queryCompanyInfoByName[0].address"></td>
            </tr>
            <tr>
              <td>统一社会信用代码：</td>
              <td v-text="data.queryCompanyInfoByName[0].creditCode"></td>
              <td>注册号：</td>
              <td v-text="data.queryCompanyInfoByName[0].regNo"></td>
            </tr>
            <tr>
              <td>公司类型/状态：</td>
              <td v-text="data.queryCompanyInfoByName[0].companyType"></td>
              <td>登记机关：</td>
              <td v-text="data.queryCompanyInfoByName[0].regOrg"></td>
            </tr>
            <tr>
              <td>成立日期：</td>
              <td v-text="data.queryCompanyInfoByName[0].openFrom"></td>
              <td>核准日期：</td>
              <td v-text="data.queryCompanyInfoByName[0].approvalDate"></td>
            </tr>
            <tr>
              <td>营业日期自：</td>
              <td v-text="data.queryCompanyInfoByName[0].esDate"></td>
              <td>营业日期至：</td>
              <td v-text="data.queryCompanyInfoByName[0].openTo"></td>
            </tr>
            <tr>
              <td>经营范围：</td>
              <td colspan="3" v-text="data.queryCompanyInfoByName[0].operateScope"></td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4" style="text-align: center">没有数据</td>
          </tr>
        </table>
        <v-loading slot="content" v-show="loading.queryCompanyInfoByName"></v-loading>
      </Panel>
      <Panel>
        股东情况
        <Table :border="true" slot="content" :columns="header.queryShareHolderByName" :data="data.queryShareHolderByName" v-show="!loading.queryShareHolderByName"></Table>
        <v-loading slot="content" v-show="loading.queryShareHolderByName"></v-loading>
      </Panel>
      <Panel>
        主要人员
        <Table :border="true" slot="content" :columns="header.queryBoardDirectorByName" :data="data.queryBoardDirectorByName" v-show="!loading.queryBoardDirectorByName"></Table>
        <v-loading slot="content" v-show="loading.queryBoardDirectorByName"></v-loading>
      </Panel>
      <Panel>
        分支机构
        <Table :border="true" slot="content" :columns="header.queryBranchsByName" :data="data.queryBranchsByName" v-show="!loading.queryBranchsByName"></Table>
        <v-loading slot="content" v-show="loading.queryBranchsByName"></v-loading>
      </Panel>
      <Panel>
        工商变更
        <Table :border="true" slot="content" :columns="header.queryCompanyInforChangeByName" :data="data.queryCompanyInforChangeByName" v-show="!loading.queryCompanyInforChangeByName"></Table>
        <v-loading slot="content" v-show="loading.queryCompanyInforChangeByName"></v-loading>
      </Panel>
      <Panel>
        开庭公告
        <Table :border="true" slot="content" :columns="header.queryOpenCourtNotificationByName" :data="data.queryOpenCourtNotificationByName" v-show="!loading.queryOpenCourtNotificationByName"></Table>
        <v-loading slot="content" v-show="loading.queryOpenCourtNotificationByName"></v-loading>
      </Panel>
      <Panel>
        法院公告
        <Table :border="true" slot="content" :columns="header.queryCourtNotificationByName" :data="data.queryCourtNotificationByName" v-show="!loading.queryCourtNotificationByName"></Table>
        <v-loading slot="content" v-show="loading.queryCourtNotificationByName"></v-loading>
      </Panel>
      <Panel>
        法院文书
        <Table :border="true" slot="content" :columns="header.queryJudgeDocByName" :data="data.queryJudgeDocByName" v-show="!loading.queryJudgeDocByName"></Table>
        <v-loading slot="content" v-show="loading.queryJudgeDocByName"></v-loading>
      </Panel>
      <Panel>
        被执行人
        <Table :border="true" slot="content" :columns="header.queryExecutedPersonByName" :data="data.queryExecutedPersonByName" v-show="!loading.queryExecutedPersonByName"></Table>
        <v-loading slot="content" v-show="loading.queryExecutedPersonByName"></v-loading>
      </Panel>
      <Panel>
        失信被执行人
        <Table slot="content" :border="true" :columns="header.queryCrackCreditExecutedPersonByName" :data="data.queryCrackCreditExecutedPersonByName" v-show="!loading.queryCrackCreditExecutedPersonByName"></Table>
        <v-loading slot="content" v-show="loading.queryCrackCreditExecutedPersonByName"></v-loading>
      </Panel>
      <Panel>
        司法拍卖信息
        <Table slot="content" :border="true" :columns="header.queryAuctionByName" :data="data.queryAuctionByName" v-show="!loading.queryAuctionByName"></Table>
        <v-loading slot="content" v-show="loading.queryAuctionByName"></v-loading>
      </Panel>
      <Panel>
        行政处罚
        <Table slot="content" :border="true" :columns="header.queryAdminExecuteByName" :data="data.queryAdminExecuteByName" v-show="!loading.queryAdminExecuteByName"></Table>
        <v-loading slot="content" v-show="loading.queryAdminExecuteByName"></v-loading>
      </Panel>
      <Panel>
        异常经营
        <Table slot="content" :border="true" :columns="header.queryOperationExceptionByName" :data="data.queryOperationExceptionByName" v-show="!loading.queryOperationExceptionByName"></Table>
        <v-loading slot="content" v-show="loading.queryOperationExceptionByName"></v-loading>
      </Panel>
      <Panel>
        清算信息
        <Table slot="content" :border="true" :columns="header.queryLiquidationByName" :data="data.queryLiquidationByName" v-show="!loading.queryLiquidationByName"></Table>
        <v-loading slot="content" v-show="loading.queryLiquidationByName"></v-loading>
      </Panel>
      <Panel>
        社保
        <Table slot="content" :border="true" :columns="header.searchSocialFunds" :data="data.searchSocialFunds" v-show="!loading.searchSocialFunds"></Table>
        <v-loading slot="content" v-show="loading.searchSocialFunds"></v-loading>
      </Panel>
      <Panel>
        公基金
        <Table slot="content" :border="true" :columns="header.searchPubFunds" :data="data.searchPubFunds" v-show="!loading.searchPubFunds"></Table>
        <v-loading slot="content" v-show="loading.searchPubFunds"></v-loading>
      </Panel>
      <Panel>
        动产抵押
        <Table slot="content" :border="true" :columns="header.queryChattelMortByName" :data="data.queryChattelMortByName" v-show="!loading.queryChattelMortByName"></Table>
        <v-loading slot="content" v-show="loading.queryChattelMortByName"></v-loading>
      </Panel>
      <Panel>
        股权出质
        <Table slot="content" :border="true" :columns="header.queryEquityPledgedByName" :data="data.queryEquityPledgedByName" v-show="!loading.queryEquityPledgedByName"></Table>
        <v-loading slot="content" v-show="loading.queryEquityPledgedByName"></v-loading>
      </Panel>
      <Panel>
        商标信息
        <Table slot="content" :border="true" :columns="header.queryBrandInforByName" :data="data.queryBrandInforByName" v-show="!loading.queryBrandInforByName"></Table>
        <v-loading slot="content" v-show="loading.queryBrandInforByName"></v-loading>
      </Panel>
      <Panel>
        专利信息
        <Table slot="content" :border="true" :columns="header.queryPatentDetailByName" :data="data.queryPatentDetailByName" v-show="!loading.queryPatentDetailByName"></Table>
        <v-loading slot="content" v-show="loading.queryPatentDetailByName"></v-loading>
      </Panel>
      <Panel>
        软件著作权
        <Table slot="content" :border="true" :columns="header.querySoftwareCopyrightByName" :data="data.querySoftwareCopyrightByName" v-show="!loading.querySoftwareCopyrightByName"></Table>
        <v-loading slot="content" v-show="loading.querySoftwareCopyrightByName"></v-loading>
      </Panel>
      <Panel>
        作品著作权
        <Table slot="content" :border="true" :columns="header.queryProductCopyrightByName" :data="data.queryProductCopyrightByName" v-show="!loading.queryProductCopyrightByName"></Table>
        <v-loading slot="content" v-show="loading.queryProductCopyrightByName"></v-loading>
      </Panel>
      <Panel>
        域名备案
        <Table slot="content" :border="true" :columns="header.queryDomainReferenceByName" :data="data.queryDomainReferenceByName" v-show="!loading.queryDomainReferenceByName"></Table>
        <v-loading slot="content" v-show="loading.queryDomainReferenceByName"></v-loading>
      </Panel>
      <!--<Panel>-->
        <!--金融信息-->
        <!--<p slot="content"></p>-->
      <!--</Panel>-->
    </Collapse>
    <v-footer></v-footer>
  </div>
</template>

<script>
import loanCreditServer from 'rs/credit'
export default {
	data() {
	    return {
        name:this.session.get('firmCompanyName'),
        columns:[],
        data:{
        },
        loading:{
        },
        header:{}
	    }
	},
	created() {
    this.init("baseInfo","queryCompanyInfoByName");
    this.init("baseInfo","queryShareHolderByName",1,5);
    this.init("baseInfo","queryBranchsByName",1,5);
    this.init("baseInfo","queryBoardDirectorByName",1,5);
    this.init("law","queryCompanyInforChangeByName",1,5);
    this.init("law","queryOpenCourtNotificationByName",1,5);
    this.init("law","queryCourtNotificationByName",1,5);
    this.init("law","queryJudgeDocByName",1,5);
    this.init("law","queryExecutedPersonByName",1,5);
    this.init("law","queryCrackCreditExecutedPersonByName",1,5);
    this.init("law","queryAuctionByName",1,5);
    this.init("law","queryAdminExecuteByName",1,5);
    this.init("operation","queryOperationExceptionByName",1,5);
    this.init("commercial","queryLiquidationByName",1,5);
    this.init("funds","searchSocialFunds",1,5);
    this.init("funds","searchPubFunds",1,5);
    this.init("commercial","queryChattelMortByName",1,5);
    this.init("commercial","queryEquityPledgedByName",1,5);
    this.init("propertyRight","queryBrandInforByName",1,5);
    this.init("propertyRight","queryPatentDetailByName",1,5);
    this.init("propertyRight","querySoftwareCopyrightByName",1,5);
    this.init("propertyRight","queryProductCopyrightByName",1,5);
    this.init("propertyRight","queryDomainReferenceByName",1,5);
	},
	directives: {

	},
	computed: {

	},
	filters: {
	},
	methods: {
	  init(params1,str,page,size){
      this.$set(this.data,str,[]);
      this.$set(this.loading,str,true);
      this.$set(this.header,str,[]);
      let obj = {
        params1:params1,
        params2:str+'.st',
        name:this.name
      };
      if(page)obj.page = page;
      if(size)obj.pageSize = size;
      loanCreditServer.getData({params:obj},({data})=>{
        this.loading[str] = false;
        this.data[str] = data.result||[];
        this.header[str] = (data.header||[]).map(({title,dataIndex},index)=>{
          if(dataIndex === "brandImage")return {
            title:title,
            render:(h,p)=>{
              return h("img",{attrs:{src:"data:image/jpg;base64,"+p.row.brandImage}});
            }
          };
          return {
            title:title,
            render:(h,p)=>{
              let str = p.row[dataIndex];
              if(str.length >50)return h("span",{attrs:{title:str}},str.slice(0,50)+'...');
              return h('span',str);
            }
          }
        });
      });
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .patent_container{
    width: 1200px;
    margin:0 auto;
    padding-top: 50px;
    header{
      font-size: 22px;
      color: #333333;
      line-height: 45px;
      img{
        position: relative;
        top:3px;
      }
    }
    .description{
      font-size: 16px;
      padding-bottom: 4px;
      border-bottom:@border3;
      span{
        margin-right: 8px;
      }
      .tip{
        display: inline-block;
        height: 20px;
        width: 40px;
        border: 1px solid #FC7C63;
        color: #FC7C63;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        border-radius: 3px;
        position: relative;
        top:-2px;
      }
    }
    .loading-container{
      height: 300px;
    }
    table{
      min-width: 100%;
      tr{
        height: 40px;
        &:nth-of-type(1){
          background-color: #f8f8f9;
        }
        td{
          border:1px solid #dddee1;
          padding-left: 10px;
          line-height: 30px;
        }
      }
    }
  }
</style>
