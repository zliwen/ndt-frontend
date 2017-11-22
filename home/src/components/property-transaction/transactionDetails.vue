<template>
	<div>
		<div class="transaction-details">
			<div class="history">
				<a @click="goback">产权交易</a>
				<span>></span>
				<span class="title">{{pageData.articleTitle}}</span>
			</div>
			<div class="head-box">
				<h3>{{pageData.articleTitle}}</h3>
				<p>发布时间{{pageData.pubTime}}</p>
			</div>
			<div class="content-box">
				<div class="title">项目编号{{pageData.projectNo}}</div>
				<Row  class="content-block">
					<Col class="content-list" span="12">
						<span>项目坐落:</span>
						<span>{{pageData.propertyLocation}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>项目坐落:</span>
						<span>{{pageData.propertyLocation}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>土地性质</span>
						<span>{{pageData.landNature}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>产权类型:</span>
						<span>{{pageData.propertyType|codeToName}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>地上物情况:</span>
						<span>{{pageData.groudMaterail}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>权属类型：</span>
						<span>{{pageData.ownershipType}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>交通情况：</span>
						<span>{{pageData.transportation}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>权利人名称/姓名：</span>
						<span>{{pageData.ownerName}}</span>
					</Col>
				</Row>
				<Row  class="content-block">
					<Col class="content-list" span="12">
						<span>拟交易方式：</span>
						<span>{{pageData.expectedDealType}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>拟交易价格：</span>
						<span>{{pageData.expectedPrice}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>拟交易期限：</span>
						<span>{{pageData.expectedDealPeriod}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>成交价格：</span>
						<span style="color:#ff762b">{{pageData.cjj}}</span>
					</Col>
				</Row>
				<Row  class="content-block">
					<Col class="content-list" span="12">
						<span>是否存在抵押信息：</span>
						<span>{{pageData.isMortgaged}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>是否存在查封信息：</span>
						<span>{{pageData.isSeized}}</span>
					</Col>
				</Row>
				<Row  class="content-block">
					<Col class="content-list" span="12">
						<span>转让方姓名/名称：</span>
						<span>{{pageData.transferorName}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>身份证号/营业执照号：</span>
						<span>{{pageData.transferorCode}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>住所/办公地址：</span>
						<span>{{pageData.transferorAddress}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>标的价格：</span>
						<span>{{pageData.targetPrice}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>价款支付方式：</span>
						<span>{{pageData.paymentMethod}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>价款支付期限：</span>
						<span>{{pageData.paymentDeadline}}</span>
					</Col>
				</Row>
				<Row  class="content-block">
					<Col class="content-list" span="12">
						<span>联系电话：</span>
						<span>{{pageData.phone}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>电子邮件：</span>
						<span>{{pageData.email}}</span>
					</Col>
					<Col class="content-list" span="12">
						<span>联系传真：</span>
						<span>{{pageData.fax}}</span>
					</Col>
				</Row>
				<Row  class="content-block">
					<Col class="content-list" span="24">
						<span>其他交易条件：</span>
						<span>{{pageData.additionalRequirement}}</span>
					</Col>
				</Row>
			</div>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import transationServer from "rs/propertyTransaction"

export default {
	name: 'home',
	data() {
		return {
			articleTitle:"1",
			pageData:{}
		}
	},
	created(){
		let id = this.$route.query.id;
		this.getDetail(id);
	},
	computed: {

	},
	filters: {
		codeToName(key){
			let map = {
				"18":"土地承包经营权",
				"19":"林权",
				"20":"集体建设用地使用权",
				"21":"农村房屋",
				"23":"土地综合整治",
				"127":"集体经营性质产",
			}
			return map[key];
		}
	},
	methods: {
		getDetail(id){
			transationServer.detail({
				params:{
					id
				},
			},res=>{
				if(res.errorCode == 0 ){
					this.pageData = res.data;
				}
			},err=>{
				this.$Message.error(item.name+"请求失败！")
			})
		},
		goback(){
			window.history.go(-1)
      		// window.close();
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.transaction-details{
		margin: 0 auto;
		width: 900px;

		padding-bottom: 50px;
		.history{
      padding-top: 10px;
			line-height: 42px;
			text-indent: 5px;
			font-size: 12px;
			a{
				color: #333;
			}
			span.title{
				color:#999;
			}
		}
		.head-box{
			overflow: hidden;
			text-indent: 30px;
			background-color: #fff;
			min-height:90px;
			border-radius: 6px ;
			margin-top: 10px;
			margin-bottom: 10px;
			h3{
				font-size:18px;
				color:rgba(51,51,51,1);
				line-height:16px;
				margin-top: 23px;
				line-height: 42px;
        		font-weight: bold;
			}
			p{
				height:12px;
				font-size:12px;
				line-height: 12px;
				margin-top: 10px;
				text-align: right;
				color:rgba(51,51,51,1);
				margin-bottom: 23px;
			}
		}
		.content-box{
			background:rgba(255,255,255,1);
			border-radius: 6px ;
			.title{
				text-indent: 30px;
				line-height: 46px;
				height: 46px;
				font-size:14px;
				color:rgba(51,51,51,1);
			}
			.content-block{
				border-top:1px solid #e7e7e7;
			}
			.content-list{
				text-indent: 30px;
				color:rgba(102,102,102,1);
				line-height: 40px;
				font-size: 12px;
			}
		}
	}
</style>
