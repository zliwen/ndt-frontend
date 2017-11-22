<template>
<div v-if="show">
	<div class="info-details" :style="{'min-height':$store.state.screenHeight-280-70+'px'}">
		<div class="history overflow">
			<a @click="goback()">{{parentNode.name}}</a>
			<span>></span>
      <a @click="goback(type.key)">{{type.value}}</a>
			<span>></span>
			<span class="title">正文</span>
		</div>
		<div class="article" >
			<h3 class="article-title">{{articleTitle}}</h3>
			<p class="article-info">
				<span>发布时间：{{updateAt}}</span>
				&nbsp;&nbsp;&nbsp;
				<span>消息来源：{{source}}</span>
			</p>
			<div v-html="articleContent" class="content"></div>
		</div>
	</div>
    <v-footer  style="border-top:1px solid #d0d0d0"></v-footer>
</div>
</template>

<script>

import infoServer from 'rs/infoServer'
export default {
	name: 'home',
	data() {
		return {
			minH:0,
			articleTitle:'',
			articleContent:'',
			updateAt:"",
			source:"",
      type:{},
      show:false,
			parentNode:{name:"政策资讯",r:"xian-policy-infomation"}
		}
	},
	mounted() {
	},
	created(){
		if(this.$route.path.indexOf("/comprehensive")!=-1){
			this.parentNode = {name:"综合服务",r:"xian-comprehensive"}
		}
		else{
			this.parentNode = {name:"政策资讯",r:"xian-policy-infomation"}
		}
		this.getDatiles();
	},
	computed: {

	},
	filters: {
	},
	methods: {
		// 获取列表
		getDatiles(){
      this.currenTag = this.$route.query.type;
//      this.type = {key:this.currenTag,value:res.data.typeValue}
      switch (+this.currenTag){
        case 0:
          this.type = {key:0,value:"农贷通政策"};break;
        case 1:
          this.type = {key:1,value:this.$route.path.indexOf("/xian")!=-1?"成都市政策":"农业政策"};break;
        case 3:
          this.type = {key:3,value:"本县/区政策"};break;
        case 2:
          this.type = {key:2,value:"信息动态"};break;
        case 4:
          this.type = {key:4,value:"村务信息"};break;
      };
			let obj = {};
			obj.type= this.$route.query.type;
			obj.id = this.$route.query.id;
			if(obj.type==1||obj.type==0||obj.type==3){
				infoServer.policyDetails({
					params:{id:obj.id}
				},res=>{
					if(res.errorCode == 0){
					  this.show = true;
						this.articleTitle = res.data.title;
						this.updateAt = res.data.createAt.substr(0,10);
						this.source = res.data.source?res.data.source:res.data.updateName;
						this.articleContent = res.data.content;
					}
				},err=>{

				})

			}else if(obj.type==2||obj.type==4){
				infoServer.infoDetails({
					params:{id:obj.id}
				},res=>{
					if(res.errorCode == 0){
            this.show = true;
						this.articleTitle = res.data.title;
						this.updateAt =  res.data.updateAt?res.data.updateAt.substr(0,10):"";
						this.source = res.data.source?res.data.source:res.data.updateName;
						this.articleContent = res.data.content;
            if(this.$route.path.indexOf("/comprehensive")!=-1){
              switch (res.data.type){
                case 306:
                  this.type = {key:306,value:"特色美食"};break;
                case 305:
                  this.type = {key:305,value:"特色景点"};break;
                case 304:
                  this.type = {key:304,value:"种植指导"};break;
                case 303:
                  this.type = {key:303,value:"招工用工"};break;
              };
            }
					}
				},err=>{

				})
			}

		},
		//tab切换
		goback(type){
		  let dft = this.$route.path.indexOf("/comprehensive")!=-1?306:0;
			if(this.$route.path.indexOf("/xian")!=-1){
				this.$router.push({name:this.parentNode.r,query:{type:type||dft}})
			}else{
				this.$router.push({name:"policy-infomation",query:{type:type||dft}})
			}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	.info-details{
		margin: 0 auto;
		width: 900px;
		padding-bottom: 100px;
		.history{
      padding-top: 20px;
			line-height: 42px;
			text-indent: 5px;
      font-size: 12px;
			a{
				color: #000;
			}
			span.title{
				color:#666;
			}
		}
        div.article{
			padding: 0 16px;
			h3.article-title{
				color: #303030;
				font-size: 24px;
				font-weight: 600;
				/*margin-top: 10px;*/
				line-height: 48px;
			}
			p.article-info{
        border-bottom:1px solid #d0d0d0;
				/*text-align: center;*/
        margin-bottom: 60px;
        color:#696969;
				font-size: 12px;
				line-height: 36px;
			}
			div.content{
				color: #657180;
				font-size:16px;
				margin: 0;
				line-height: 24px;
			}
        }
	}
</style>
