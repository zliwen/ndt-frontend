<!--
	作者：zhanglw
	时间：2017-11-07
	描述：村站工作报表
-->
<template>
	<div class="villageWorkReport">
		<Loading v-show="loading"></Loading>
	 	<div class="villageWorkReport-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">统计报表</BreadcrumbItem>
                <BreadcrumbItem>村站工作报表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="job-summary">
        	<div class="title-summary">
        		<span>村站工作概要</span>
        		<div v-show="false">
        			<span>地区</span>
        			<GetCity :set-value="divisionId"
                           @onChange="adminDivisionIdChange"
                           :changeOnSelect="changeOnSelect"></GetCity>
        		</div>
        	</div>
        	<Row style="color: #5f5e5e;font-size: 14px;margin-bottom: 15px;font-weight: 600;">
        		<Col span="6">&nbsp;</Col>
        		<Col span="6">采集新型经营主体</Col>
        		<Col span="6">采集农户数</Col>
        		<Col span="6">发布村务信息数</Col>
        	</Row>
        	<Row v-for="item in data1" style="font-size: 14px;margin-bottom: 15px;">
        		<Col span="6">{{item.k1}}</Col>
        		<Col span="6">{{item.k2}}</Col>
        		<Col span="6">{{item.k3}}</Col>
        		<Col span="6">{{item.k4}}</Col>
        	</Row>
        </div>
        <div class="job-detail">
        	<div class="nar-detail">
        		<Button :type="itemFlag==1?'primary':'ghost'" @click="changeItem(1)">今日</Button>
        		<Button :type="itemFlag==2?'primary':'ghost'" @click="changeItem(2)">近7日</Button>
        		<Button :type="itemFlag==3?'primary':'ghost'" @click="changeItem(3)">近30日</Button>
        		<Button :type="itemFlag==4?'primary':'ghost'" @click="changeItem(4)">近半年</Button>
        	</div>
        	<Row>
        		<Col span="24" style="padding: 0px 20px 20px;">
        			<Card shadow>
        				<div class="">
				          <div ref="creditCollection" style="height:400px;"></div>
				      	</div>
        			</Card>
        		</Col>
        	</Row>
        	<Row>
        		<Col span="24" style="padding: 0px 20px 20px;">
        			<Card shadow>
	        			<div class="title">
	        				<span>村站人员采集数量TOP10</span>
	        				<label>总计 : {{pacquisition.total}} 户</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in pacquisition.list">
	        					<Col span="4">{{item.userName}}</Col>
	        					<Col span="4">{{item.countyName}}</Col>
	        					<Col span="4">{{item.townName}}</Col>
	        					<Col span="4">{{item.divisionName}}</Col>
	        					<Col span="5">{{item.count}}户</Col>
	        					<Col span="3">{{(item.count/pacquisition.total*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        		</Col>
        	</Row>
        	<Row>
        		<Col span="12" style="padding: 0px 20px 20px;">
        			<Card shadow>
	        			<div class="title">
	        				<span>村站机构采集数量TOP10</span>
	        				<label>总计 : {{macquisition.total}} 户</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in macquisition.list">
	        					<Col span="7">{{item.villageFullName.replace("四川省", "").replace("成都市", "")}}</Col>
	        					<Col span="4">{{item.countyName}}</Col>
	        					<Col span="4">{{item.townName}}</Col>
	        					<Col span="4">{{item.villageName}}</Col>
	        					<Col span="2">{{item.count}}户</Col>
	        					<Col span="3">{{(item.count/macquisition.total*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        		</Col>
        		<Col span="12" style="padding: 0px 20px 20px;">
        			<Card shadow>
	        			<div class="title">
	        				<span>村务信息发布数量TOP10</span>
	        				<label>总计 : {{infoDelivery.total}} 条</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in infoDelivery.list">
	        					<Col span="7">{{item.villageHeadName.replace("四川省", "").replace("成都市", "")}}</Col>
	        					<Col span="4">{{item.countyName}}</Col>
	        					<Col span="4">{{item.townName}}</Col>
	        					<Col span="4">{{item.villageName}}</Col>
	        					<Col span="2">{{item.count}}条</Col>
	        					<Col span="3">{{(item.count/infoDelivery.total*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        		</Col>
        	</Row>
        </div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import operateplatformReport from 'rs/operateplatformReport'
	import villageWorkReport from 'rs/villageWorkReport'

	export default {
		data(){
			let thisMonthStart = this.format(new Date(), 'yyyy-MM')+'-01';
			let thisMonthEnd = this.format(new Date(), 'yyyy-MM-dd');
			let lastMonthStart = this.lastMonth()[0];
			let lastMonthEnd = this.lastMonth()[1];
			let sevenDays = this.fun_date(-6); //近七天
			let thirtyDays = this.fun_date(-29); //近30天
			let halfYear = this.getPastHalfYear(); //近半年
			let thisTimeStart = this.format(new Date(), 'yyyy-MM-dd')+" 00:00:00";
			let thisTimeEnd = this.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
			return {
				thisMonthStart,
				thisMonthEnd,
				lastMonthStart,
				lastMonthEnd,
				sevenDays,
				thirtyDays,
				halfYear,
				thisTimeStart,
				thisTimeEnd,
				loading:true,
				changeOnSelect: true,
				itemFlag:1,
				divisionId:this.session.get("divisions")==null?5101:JSON.parse(this.session.get("divisions"))[0],
				currentDivisionId:this.session.get("divisions")==null?5101:JSON.parse(this.session.get("divisions"))[0],
				type:'hour',
				data1:[
					{k1:"总计", k2:"0", k3:"0", k4:"0"},
					{k1:"本月", k2:"0", k3:"0", k4:"0"},
					{k1:"上月", k2:"0", k3:"0", k4:"0"}
				],
				creditCollectionOpt:{
				    title: {
				        text: '信用指标采集趋势',
				        textStyle:{
					        //文字颜色
					        color:'#000000',
					        //字体大小
					　　　　 fontSize:14
					    }
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'cross',
				            label: {
				                backgroundColor: '#6a7985'
				            }
				        }
				    },
				    legend: {
				        data:['新型经营主体','农户']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : []
				        }
				    ],
				    yAxis : [
				        {
				        	name:'户',
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'新型经营主体',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[]
				        },
				        {
				            name:'农户',
				            type:'line',
				            stack: '总量',
				            areaStyle: {normal: {}},
				            data:[]
				        }
				    ]
				},
				pacquisition:{}, //人员采集
				macquisition:{}, //机构采集
				infoDelivery:{} //信息发布
			}
		},
		created:function(){
			this.generalizationInit();
			this.changeItem(this.itemFlag);
		},
		methods:{
			generalizationInit(){
				let thisCompany = 0;
				let thisPersonal = 0;
				let lastCompany = 0;
				let lastPersonal = 0;
				let thisNews = 0;
				let lastNews = 0;
				//本月新采集新型经营主体,新采集农户数
				operateplatformReport.getvillage({}, {
					divisionId: this.divisionId,
					creatStartTime: this.thisMonthStart,
					creatEndTime:this.thisMonthEnd
				}, rsp=>{
					if(rsp.errorCode == 0){
						rsp.data.companyData.forEach(function(e){
							thisCompany += e.total;
						})
						rsp.data.personalData.forEach(function(e){
							thisPersonal += e.total;
						})
						this.data1[1].k2 = thisCompany;
						this.data1[1].k3 = thisPersonal;
					}
				}, err=>{

				});
				//上月新采集新型经营主体,新采集农户数
				operateplatformReport.getvillage({}, {
					divisionId: this.divisionId,
					creatStartTime: this.lastMonthStart,
					creatEndTime:this.lastMonthEnd
				}, rsp=>{
					if(rsp.errorCode == 0){
						rsp.data.companyData.forEach(function(e){
							lastCompany += e.total;
						})
						rsp.data.personalData.forEach(function(e){
							lastPersonal += e.total;
						})
						this.data1[2].k2 = lastCompany;
						this.data1[2].k3 = lastPersonal;
					}
				}, err=>{

				});
				//本月 新发布村务信息数
				operateplatformReport.getNews({}, {
					divisionId:this.divisionId,
					creatStartTime:this.thisMonthStart,
					creatEndTime:this.thisMonthEnd
				}, rsp=>{
					if(rsp.errorCode == 0){
						rsp.data.forEach(function(e){
							e.infoData.forEach(function(n){
								if(n.type == 302){
									thisNews += n.total;
								}
							})
						})
						this.data1[1].k4 = thisNews;
					}
				}, err=>{

				});
				//上月 新发布村务信息数
				operateplatformReport.getNews({}, {
					divisionId:this.divisionId,
					creatStartTime:this.lastMonthStart,
					creatEndTime:this.lastMonthEnd
				}, rsp=>{
					if(rsp.errorCode == 0){
						rsp.data.forEach(function(e){
							e.infoData.forEach(function(n){
								if(n.type == 302){
									lastNews += n.total;
								}
							})
						})
						this.data1[2].k4 = lastNews;
					}
					this.loading = false
				}, err=>{
					this.loading = false
				});

				//村站工作报表总计接口
				operateplatformReport.villageStatementTotal({}, {
					divisionId: this.divisionId
				}, rsp=>{
					if(rsp.errorCode == 0){
						this.data1[0].k2= rsp.data.companyTotal
						this.data1[0].k3= rsp.data.personalTotal
						this.data1[0].k4= rsp.data.villageNewsTotal
					}
				}, err=>{

				})
			},
			detailedInit(start, end){
				//村站人员采集数量
				villageWorkReport.villagePeopleCollectNum({}, {
					divisionId:this.currentDivisionId,
					limitNum:10,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						this.pacquisition = rsp.data;
					}
				}, err=>{

				});
				//村站机构采集数量
				villageWorkReport.villageCollectNum({}, {
					divisionId:this.currentDivisionId,
					limitNum:10,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						this.macquisition = rsp.data;
					}
				}, err=>{

				});
				//村务信息发布数量
				villageWorkReport.villageInfoNum({}, {
					divisionId:this.currentDivisionId,
					limitNum:10,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						this.infoDelivery = rsp.data;
					}
					this.loading = false
				}, err=>{
					this.loading = false
				});
				//信用指标采集趋势统计（农户，企业）
				villageWorkReport.creditTrent({}, {
					divisionId:this.currentDivisionId,
					type:this.type,
					startTime:start,
					entTime:end
				}, rsp=>{
					this.creditCollectionOpt.series[0].data=[];
					this.creditCollectionOpt.xAxis[0].data=[];
					this.creditCollectionOpt.series[1].data=[];
					if(rsp.errorCode == 0){
						let companyData = rsp.data.companyData;
						let personalData = rsp.data.personalData;
						let that = this;
						let tempObj = {};
						companyData.forEach(function(e){
							let val;
							if(that.type == 'hour'){
								val = e.val.split(" ")[1].substring(0, e.val.split(" ")[1].lastIndexOf(":"));
							}else if(that.type == 'day'){
								val = e.val.split(" ")[0];
							}else if(that.type == 'month'){
								val = e.val.split(" ")[0].substring(0, e.val.split(" ")[0].lastIndexOf("-"));
							}
							tempObj[val]={qy:e.count, gr:0}
						})
						personalData.forEach(function(e){
							let val;
							if(that.type == 'hour'){
								val = e.val.split(" ")[1].substring(0, e.val.split(" ")[1].lastIndexOf(":"));
							}else if(that.type == 'day'){
								val = e.val.split(" ")[0];
							}else if(that.type == 'month'){
								val = e.val.split(" ")[0].substring(0, e.val.split(" ")[0].lastIndexOf("-"));
							}
							if(tempObj[val]){
								tempObj[val]["gr"]=e.count
							}else{
								tempObj[val]={gr:e.count, qy:0}
							}
						})
						let objKeys = Object.keys(tempObj);
						objKeys = objKeys.sort();
						objKeys.forEach(function(key){
							that.creditCollectionOpt.xAxis[0].data.push(key)
							that.creditCollectionOpt.series[0].data.push(tempObj[key]["qy"])
							that.creditCollectionOpt.series[1].data.push(tempObj[key]["gr"])
						})
					}
					this.creditCollectionInit();
				}, err=>{

				})
			},
			changeItem(flag){
				this.itemFlag = flag;
				if(flag==1){ //今日
					this.type = 'hour';
					this.detailedInit(this.thisTimeStart, this.thisTimeEnd);
				}else if(flag==2){ //近七天
					this.type = 'day';
					this.detailedInit(this.sevenDays, this.thisMonthEnd+' 23:59:59');
				}else if(flag==3){ //近30天
					this.type = 'day';
					this.detailedInit(this.thirtyDays, this.thisMonthEnd);
				}else if(flag==4){ //近半年
					this.type = 'month';
					this.detailedInit(this.halfYear, this.thisMonthEnd);
				}
			},
		    adminDivisionIdChange(data){
		        this.divisionId=data[data.length-1];
		        this.generalizationInit();
		    },
		    creditCollectionInit(){
		   		let dom = this.$refs.creditCollection;
	            let creditChart = echarts.init(dom);
	            creditChart.setOption(this.creditCollectionOpt);
		    },
		    format(time, format){
				var t = new Date(time);
				var tf = function(i){return (i < 10 ? '0' : '') + i};
				return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
					switch(a){
						case 'yyyy':
						return tf(t.getFullYear());
						break;
						case 'MM':
						return tf(t.getMonth() + 1);
						break;
						case 'mm':
						return tf(t.getMinutes());
						break;
						case 'dd':
						return tf(t.getDate());
						break;
						case 'HH':
						return tf(t.getHours());
						break;
						case 'ss':
						return tf(t.getSeconds());
						break;
					}
				})
			},
			lastMonth(){
				let nowdays = new Date();
			    let year = nowdays.getFullYear();
			    let month = nowdays.getMonth();
			    if(month==0)
			    {
			        month=12;
			        year=year-1;
			    }
			    if (month < 10) {
			        month = "0" + month;
			    }
			    let firstDay = year + "-" + month + "-" + "01";//上个月的第一天

			    let myDate = new Date(year, month, 0);
			    let lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

			    return [firstDay, lastDay];
			},
			fun_date(aa){ //七天前或后的日期
		        let date1 = new Date();
		        let date2 = new Date(date1), month, day;
		        date2.setDate(date1.getDate()+aa);
		        month = date2.getMonth()+1;
		        day = date2.getDate();
		        if(month < 10){
		        	month = "0"+month;
		        }
		        if(day < 10){
		        	day = "0"+day;
		        }
		        let time2 = date2.getFullYear()+"-"+month+"-"+day;

		        return time2;
		   },
		   getPastHalfYear() { //近半年前的时间
			    // 先获取当前时间
			    var curDate = (new Date()).getTime();
			    // 将半年的时间单位换算成毫秒
			    var halfYear = 365 / 2 * 24 * 3600 * 1000;
			    var pastResult = curDate - halfYear;  // 半年前的时间（毫秒单位）

			    // 日期函数，定义起点为半年前
			    var pastDate = new Date(pastResult),
			        pastYear = pastDate.getFullYear(),
			        pastMonth = pastDate.getMonth() + 1,
			        pastDay = pastDate.getDate();

			 	if(pastMonth < 10){
			 		pastMonth = "0"+pastMonth;
			 	}
			 	if(pastDay < 10){
			 		pastDay = "0"+pastDay;
			 	}
			    return pastYear + '-' + pastMonth + '-' + pastDay;
			}
		}
	}
</script>

<style scoped lang="less">
	.villageWorkReport{
		background: #f5f7f9;
        position: relative;
        color: #657180;
        .villageWorkReport-breadcrumb{
       		padding: 10px 15px 0;
    	}

    	.ivu-table-wrapper{
    		border: none;
    	}
    	.ivu-table th, .ivu-table td{
    		border-bottom: none;
    	}

    	.job-summary{
    		margin: 20px;
    		font-size: 16px;
    		padding-bottom: 20px;
    		border-bottom: 1px #dfdddd solid;
    		.title-summary{
    			margin-bottom: 10px;
    			>span{
    				line-height: 32px;
    				color: #000000;
    				font-weight: 700;
    			}
    			div{
    				display: inline-block;
    				float: right;
    				.GetCity{
		            	display: inline-block;
		            	width: 400px;
		            }
		            span{
		            	margin-right: 5px;
		            	line-height: 32px;
		            }
    			}
    		}
    	}

    	.job-detail{
    		margin: 0px 20px 20px;
    		font-size: 16px;
    		.nar-detail{
    			margin-bottom:20px;
    		}
    		.title{
    			color: #000000;
    			font-weight: 700;
    			label{
    				float: right;
    			}
    		}
    		.content{
    			margin-top: 20px;
    			font-size: 14px;
    			span{
    				margin-right: 20px;
    			}
    		}
    		.ivu-card-shadow {
			    border: 1px rgba(0, 0, 0, 0.1) solid;
			    /*border-left: none;
			    border-bottom: none;*/
			    min-height: 433px;
		    }
    		> .ivu-row{
    			/*background:#eee;*/
    			.ivu-row .ivu-col{
    				margin-bottom: 15px;
    			}
    		}
    	}
	}
</style>
