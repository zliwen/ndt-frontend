<!--
	作者：zhangliwen
	时间：2017-10-16
	描述：信用行为
-->
<template>
	<div>
		<page :widthStr="widthStr">
			<div class="" slot='content'>
				<div class="layout">
			        <Tabs type="line" @on-click="function(str){changeItem(str)}">
				      <TabPane name="item1" label="开庭公告" icon="document-text"></TabPane>
				      <TabPane name="item2" label="法院公告" icon="document-text"></TabPane>
				      <TabPane name="item3" label="判断文书" icon="document-text"></TabPane>
				      <TabPane name="item4" label="被执行人" icon="document-text"></TabPane>
				      <TabPane name="item5" label="失信被执行人" icon="document-text"></TabPane>
				      <TabPane name="item6" label="司法拍卖" icon="document-text"></TabPane>
				      <TabPane name="item7" label="股权冻结" icon="document-text"></TabPane>
				      <TabPane name="item8" label="行政处罚" icon="document-text"></TabPane>
				      <TabPane name="item9" label="异常经营" icon="document-text"></TabPane>
				      <TabPane name="item10" label="清算信息" icon="document-text"></TabPane>
				    </Tabs>
			        <div class="layout-content">
			            <row>
			                <i-col span="24">
			                    <div class="layout-content-main" style="padding: 10px;">
			                    	<div id="item1" v-show="items.item1">
			                    		<Table :columns="result.OpenCourtNotification.header" :data="result.OpenCourtNotification.result"></Table>
			                    		<Page :total="result.OpenCourtNotification.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item2" v-show="items.item2">
			                    		<Table :columns="result.CourtNotification.header" :data="result.CourtNotification.result"></Table>
			                    	</div>
			                    	<div id="item3" v-show="items.item3">
			                    		<Table :columns="result.JudgeDoc.header" :data="result.JudgeDoc.result"></Table>
			                    		<Page :total="result.JudgeDoc.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item4" v-show="items.item4">
			                    		<Table :columns="result.ExecutedPerson.header" :data="result.ExecutedPerson.result"></Table>
			                    	</div>
			                    	<div id="item5" v-show="items.item5">
			                    		<Table :columns="result.CrackCreditExecutedPerson.header" :data="result.CrackCreditExecutedPerson.result"></Table>
			                    		<Page :total="result.CrackCreditExecutedPerson.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item6" v-show="items.item6">
			                    		<Table :columns="result.Auction.header" :data="result.Auction.result"></Table>
			                    		<Page :total="result.Auction.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item7" v-show="items.item7">
			                    		<Table :columns="result.StockFreeze.header" :data="result.StockFreeze.result"></Table>
			                    		<Page :total="result.StockFreeze.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item8" v-show="items.item8">
			                    		<Table :columns="result.AdminExecute.header" :data="result.AdminExecute.result"></Table>
			                    		<Page :total="result.AdminExecute.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item9" v-show="items.item9">
			                    		<Table :columns="result.OperationException.header" :data="result.OperationException.result"></Table>
			                    		<Page :total="result.OperationException.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item10" v-show="items.item11">
			                    		<Table :columns="result.Liquidation.header" :data="result.Liquidation.result"></Table>
			                    		<Page :total="result.Liquidation.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    </div>
			                </i-col>
			            </row>
			        </div>
			    </div>
			</div>
		</page>
	</div>
</template>

<script>
	import main from './main'
	import loanCreditServer from 'rs/credit'
	export default {
		data() {
			return {
				items:{
					item1:true,
					item2:false,
					item3:false,
					item4:false,
					item5:false,
					item6:false,
					item7:false,
					item8:false,
					item9:false,
					item10:false,
					item11:false
				},
				widthStr:'width:1320px;',
				name: '',
				page: 1,
				pageSize: 20,
				currentItem:'item1',
				result:{
					OpenCourtNotification: {header:[], result: [], total:0, page:1},
					CourtNotification: {header:[], result: [], total:0, page:1},
					JudgeDoc: {header:[], result: [], total:0, page:1},
					ExecutedPerson: {header:[], result: [], total:0, page:1},
					CrackCreditExecutedPerson: {header:[], result: [], total:0, page:1},
					Auction: {header:[], result: [], total:0, page:1},
					StockFreeze: {header:[], result: [], total:0, page:1},
					AdminExecute: {header:[], result: [], total:0, page:1},
					OperationException: {header:[], result: [], total:0, page:1},
					Liquidation: {header:[], result: [], total:0, page:1}
				},
				apis:[]
			}
		},
		components: {
			'page': main
		},
		mounted: function(){
			this.name = this.session.get('firmCompanyName');
			this.$nextTick(function(){
				this.getData()
			});
		},
		methods: {
			changeItem(n) {
				for(let key in this.items){
					this.items[key] = false;
				}
				this.items[n] = true;
				this.currentItem = n;
			},
			getData() {
				const apis = [
					{title:'开庭公告', params: {params1:'law', params2:'queryOpenCourtNotificationByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'OpenCourtNotification'},
					{title:'法院公告', params: {params1:'law', params2:'queryCourtNotificationByName.st', name:this.name}, dt:'CourtNotification'},
					{title:'判断文书', params: {params1:'law', params2:'queryJudgeDocByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'JudgeDoc'},
					{title:'被执行人', params: {params1:'law', params2:'queryExecutedPersonByName.st', name:this.name}, dt:'ExecutedPerson'},
					{title:'失信被执行人', params: {params1:'law', params2:'queryCrackCreditExecutedPersonByName.st', name:this.name}, dt:'CrackCreditExecutedPerson'},
					{title:'司法拍卖', params: {params1:'law', params2:'queryAuctionByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'Auction'},
					{title:'股权冻结', params: {params1:'law', params2:'queryStockFreezeByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'StockFreeze'},
					{title:'行政处罚', params: {params1:'law', params2:'queryAdminExecuteByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'AdminExecute'},
					{title:'异常经营', params: {params1:'operation', params2:'queryOperationExceptionByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'OperationException'},
					{title:'清算信息', params: {params1:'commercial', params2:'queryLiquidationByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'Liquidation'},
				]
				this.apis = apis;
				let that = this;
				apis.forEach(function(e){
					loanCreditServer.queryCreditBehaviorByName({params:e.params}, rsp=>{
						let response = rsp.data;
						if(response.reCode === '00000'){
							let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
							response.header.forEach(function(e){
								tempHeader.push({title:e.title, key:e.dataIndex})
							})
							that.result[e.dt].header = tempHeader;
							that.result[e.dt].result = response.result;
							that.result[e.dt].total = parseInt(response.total);
						}
					}, err=>{
						
					})
				})
			},
			changePage(p) {
				let e = {}
				if(this.currentItem === "item1"){
					e = this.apis[0]
				}else if(this.currentItem === "item3"){
					e = this.apis[2]
				}else if(this.currentItem === "item5"){
					e = this.apis[4]
				}else if(this.currentItem === "item6"){
					e = this.apis[5]
				}else if(this.currentItem === "item7"){
					e = this.apis[6]
				}else if(this.currentItem === "item8"){
					e = this.apis[7]
				}else if(this.currentItem === "item9"){
					e = this.apis[8]
				}else if(this.currentItem === "item10"){
					e = this.apis[9]
				}
				
				e.params.page = p;
				loanCreditServer.queryCreditBehaviorByName({params:e.params}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.result[e.dt].header = tempHeader;
						this.result[e.dt].result = response.result;
						this.result[e.dt].total = parseInt(response.total);
						this.result[e.dt].page =  parseInt(response.page);
					}
				}, err=>{
					
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.layout-assistant span{
		display: block;
	}
	.layout-content-main{
		font-size: 16px;
		.ivu-row{
			margin-bottom: 15px;
		}
	}
	.layout > .ivu-tabs-nav .ivu-tabs-tab {
        margin-right: 0px;
    }
</style>