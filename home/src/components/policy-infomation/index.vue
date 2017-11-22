<template>
<div>
	<div class="policy-infomation" :style="{'min-height':this.minH+'px'}">
		<h2 class="page-title">政策资讯</h2>
		<div class="tabs">
			<a :class="currenTag==0?'cur':''" @click='tabChange(0)' >农贷通政策</a>
			<a :class="currenTag==1?'cur':''" @click='tabChange(1)' >{{isSub?'成都市政策':'农业政策'}}</a>
			<a v-if="isSub" :class="currenTag==3?'cur':''" @click='tabChange(3)' >本县/区政策</a>
			<a :class="currenTag==2?'cur':''" @click='tabChange(2)'>信息动态</a>
			<a v-if="isSub&&isSubSub" :class="currenTag==4?'cur':''" @click='tabChange(4)'>村务信息</a>
		</div>
		<div style="min-height:500px; ">
			<ul class="info-list">
				<li v-for="item in dataList" :key="item.id" >
					<div class="left-date">
						<div class="day">{{item.day}}</div>
						<p>{{item.month}}</p>
					</div>
					<div class="content">
						<h3 class="info-title" @click="goDetails(item.id)">{{item.title}}</h3>
						<p class="info-summary">{{item.summary+'...'}}</p>
					</div>
				</li>
			</ul>
			<a :class="hasMoreData?'show-more':'no-more'" @click="getMoreList">{{hasMoreData?'查看更多':'暂无更多数据'}}</a>
		</div>
	</div>

	<v-footer style="border-top:1px solid #d0d0d0"></v-footer>
</div>
</template>

<script>

import infoServer from 'rs/infoServer'
import session from "../../config/session.js"
export default {
	name: 'home',
	data() {
		return {
			currentPage:1,
			minH:0,
			currenTag:0,
			pageTotal:0,
			dataList:[],
			divisionId:5101,
			hasMoreData:true,
			isSub:false,
			isSubSub:false,
		}
	},
	mounted() {
	 this.minH = this.$store.state.screenHeight-280-90;
	},
	created(){
		let d = this.$route.query
		if(d.type) this.currenTag = d.type;
		if(d.tsid){
			this.isSub = true;
			this.divisionId = d.tsid;
			if(this.divisionId.length>6){
				this.isSubSub = true;
			}
		}
		// if(this.$route.path=="/xian/policy-infomation"){
		// 	this.isSub = true;
		// 	this.divisionId=this.session.get('cityId');
		// 	if(this.divisionId.length>6){
		// 		this.isSubSub = true;
		// 	}
		// }
		this.getListData();
	},
	computed: {

	},
	filters: {
	},
	methods: {

		// 获取列表
		getListData(){
			this.currentPage =1;
			if(this.currenTag == 1||this.currenTag == 3){
				infoServer.policylist({
					data:(this.currenTag == 1?{divisionId:5101,type:6501}:{divisionId:this.divisionId.substr(0,6),type:6501}),
					params:{params3:this.currentPage,params4:10},
				},(request)=>{
					if(request.errorCode ==0){
						for(let item of request.data.pageData){
							if(item.updateAt){
								item.day = item.updateAt.substr(8,2)
								item.month = item.updateAt.substr(0,7)
							}
						}
						this.pageTotal = request.data.totalCount;
						this.dataList = request.data.pageData;
						this.hasMoreData =  this.pageTotal>this.dataList.length
					}
					else{
						this.pageTotal = 0;
						this.hasMoreData =  false;
						this.dataList = [];
					}
				},(err)=>{
					this.$Message.error("网络异常！加载列表失败！")
				})
			}
			else if(this.currenTag == 0){
				infoServer.policylist({
					data:{divisionId:5101,type:6502},
					params:{params3:this.currentPage,params4:10},
				},(request)=>{
					if(request.errorCode ==0){
						for(let item of request.data.pageData){
							if(item.updateAt){
								item.day = item.updateAt.substr(8,2)
								item.month = item.updateAt.substr(0,7)
							}

						}
						this.pageTotal = request.data.totalCount;
						this.dataList = request.data.pageData;
						this.hasMoreData =  this.pageTotal>this.dataList.length
					}
					else{
						this.pageTotal = 0;
						this.hasMoreData =  false;
						this.dataList = [];
					}
				},(err)=>{
					this.$Message.error("网络异常！加载列表失败！")
				})
			}
			else if(this.currenTag == 2){
				infoServer.infolist({
					data:{divisionId:this.divisionId.slice(0,6),"type":301},
					params:{params3:this.currentPage,params4:10},
				},(request)=>{
					if(request.errorCode ==0){
						for(let item of request.data.pageData){
							if(item.updateAt){
								item.day = item.updateAt.substr(8,2)
								item.month = item.updateAt.substr(0,7)
							}
						}
						this.pageTotal = request.data.totalCount;
						this.dataList = request.data.pageData;
						this.hasMoreData =  this.pageTotal>this.dataList.length
					}
					else{
						this.pageTotal = 0;
						this.hasMoreData =  false;
						this.dataList = [];
					}
				},(err)=>{
					this.$Message.error("网络异常！加载列表失败！")
				})
			}
			else if(this.currenTag == 4){
				infoServer.infolist({
					data:{divisionId:this.divisionId,"type":302},
					params:{params3:this.currentPage,params4:10},
				},(request)=>{
					if(request.errorCode ==0){
						for(let item of request.data.pageData){
							if(item.updateAt){
								item.day = item.updateAt.substr(8,2)
								item.month = item.updateAt.substr(0,7)
							}
						}
						this.pageTotal = request.data.totalCount;
						this.dataList = request.data.pageData;
						this.hasMoreData =  this.pageTotal>this.dataList.length
					}
					else{
						this.pageTotal = 0;
						this.hasMoreData =  false;
						this.dataList = [];
					}
				},(err)=>{
					this.$Message.error("网络异常！加载列表失败！")
				})
			}
		},
		getMoreList(){
			if(this.dataList.length >= this.pageTotal){
				this.hasMoreData = false;
			}
			else{
				this.currentPage = this.currentPage+1;
				if(this.currenTag == 1||this.currenTag == 3){
					infoServer.policylist({
						data:(this.currenTag == 1?{divisionId:5101,type:6501}:{divisionId:this.divisionId.substr(0,6),type:6501}),
						params:{params3:this.currentPage,params4:10},
					},(request)=>{
						if(request.errorCode ==0){
							for(let item of request.data.pageData){
								if(item.updateAt){
									item.day = item.updateAt.substr(8,2)
									item.month = item.updateAt.substr(0,7)
								}
							}
							this.pageTotal = request.data.totalCount;
							this.dataList = this.dataList.concat(request.data.pageData) ;
							this.hasMoreData =  this.pageTotal>this.dataList.length
						}
						else{
							this.hasMoreData = false;
						}
					},(err)=>{
						this.$Message.error("网络异常！加载列表失败！")
					})
				}
				else if(this.currenTag == 0){
					infoServer.policylist({
						data:{divisionId:5101,type:6502},
						params:{params3:this.currentPage,params4:10},
					},(request)=>{
						if(request.errorCode ==0){
							for(let item of request.data.pageData){
								if(item.updateAt){
									item.day = item.updateAt.substr(8,2)
									item.month = item.updateAt.substr(0,7)
								}
							}
							this.pageTotal = request.data.totalCount;
							this.dataList = this.dataList.concat(request.data.pageData) ;
							this.hasMoreData =  this.pageTotal>this.dataList.length
						}
						else{
							this.hasMoreData = false;
						}
					},(err)=>{
						this.$Message.error("网络异常！加载列表失败！")
					})
				}
				else if(this.currenTag == 2){
					infoServer.infolist({
						data:{divisionId:this.divisionId,"type":301},
						params:{params3:this.currentPage,params4:10},
					},(request)=>{
						if(request.errorCode ==0){
							for(let item of request.data.pageData){
								if(item.updateAt){
									item.day = item.updateAt.substr(8,2)
									item.month = item.updateAt.substr(0,7)
								}
							}
							this.pageTotal = request.data.totalCount;
							this.dataList = this.dataList.concat(request.data.pageData) ;
							this.hasMoreData =  this.pageTotal>this.dataList.length
						}
						else{
							this.hasMoreData = false;
						}
					},(err)=>{
						this.$Message.error("网络异常！加载列表失败！")
					})
				}
				else if(this.currenTag == 4){
					infoServer.infolist({
						data:{divisionId:this.divisionId,"type":302},
						params:{params3:this.currentPage,params4:10},
					},(request)=>{
						if(request.errorCode ==0){
							for(let item of request.data.pageData){
								if(item.updateAt){
									item.day = item.updateAt.substr(8,2)
									item.month = item.updateAt.substr(0,7)
								}
							}
							this.pageTotal = request.data.totalCount;
							this.dataList = this.dataList.concat(request.data.pageData) ;
							this.hasMoreData =  this.pageTotal>this.dataList.length
						}
						else{
							this.hasMoreData = false;
						}
					},(err)=>{
						this.$Message.error("网络异常！加载列表失败！")
					})
				}
			}
		},
		//tab切换
		tabChange(tag){
			this.currenTag = tag;
			this.getListData();
		},
		// 跳转详情
		goDetails(id){
			let obj = {};
			obj.type = this.currenTag;
			obj.id = id;//query:{type:1}}
				if(this.$route.path.indexOf("/xian")!=-1){
					this.$router.push({name:"xian-infomation-details",query:{type:this.currenTag,id,queryDivisionId:(this.session.get("cityId")).slice(0,6)}})
				}else{
					this.$router.push({name:"infomation-details",query:{type:this.currenTag,id}})
				}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.policy-infomation{

		width: 1200px;
	//	min-width: 1200px;
		// max-width: 1200px;
		margin: 0 auto;
		.page-title{
			height: 48px;
			font-size: 20px;
			font-weight: bold;
			color:#666;
			line-height: 48px;
			padding-left:15px;
			position: relative;
		}
		.page-title:before{
			content: "";
			display: block;
			width: 2px;
			height: 24px;
			background-color: #ffbc1b;
			left:0;
			top:12px;
			position: absolute;
		}
		.tabs{
			border-bottom: 1px solid #d0d0d0;
			height: 32px;
			margin-top:20px;
			padding-left: 30px;
			a{
				display: inline-block;
				padding: 0 10px;
				font-size: 14px;
				height: 32px;
				color:#333;
				line-height: 32px;
			}
			a.cur{
				color: #ffbc1b;
				font-weight: bold;
				border-left: 1px solid #d0d0d0;
				border-right: 1px solid #d0d0d0;
				border-top:2px solid #ffbc1b;
				border-bottom: #ffffff 1px solid;
				font-size: 16px;
			}
		}
		.show-more{
			font-size: 16px;
			color:#666;
			border:1px solid #ccc;
			display: block;
			width: 200px;
			height: 48px;
			text-align: center;
			margin: 10px auto;
			border-radius: 4px;
			line-height: 48px;
		}
		.no-more{
			font-size: 16px;
			color:#666;
			border:0;
			display: block;
			width: 200px;
			height: 48px;
			text-align: center;
			margin: 10px auto;
			border-radius: 4px;
			line-height: 48px;
		}
		.info-list{
			li{
				border-bottom: 1px solid #d0d0d0;
				display: flex;
				.left-date{
					display: inline-block;
					width: 120px;
					height: 120px;
					padding: 20px 20px;
					.day{
						font-size: 32px;
						line-height: 48px;
						line-height: 48px;
						text-align: center;
						border-bottom:1px solid #d0d0d0;
					}
					p{
						font-size: 14px;
						line-height: 28px;
						text-align: center;
					}
				}
				.content{
					flex:1;
					padding-top:15px;
					padding-left: 20px;
					h3{
						font-size: 18px;
						font-weight: 900;
					}
					h3:hover{
						color: #ffbc1b;
						cursor: pointer;
					}
					p{
						margin-top: 10px;
						font-size: 12px;
					}
				}
			}

		}
	}
</style>
