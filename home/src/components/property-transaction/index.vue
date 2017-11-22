<template>
<div class="property-transaction">
	<card :dis-hover="true" v-for="(type,index) in typeArray" :key="index"  :padding="0" :bordered="false">
		<h3 class="title">{{type.name}}</h3>
		<ul>
			<li v-for="(item,index) in type.array" :key="index">
				<Row>
					<Col class="content" span="12">
						<span  @click="jumpToDetail(item.id)" > {{item.articleTitle}} </span>
					</Col>
					<Col class="price" span="6">
						{{item.expectedPrice}}
					</Col>
					<Col class="time" span="6">
						{{item.pubTime}}
					</Col>
				</Row>
			</li>
		</ul>
	</card>
    <v-footer></v-footer>
</div>
</template>

<script>

import transationServer from "rs/propertyTransaction"
export default {
	name: 'home',
	data() {
		return {
			typeArray:[
				{name:"土地承包经营权",propertyType:18,array:[]},
				{name:"林权",propertyType:19,array:[]},
				{name:"集体建设用地使用权",propertyType:20,array:[]},
				{name:"农村房屋",propertyType:21,array:[]},
				{name:"土地综合整治",propertyType:23,array:[]},
				{name:"集体经营性质产",propertyType:127,array:[]},
			]
		}
	},
	mounted() {
	},
	created(){

	    // if(!this.session.get('token')){
	    //   this.$Modal.confirm({
	    //     title: '您还未登录',
	    //     content: '<p>是否去登录？</p>',
	    //     onOk: () => {
	    //       this.$router.push({path:'login-and-register',query:{type:1,id:"country-credit"}})
	    //     },
	    //     onCancel: () => {
	    //       this.$router.go(-1);
	    //     }
	    //   });
	    // }else{
			this.getList()
		// }

	},
	computed: {

	},
	methods: {
		jumpToDetail(id){
			if(this.$route.fullPath.indexOf("/xian")!=-1){
				this.$router.push({name:"xianPropertyTransactionDetails",query:{id}})
			//	window.open("#/xian/property-transaction/transaction-details?id="+id+"&queryDivisionId="+(this.session.get("cityId")).slice(0,6))
			}else{
				this.$router.push({name:"propertyTransactionDetails",query:{id}})
				// window.open("#/property-transaction/transaction-details?id="+id)
			}
		},
		getList(){
			for(let item of this.typeArray){
				transationServer.find({
					params:{
						params2:1,
						params3:10,
					},
					data:{
						propertyType:item.propertyType,
						isCj:true
					}
				},res=>{
					if(res.errorCode == 0 ){
						item.array = res.data.pageData
					}
				},err=>{
					this.$Message.error(item.name+"请求失败！")
				})
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.property-transaction{

		width: 1200px;
		margin: 0 auto;

		.ivu-card{

			margin: 20px auto;
			overflow: hidden;
			.title{
				font-size:16px;
				color:rgba(255,118,43,1);
				height: 20px;
				line-height: 20px;
				margin:15px 0;
				border-left: 4px solid #FF762B;
				padding-left: 30px;
			}
			ul{
				border-top:1px solid #E0e0e0;
				padding-bottom: 10px;
				li{
					height: 50px;
					line-height: 50px;
					padding-left: 30px;
					.content{
						white-space: nowrap;
						padding-right: 40px;
						overflow: hidden;
						text-overflow: ellipsis;
						span:hover{
							cursor: pointer;
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
</style>
