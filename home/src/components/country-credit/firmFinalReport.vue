<!--
	作者：zhangliwen
	时间：2017-10-16
	描述：信用报告
-->
<template>
	<page :isLink='false'>
		<div id="" slot='content'>
			<div class="layout">
				<i-menu mode="horizontal" active-name="1">
		            <div class="layout-assistant">
		                <menu-item name="1"><span @click='changeItem("item1")'>工商资料</span></menu-item>
		            </div>
			    </i-menu>   
			    <div class="layout-content">
			    	<div class="layout-content-main">
			    		<Row>
                			<Col span="4"><label>法人 : </label></Col>
                			<Col span="8">{{baseInfo.frName}}</Col>
                			<Col span="3"><label>地址 : </label></Col>
                			<Col span="8">{{baseInfo.address}}</Col>
                		</Row>
                		<Row>
                			<Col span="4"><label>统一社会信用代码 : </label></Col>
                			<Col span="8">{{baseInfo.creditCode}}</Col>
                			<Col span="3"><label>注册号 : </label></Col>
                			<Col span="8">{{baseInfo.regNo}}</Col>
                		</Row>
                		<Row>
                			<Col span="4"><label>公司类型/状态 : </label></Col>
                			<Col span="8">{{baseInfo.companyType}}</Col>
                			<Col span="3"><label>登记机关 : </label></Col>
                			<Col span="8">{{baseInfo.regOrg}}</Col>
                		</Row>
                		<Row>
                			<Col span="4"><label>成立日期 : </label></Col>
                			<Col span="8">{{baseInfo.esDate}}</Col>
                			<Col span="3"><label>核准日期 : </label></Col>
                			<Col span="8">{{baseInfo.approvalDate}}</Col>
                		</Row>
                		<Row>
                			<Col span="4"><label>营业日期自 : </label></Col>
                			<Col span="8">{{baseInfo.openFrom}}</Col>
                			<Col span="3"><label>营业日期至 : </label></Col>
                			<Col span="8">{{baseInfo.openTo}}</Col>
                		</Row>
                		<Row>
                			<Col span="4"><label>经营范围 : </label></Col>
                			<Col span="20">{{baseInfo.operateScope}}</Col>
                		</Row>
			    	</div>
			    </div>
			</div>
			<div class="layout" v-for="item in result">
				<i-menu mode="horizontal" active-name="1">
		            <div class="layout-assistant">
		                <menu-item name="1"><span>{{item.title}}</span></menu-item>
		            </div>
			    </i-menu>   
			    <div class="layout-content">
			    	<div class="layout-content-main">
			    		<Table :columns="item.header" :data="item.result"></Table>
			    	</div>
			    </div>
			</div>
		</div>
	</page>
</template>

<script>
	import main from './main'
	import loanCreditServer from 'rs/credit'
	export default {
		data() {
			return {
				name: '',
				page: 1,
				pageSize: 100,
				baseInfo: {},
				result:{
					shareHolder: {title:'', header:[], result: []},
					OverseaInst: {title:'', header:[], result: []},
					BoardDirector: {title:'', header:[], result: []},
					Branchs: {title:'', header:[], result: []},
					CompanyInforChange: {title:'', header:[], result: []},
					OpenCourtNotification: {title:'', header:[], result: []},
					CourtNotification: {title:'', header:[], result: []},
					JudgeDoc: {title:'', header:[], result: []},
					ExecutedPerson: {title:'', header:[], result: []},
					CrackCreditExecutedPerson: {title:'', header:[], result: []},
					Auction: {title:'', header:[], result: []},
					StockFreeze: {title:'', header:[], result: []},
					AdminExecute: {title:'', header:[], result: []},
					OperationException: {title:'', header:[], result: []},
					TaxInformation: {title:'欠税信息', header:[], result: []},
					Liquidation: {title:'', header:[], result: []},
					SocialFunds: {title:'', header:[], result: []},
					PubFunds: {title:'', header:[], result: []},
					ChattelMort: {title:'', header:[], result: []},
					EquityPledged: {title:'', header:[], result: []},
					BrandInfor: {title:'', header:[], result: []},
					PatentDetail: {title:'', header:[], result: []},
					SoftwareCopyright: {title:'', header:[], result: []},
					ProductCopyright: {title:'', header:[], result: []},
					DomainReference: {title:'', header:[], result: []},
				}
			}
		},
		components:{
			"page": main
		},
		mounted: function(){
			this.name = this.session.get('firmCompanyName');
			this.$nextTick(function(){
				this.getData()
			});
		},
		methods: {
			getData() {
				//工商资料
				loanCreditServer.queryCompanyInfoByName({params:{name:this.name}}, rsp=>{
					let response = rsp.data;
	 				if(response.reCode === '00000'){
	 					this.baseInfo = response.result[0];
	 				}
	 			}, err=>{
	 				
	 			})
				
				const apis = [
					{title:'股东情况', params: {params1:'baseInfo', params2:'queryShareHolderByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'shareHolder'},
					{title:'境外投机机构', params: {params1:'baseInfo', params2:'queryOverseaInstByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'OverseaInst'},
					{title:'主要人员', params: {params1:'baseInfo', params2:'queryBoardDirectorByName.st', name:this.name, type:1, page:this.page, pageSize:this.pageSize}, dt:'BoardDirector'},
					{title:'分支机构', params: {params1:'baseInfo', params2:'queryBranchsByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'Branchs'},
					{title:'工商变更', params: {params1:'law', params2:'queryCompanyInforChangeByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'CompanyInforChange'},
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
					{title:'社保', params: {params1:'funds', params2:'searchSocialFunds.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'SocialFunds'},
					{title:'公积金', params: {params1:'funds', params2:'searchPubFunds.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'PubFunds'},
					{title:'动产抵押', params: {params1:'commercial', params2:'queryChattelMortByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'ChattelMort'},
					{title:'股权出质', params: {params1:'commercial', params2:'queryEquityPledgedByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'EquityPledged'},
					{title:'商标信息', params: {params1:'propertyRight', params2:'queryBrandInforByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'BrandInfor'},
					{title:'专利信息', params: {params1:'propertyRight', params2:'queryPatentDetailByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'PatentDetail'},
					{title:'软件著作权', params: {params1:'propertyRight', params2:'querySoftwareCopyrightByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'SoftwareCopyright'},
					{title:'作品著作权', params: {params1:'propertyRight', params2:'queryProductCopyrightByName.st', name:this.name}, dt:'ProductCopyright'},
					{title:'域名备案', params: {params1:'propertyRight', params2:'queryDomainReferenceByName.st', name:this.name}, dt:'DomainReference'},
				]
				
				let that = this;
				apis.forEach(function(e){
					loanCreditServer.queryCreditBehaviorByName({params:e.params}, rsp=>{
						let response = rsp.data;
						that.result[e.dt]['title'] = e.title;
						if(response.reCode === '00000'){
							let tempHeader = [{type: 'index', width: 60, align: 'center'}];
							response.header.forEach(function(e){
								tempHeader.push({title:e.title, key:e.dataIndex})
							})
							that.result[e.dt].header = tempHeader;
							that.result[e.dt].result = response.result;
						}
					}, err=>{
						
					})
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.layout-content-main{
		font-size: 16px;
		padding: 20px 10px 10px 10px;
		.ivu-row{
			margin-bottom: 15px;
		}
	}
</style>