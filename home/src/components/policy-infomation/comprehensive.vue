<template>
<div class="comprehensive-infomation">
	<h2 class="page-title">综合服务</h2>
	<div class="tabs">

		<a v-for="(item,index) in tabs":key="index"
			:class="currenTag==item.type?'cur':''"
			@click='tabChange(item.type)'>
			{{item.name}}
		</a>

	</div>
	<div style="min-height:600px;">
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

    <v-footer></v-footer>
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
			currenTag:304,
			pageTotal:0,
			dataList:[],
			divisionId:"",
			hasMoreData:true,
			isSub:false,
			tabs:[
				{
					type:304,
					name:"种植指导"
				},
				{
					type:303,
					name:"招工用工"
				},
				{
					type:306,
					name:"特色美食"
				},
				{
					type:305,
					name:"特色景点"
				}
			]
		}
	},
	mounted() {

	},
	created(){
		let d = this.$route.query
		if(d.type) this.currenTag = d.type;
		if(d.tsid) {
			this.isSub = true;
			this.divisionId = d.tsid.slice(0,6);
		}
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
			infoServer.infolist({
				data:{divisionId:this.divisionId,type:this.currenTag,searchType:4,},
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
			},(err)=>{

			})
		},
		getMoreList(){
			if(this.dataList.length >= this.pageTotal){
				this.hasMoreData = false;
			}
			else{
				this.currentPage = this.currentPage+1;
				infoServer.infolist({
					data:{divisionId:this.divisionId,type:this.currenTag,searchType:4,},
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
				},(err)=>{

				})
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
				this.$router.push({name:"xian-comprehensive-details",query:{type:2,id,queryDivisionId:(this.session.get("cityId"))}})
			}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.comprehensive-infomation{

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
