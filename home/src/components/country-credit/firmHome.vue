<!--
	作者：zhanglw
	时间：2017-10-17
	描述：企业洞察
-->
<template>
	<page :widthStr="widthStr">
		<div class="" slot='content'>
			<div class="div-title">
				<span>状态全析</span>
			</div>
			<div class="state-content">
				<div v-show="isShow" style="text-align: center;">根据现有公开数据显示，该企业暂无风险信息和警示信息</div>
				<Button type="info" v-show="QySight.courtAnnouncement === 'true'">存在法院公告</Button>
				<Button type="info" v-show="QySight.judgmentDoc === 'true'">存在判决文书</Button>
				<Button type="info" v-show="QySight.abnormalOperation === 'true'">存在异常经营</Button>
				<Button type="info" v-show="QySight.clear === 'true'">存在清算信息</Button>
				<Button type="info" v-show="QySight.chattelMortgage === 'true'">存在动产抵押</Button>
				<Button type="info" v-show="QySight.equityPledged === 'true'">存在股权质押</Button>
				<Button type="info" v-show="QySight.freezeStockholder === 'true'">存在股权冻结</Button>
				<Button type="info" v-show="QySight.administrativePenalty === 'true'">存在行政处罚</Button>
				<Button type="info" v-show="QySight.operationPerson === 'true'">存在被执行人</Button>
				<Button type="info" v-show="QySight.saleByLaw === 'true'">存在司法拍卖</Button>
				<Button type="info" v-show="QySight.operationByLegal === 'true'">存在开庭公告</Button>
			</div>
			<div class="div-title">
				<span>法人关联</span>
			</div>
			<div>
				<Row>
					<Col span="2"><div class="square square1">{{QySight.sameFrCnt}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('企业对外投资数', 'baseInfo', 'queryInvestByName.st')" style="color: rgb(63, 81, 229);">企业对外投资数</a></div></Col>
					<Col span="2"><div class="square square2">{{QySight.riskSameFrCnt}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('法人代表其他企业任职数', 'qySight', 'searchQyFrposition.st')" style="color: rgb(63, 81, 229);">法人代表其他企业任职数</a></div></Col>
				</Row>
				<Row>
					<Col span="2"><div class="square square3">{{QySight.sameFrInvest}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('企业对外投资被纳入风险名单数', 'qySight', 'getRiskQyOutInverst.st')" style="color: rgb(63, 81, 229);">企业对外投资被纳入风险名单数</a></div></Col>
					<Col span="2"><div class="square square4">{{QySight.riskSameFrInvest}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('法人代表任职的其他企业纳入风险名单数', 'qySight', 'getRiskFrPosition.st')" style="color: rgb(63, 81, 229);">法人代表任职的其他企业纳入风险名单数</a></div></Col>
				</Row>
				<Row>
					<Col span="2"><div class="square square4">{{QySight.sameFrPostion}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('法人对外投资企业数', 'qySight', 'searchQyFrinv.st')" style="color: rgb(63, 81, 229);">法人对外投资企业数</a></div></Col>
					<Col span="2"><div class="square square3">{{QySight.riskSameFrPostion}}</div></Col>
					<Col span="10"><div class="sqFont"><a href="javascript:;" @click="detailInfo('法人对外投资企业被纳入风险名单数', 'qySight', 'getRiskFrOutInverst.st')" style="color: rgb(63, 81, 229);">法人对外投资企业被纳入风险名单数</a></div></Col>
				</Row>
			</div>
			<Modal
		        :title="title"
		        v-model="modal8"
		        :width="80"
		        :mask-closable="false">
		        <Table :columns="header" :data="result"></Table>
		        <div slot="footer"></div>
		    </Modal>
		</div>
	</page>
</template>

<script>
	import {mapActions } from 'vuex'
	import loanCreditServer from 'rs/credit'
	import main from './main'
	export default {
		data() {
			return {
				widthStr:'width:1200px;',
				name:'',
				page: 1,
				pageSize: 50,
				modal8:false,
				title: '',
				QySight: {},
				header:[],
				result:[],
				isShow: true
			}
		},
		mounted: function(){
			this.name = this.session.get('firmCompanyName');
			this.$nextTick(function(){
				this.searchQySight();
			})
		},
		methods: {
		    searchQySight() {
		    	loanCreditServer.queryCreditBehaviorByName({params:{params1:'qySight', params2:'searchQySight.st', name:this.name}},rsp=>{
		    		let response = rsp.data;
		    		if(response.reCode === "00000"){
		    			this.QySight = response.result[0];
		    			for(let key  in this.QySight){
							if(this.QySight[key] === "true"){
								this.isShow = false;
								break;
							}
		    			}

		    		}
		    	}, err=>{

		    	})
		    },
		    detailInfo(title, params1, params2) {
		    	this.title = title;
		    	loanCreditServer.queryCreditBehaviorByName({params:{params1:params1, params2:params2, name:this.name, page:this.page, pageSize:this.pageSize}}, rsp=>{
					let response = rsp.data;
					let tempHeader = [{type: 'index', title:"序号", width: 70, align: 'center'}];
					response.header.forEach(function(e){
						tempHeader.push({title:e.title, key:e.dataIndex})
					})
					this.header = tempHeader;
					if(response.reCode === '00000'){
						this.result = response.result;
					}
				}, err=>{

				})
		    	this.modal8 = true;

		    }
		},
		components:{
			'page': main
		}
	}
</script>

<style scoped lang="less">
	ul li[data-v-2dc53c72]{
		width: 100px;
	}

	.div-title{
		border-left: 8px solid #fc7c63;
		margin: 30px 0px 40px 0px;
		span{
			color: #000000;
			font-size: 16px;
			margin-left: 20px;
		}
	}
	.state-content{
		text-align: left;
		font-size: 16px;
		color: #495060;
	}
	.ivu-row{
		margin-bottom: 20px;
	}
	.sqFont {
	    font-family: Hiragino Sans GB;
	    font-size: 18px;
	    line-height: 60px;
	    color: #666;
	}

	.square1 {
	    background-color: #586cda;
	}
	.square2 {
	    background-color: #32bcfa;
	}
	.square3 {
	    background-color: #fb9b88;
	}
	.square4 {
	    background-color: #aadb72;
	}
	.square {
	    height: 60px;
	    width: 60px;
	    color: #fff;
	    font-size: 30px;
	    text-align: center;
	    line-height: 60px;
	}
</style>
