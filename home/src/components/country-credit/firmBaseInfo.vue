<template>
	<div>
		<page :widthStr="widthStr">
			<div class="" slot='content'>
				<div class="layout">
			        <Tabs @on-click="function(str){changeItem(str)}">
				      <TabPane name="item1" label="工商资料" icon="document-text"></TabPane>
				      <TabPane name="item2" label="股东情况" icon="document-text"></TabPane>
				      <TabPane name="item3" label="海外投资机构" icon="document-text"></TabPane>
				      <TabPane name="item4" label="主要人员" icon="document-text"></TabPane>
				      <TabPane name="item5" label="分机机构" icon="document-text"></TabPane>
				      <TabPane name="item6" label="工商表更" icon="document-text"></TabPane>
				    </Tabs>
			        <div class="layout-content">
			            <row>
			                <i-col span="24">
			                    <div class="layout-content-main" style="padding: 10px;">
			                    	<div id="item1" v-show="items.item1">
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
			                    	<div id="item2" v-show="items.item2">
			                    		<Table :columns="shareHolder.header" :data="shareHolder.result"></Table>
			                    		<Page :total="shareHolder.total"  :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item3" v-show="items.item3">
			                    		<Table :columns="OverseaInst.header" :data="OverseaInst.result"></Table>
			                    		<Page :total="OverseaInst.total"  :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item4" v-show="items.item4">
			                    		<Table :columns="BoardDirector.header" :data="BoardDirector.result"></Table>
			                    		<Page :total="BoardDirector.total"  :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item5" v-show="items.item5">
			                    		<Table :columns="Branchs.header" :data="Branchs.result"></Table>
			                    		<Page :total="Branchs.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
			                    	</div>
			                    	<div id="item6" v-show="items.item6">
			                    		<Table :columns="CompanyInforChange.header" :data="CompanyInforChange.result"></Table>
			                    		<Page :total="CompanyInforChange.total" :pageSize="pageSize" @on-change="changePage" style="padding-bottom: 100px;padding-top: 10px"></Page>
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
				widthStr:'width:1200px;',
				items:{
					item1:true,
					item2:false,
					item3:false,
					item4:false,
					item5:false,
					item6:false
				},
				baseInfo: {},
				name: '',
				page: 1,
				pageSize: 20,
				currentItem:'',
				shareHolder: {header:[], result: [], total:0, page:1},
				OverseaInst: {header:[], result: [], total:0, page:1},
				BoardDirector: {header:[], result: [], total:0, page:1},
				Branchs: {header:[], result: [], total:0, page:1},
				CompanyInforChange: {header:[], result: [], total:0, page:1}
			}
		},
		components: {
		    'page': main
		},
		mounted: function(){
			this.name = this.session.get('firmCompanyName');
			this.$nextTick(function(){
				this.getData();
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
				//工商资料
				loanCreditServer.queryCompanyInfoByName({params:{name:this.name}}, rsp=>{
					let response = rsp.data;
	 				if(response.reCode === '00000'){
	 					this.baseInfo = response.result[0];
	 				}
	 			}, err=>{
	 				
	 			})
				//股东情况
				loanCreditServer.queryShareHolderByName({params:{name:this.name, page:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.shareHolder.header = tempHeader;
						this.shareHolder.result = response.result;
						this.shareHolder.total = parseInt(response.total);
					}
				}, err=>{
					
				})
				//境外投机机构
				loanCreditServer.queryOverseaInstByName({params:{name:this.name, path:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.OverseaInst.header = tempHeader;
						this.OverseaInst.result = response.result;
						this.OverseaInst.total = parseInt(response.total);
					}
				}, err=>{
					
				})
				//主要人员
				loanCreditServer.queryBoardDirectorByName({params:{name:this.name, type:1, page:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.BoardDirector.header = tempHeader;
						this.BoardDirector.result = response.result;
						this.BoardDirector.total = parseInt(response.total);
					}
				}, err=>{
					
				})
				//分支机构
				loanCreditServer.queryBranchsByName({params:{name:this.name, page:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.Branchs.header = tempHeader;
						this.Branchs.result = response.result;
						this.Branchs.total = parseInt(response.total);
					}
				}, err=>{
					
				})
				
				//工商变更
				loanCreditServer.queryCompanyInforChangeByName({params:{name:this.name, page:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						this.CompanyInforChange.header = tempHeader;
						this.CompanyInforChange.result = response.result;
						this.CompanyInforChange.total = parseInt(response.total);
					}
				}, err=>{
					
				})
				
			},
			changePage(p) {
				let e = {}
				let obj = null;
				if(this.currentItem === "item2"){
					e = {params:{params1:'baseInfo',params2:'queryShareHolderByName.st',name:this.name, page:p, pageSize:this.pageSize}};
					obj= this.shareHolder;
				}else if(this.currentItem === "item3"){
					e = {params:{params1:'baseInfo',params2:'queryOverseaInstByName.st',name:this.name, page:p, pageSize:this.pageSize}}
					obj= this.OverseaInst;
				}else if(this.currentItem === "item4"){
					e = {params:{params1:'baseInfo',params2:'queryBoardDirectorByName.st',name:this.name, page:p, pageSize:this.pageSize}}
					obj= this.BoardDirector;
				}else if(this.currentItem === "item5"){
					e = {params:{params1:'baseInfo',params2:'queryBranchsByName.st',name:this.name, page:p, pageSize:this.pageSize}}
					obj= this.Branchs;
				}else if(this.currentItem === "item6"){
					e = {params:{params1:'law',params2:'queryCompanyInforChangeByName.st',name:this.name, page:p, pageSize:this.pageSize}}
					obj= this.CompanyInforChange;
				}
				
				loanCreditServer.queryCreditBehaviorByName(e, rsp=>{
					let response = rsp.data;
					if(response.reCode === '00000'){
						let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
						response.header.forEach(function(e){
							tempHeader.push({title:e.title, key:e.dataIndex})
						})
						obj.header = tempHeader;
						obj.result = response.result;
						obj.total = parseInt(response.total);
						obj.page =  parseInt(response.page);
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
	
</style>