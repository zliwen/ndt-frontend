<!--
	作者：zhanglw
	时间：2017-10-17
	描述：经营信息
-->
<template>
	<page :widthStr="widthStr">
		<div class="" slot='content'>
			<div class="layout">
				<Tabs @on-click="function(str){changeItem(str)}">
			      <TabPane name="item1" label="社保" icon="document-text"></TabPane>
			      <TabPane name="item2" label="公积金" icon="document-text"></TabPane>
			      <TabPane name="item3" label="税务信息" icon="document-text"></TabPane>
			      <TabPane name="item4" label="动产抵押" icon="document-text"></TabPane>
			      <TabPane name="item5" label="股权出质" icon="document-text"></TabPane>
			      <TabPane name="item6" label="招标信息" icon="document-text"></TabPane>
			      <TabPane name="item7" label="中标信息" icon="document-text"></TabPane>
			      <TabPane name="item8" label="招聘信息" icon="document-text"></TabPane>
			      <TabPane name="item9" label="企业年报" icon="document-text"></TabPane>
			    </Tabs>
			    <div class="layout-content">
		            <row>
		                <i-col span="24">
		                    <div class="layout-content-main" style="padding: 10px;">
		                    	<div id="item1" v-show="items.item1">
		                    		<Table :columns="result.SocialFunds.header" :data="result.SocialFunds.result"></Table>
		                    		<Page :total="result.SocialFunds.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item2" v-show="items.item2">
		                    		<Table :columns="result.PubFunds.header" :data="result.PubFunds.result"></Table>
		                    		<Page :total="result.PubFunds.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item3" v-show="items.item3">
		                    		<Table :columns="result.TaxInformation.header" :data="result.TaxInformation.result"></Table>
		                    		<Page :total="result.TaxInformation.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item4" v-show="items.item4">
		                    		<Table :columns="result.ChattelMort.header" :data="result.ChattelMort.result"></Table>
		                    		<Page :total="result.ChattelMort.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item5" v-show="items.item5">
		                    		<Table :columns="result.EquityPledged.header" :data="result.EquityPledged.result"></Table>
		                    	</div>
		                    	<div id="item6" v-show="items.item6">
		                    		<Table :columns="result.BidInviting.header" :data="result.BidInviting.result"></Table>
		                    		<Page :total="result.BidInviting.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item7" v-show="items.item7">
		                    		<Table :columns="result.Bidding.header" :data="result.Bidding.result"></Table>
		                    		<Page :total="result.Bidding.total"  :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item8" v-show="items.item8">
		                    		<Table :columns="result.Recruit.header" :data="result.Recruit.result"></Table>
		                    		<Page :total="result.Recruit.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
		                    	</div>
		                    	<div id="item9" v-show="items.item9">
		                    		<Table :columns="result.AnnualDoc.header" :data="result.AnnualDoc.result"></Table>
		                    	</div>
		                    </div>
		                </i-col>
		            </row>
		        </div>
			</div>
			<Modal
		        :title="title"
		        v-model="modal8"
		        :width="80"
		        :mask-closable="false">
		        
		        <Collapse style="background-color: #f2f2f6" :value="[0,1,2,3,4,5,6,7]">
		        	<Panel>
				        企业基础信息
				        <table slot="content">
				          <tr>
				            <td width="300">注册号/统一社会信用代码 : </td>
				            <td width="340" v-text="datas.dealJbxx.regnoOrCreditcode"></td>
				            <td width="150">企业名称 : </td>
				            <td v-text="datas.dealJbxx.companyName"></td>
				          </tr>
				          <tr>
				            <td width="300">有限责任公司本年度是否发生股东股权转让 : </td>
				            <td width="340" v-text="datas.dealJbxx.stockTransferFlag"></td>
				            <td width="150">企业经营状态 : </td>
				            <td v-text="datas.dealJbxx.enterpriseStatus"></td>
				          </tr>
				          <tr>
				            <td width="300">企业是否有投资信息或购买其他公司股权 : </td>
				            <td width="340" v-text="datas.dealJbxx.stockBuyFlag"></td>
				            <td width="150">是否有网站或网店 : </td>
				            <td v-text="datas.dealJbxx.websiteFlag"></td>
				          </tr>
				          <tr>
				            <td width="300">从业人数 : </td>
				            <td width="340" v-text="datas.dealJbxx.staffNum"></td>
				            <td width="150"></td>
				            <td></td>
				          </tr>
				        </table>
				      </Panel>
				      <Panel>
				        企业状况信息
				        <Table :border="true" slot="content" :columns="datas.dealZcxx.header" :data="datas.dealZcxx.data"></Table>
				      </Panel>
				      <Panel>
				        对外投资信息
				        <Table :border="true" slot="content" :columns="datas.dealTzxx.header" :data="datas.dealTzxx.data"></Table>
				      </Panel>
				      <Panel>
				        网站或网店信息
				        <Table :border="true" slot="content" :columns="datas.dealWzxx.header" :data="datas.dealWzxx.data"></Table>
				      </Panel>
				      <Panel>
				         股东及出资信息
				        <Table :border="true" slot="content" :columns="datas.dealCzxx.header" :data="datas.dealCzxx.data"></Table>
				      </Panel>
				      <Panel>
				         担保信息
				        <Table :border="true" slot="content" :columns="datas.dealDbxx.header" :data="datas.dealDbxx.data"></Table>
				      </Panel>
				      <Panel>
				         股权变更信息
				        <Table :border="true" slot="content" :columns="datas.dealBgxx.header" :data="datas.dealBgxx.data"></Table>
				      </Panel>
				      <Panel>
				         年报信息更正说明
				        <Table :border="true" slot="content" :columns="datas.dealNbxx.header" :data="datas.dealNbxx.data"></Table>
				      </Panel>
				     
		        </Collapse>
		        
		        <div slot="footer"></div>
		    </Modal>
		</div>
	</page>
</template>

<script>
	import main from './main'
	import loanCreditServer from 'rs/credit'
	export default {
		data() {
			return {
				widthStr:'width:1200px',
				items:{
					item1:true,
					item2:false,
					item3:false,
					item4:false,
					item5:false,
					item6:false,
					item7:false,
					item8:false,
					item9:false
				},
				name:'',
				page: 1,
				pageSize: 20,
				currentItem:'item1',
				result:{
					SocialFunds: {header:[], result: [], total:0, page:1},
					PubFunds: {header:[], result: [], total:0, page:1},
					TaxInformation: {header:[], result: [], total:0, page:1},
					ChattelMort: {header:[], result: [], total:0, page:1},
					EquityPledged: {header:[], result: [], total:0, page:1},
					BidInviting: {header:[], result: [], total:0, page:1},
					Bidding: {header:[], result: [], total:0, page:1},
					Recruit: {header:[], result: [], total:0, page:1},
					AnnualDoc: {header:[], result: [], total:0, page:1}
				},
				modal8: false,
				title: '',
				AnnualDocDatas:{},
				datas:{
					dealJbxx:{},
					dealZcxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'资产总额', key:'assetsTotal'},
						{title:'利润总额', key:'totalDisabilitiesNum'},
						{title:'纳税总额', key:'profitNet'},
						{title:'所有者权益合计', key:'totalBusinessIncome'},
						{title:'营业总收入中主营业务收入', key:'mainBusinessIncome'},
						{title:'负债总额', key:'liabilitiesTotal'},
						{title:'营业总收入', key:'equityTotal'},
						{title:'净利润', key:'taxTotal'}
					], data:[]},
					dealTzxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'投资设立或购买股权境内企业名称', key:'name'},
						{title:'注册/统一社会信用代码', key:'regnoCreditcode'}
					], data:[]},
					dealWzxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'类型', key:''},
						{title:'名称', key:''},
						{title:'网站', key:''}
					], data:[]},
					dealCzxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'股东', key:'shareholderName'},
						{title:'认缴出资（万元）', key:'subscribedCapital'},
						{title:'认缴出资时间', key:'subscribedDate'},
						{title:'认缴出资方式', key:'subscribedType'},
						{title:'实缴出资（万元）', key:'paidinCapital'},
						{title:'实缴出资时间', key:'paidinDate'},
						{title:'实缴出资方式', key:'paidinType'}
					], data:[]},
					dealDbxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'债权人', key:''},
						{title:'债务人', key:''},
						{title:'主债权种类', key:''},
						{title:'主债权数额', key:''},
						{title:'履行债务的期限', key:''},
						{title:'保证的期间', key:''},
						{title:'保证的方式', key:''},
						{title:'保证担保的范围', key:''}
					], data:[]},
					dealBgxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'股东', key:'shareholderName'},
						{title:'变更前股权比例', key:'contentBeforeChange'},
						{title:'变更后股权比例', key:'contentAfterChange'},
						{title:'股权变更日期', key:'changeDate'}
					], data:[]},
					dealNbxx:{header:[
						{type: 'index', title:"序号", width: 70, align: 'center'},
						{title:'修改事项', key:''},
						{title:'修改时间', key:''},
						{title:'修改理由', key:''}
					], data:[]}
				},
				apis:[]
			}
		},
		components:{
			"page": main
		},
		mounted: function(){
			this.name = this.session.get('firmCompanyName');
			this.$nextTick(function(){
				this.getData()
			})
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
					{title:'社保', params: {params1:'funds', params2:'searchSocialFunds.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'SocialFunds'},
					{title:'公积金', params: {params1:'funds', params2:'searchPubFunds.st', name:this.name, page:this.page, pageSize:this.pageSize}, dt:'PubFunds'},
					{title:'动产抵押', params: {params1:'commercial', params2:'queryChattelMortByName.st', name:this.name, page:this.page, pageSize:this.pageSize}, dt:'ChattelMort'},
					{title:'股权出质', params: {params1:'commercial', params2:'queryEquityPledgedByName.st', name:this.name}, dt:'EquityPledged'},
					{title:'招标信息', params: {params1:'operation', params2:'queryBidInvitingByName.st', name:this.name, page:this.page, pageSize:this.pageSize}, dt:'BidInviting'},
					{title:'中标信息', params: {params1:'operation', params2:'queryBiddingByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'Bidding'},
					{title:'招聘信息', params: {params1:'operation', params2:'queryRecruitByName.st', name:this.name, page:this.page, pageSize: this.pageSize}, dt:'Recruit'},
					{title:'企业年报', params: {params1:'commercial', params2:'queryAnnualDocByName.st', name:this.name}, dt:'AnnualDoc'}
				]
				this.apis = apis;
				let that = this;
				apis.forEach(function(e){
					loanCreditServer.queryCreditBehaviorByName({params:e.params}, rsp=>{
						let response = rsp.data;
						if(e.dt === 'AnnualDoc'){
							let results = JSON.parse(response.results)
							if(results.code === '00000'){
								let data = results.data;
								that.AnnualDocDatas = data;
								let tempHeader = [
									{type: 'index', title:"序号", width: 70, align: 'center'},
									{title:"年报名称", key:"name",},
									{
				                        title: '详情',
				                        key: 'action',
				                        width: 150,
				                        align: 'center',
				                        render: (h, params) => {
				                            return h('div', [
				                                h('Button', {
				                                    props: {
				                                        type: 'primary',
				                                        size: 'small'
				                                    },
				                                    style: {
				                                        marginRight: '5px'
				                                    },
				                                    on: {
				                                        click: () => {
				                                            that.showDetail(params.row.value);
				                                        }
				                                    }
				                                }, '查看')
				                            ]);
				                        }
				                    }
								];
								let tempResult = [];
								data.years.forEach(function(val){
									tempResult.push({name:parseInt(val)+"年度企业年报", value: val})
								})
								
								that.result[e.dt].header = tempHeader;
								that.result[e.dt].result = tempResult;
							}
						}else{
							if(response.reCode === '00000'){
								let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
								response.header.forEach(function(e){
									tempHeader.push({title:e.title, key:e.dataIndex})
								})
								that.result[e.dt].header = tempHeader;
								that.result[e.dt].result = response.result;
								that.result[e.dt].total = parseInt(response.total);
								that.result[e.dt].page =  parseInt(response.page);
							}
						}
						
					}, err=>{
						
					})
				})
			},
			showDetail(year) {
				this.title = parseInt(year)+"年度企业年报";
				let _this = this;
				this.AnnualDocDatas.dealJbxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealJbxx = e;
					}
				})
				_this.datas.dealZcxx.data = [];
				this.AnnualDocDatas.dealZcxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealZcxx.data.push(e);
					}
				})
				_this.datas.dealTzxx.data = [];
				this.AnnualDocDatas.dealTzxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealTzxx.data.push(e);
					}
				})
				_this.datas.dealWzxx.data = [];
				this.AnnualDocDatas.dealWzxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealWzxx.data.push(e);
					}
				})
				_this.datas.dealCzxx.data = [];
				this.AnnualDocDatas.dealCzxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealCzxx.data.push(e);
					}
				})
				_this.datas.dealDbxx.data = [];
				this.AnnualDocDatas.dealDbxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealDbxx.data.push(e);
					}
				})
				_this.datas.dealBgxx.data = [];
				this.AnnualDocDatas.dealBgxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealBgxx.data.push(e);
					}
				})
				_this.datas.dealNbxx.data = [];
				this.AnnualDocDatas.dealNbxx.forEach(function(e){
					if(e.year === year){
						_this.datas.dealNbxx.data.push(e);
					}
				})
				
				this.modal8 = true;
			},
			changePage(p) {
				let e = {}
				if(this.currentItem === "item1"){
					e = this.apis[0]
				}else if(this.currentItem === "item2"){
					e = this.apis[1]
				}else if(this.currentItem === "item4"){
					e = this.apis[2]
				}else if(this.currentItem === "item6"){
					e = this.apis[4]
				}else if(this.currentItem === "item7"){
					e = this.apis[5]
				}else if(this.currentItem === "item8"){
					e = this.apis[6]
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

<style scoped="scoped" lang="less">
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
</style>