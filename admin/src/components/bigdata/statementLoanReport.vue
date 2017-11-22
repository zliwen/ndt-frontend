<!--
	作者：zhanglw
	时间：2017-11-07
	描述：贷款业务报表
-->
<template>
	<div class="villageWorkReport">
		<Loading v-show="loading"></Loading>
	 	<div class="villageWorkReport-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">统计报表</BreadcrumbItem>
                <BreadcrumbItem>贷款业务报表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="job-summary">
        	<div class="title-summary">
        		<span>贷款概要</span>
        		<div v-show="false">
        			<span>银行</span>
        			<Select style="width:200px">
				        <Option value="1">人民银行</Option>
				    </Select>
        		</div>
        		<div v-show="false">
        			<span>地区</span>
        			<GetCity :set-value="divisionId"
                           @onChange="adminDivisionIdChange"
                           :changeOnSelect="changeOnSelect"></GetCity>
        		</div>
        	</div>
        	<Row style="color: #5f5e5e;font-size: 14px;margin-bottom: 15px;font-weight: 600;">
        		<Col span="4">&nbsp;</Col>
        		<Col span="5">申请金额／笔数</Col>
        		<Col span="5">受理金额／笔数</Col>
        		<Col span="5">放款金额／笔数</Col>
        		<Col span="5">还完金额／笔数</Col>
        	</Row>
        	<Row v-for="item in data1" style="font-size: 14px;margin-bottom: 15px;">
        		<Col span="4">{{item.k1}}</Col>
        		<Col span="5">{{item.k2}}</Col>
        		<Col span="5">{{item.k3}}</Col>
        		<Col span="5">{{item.k4}}</Col>
        		<Col span="5">{{item.k5}}</Col>
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
        		<Col span="12" style="padding: 0px 20px 20px;">
        			<Card shadow>
	        			<div class="">
				          <div ref="lendingTrends" style="height:400px;"></div>
				      	</div>
			      	</Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>银行申请金额TOP10</span>
	        				<label>总计 : {{(orgApplyAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in orgApplyAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/orgApplyAmount.totalAmount*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>银行受理金额TOP10</span>
	        				<label>总计 : {{(orgAcceptAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in orgAcceptAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/orgAcceptAmount.totalAmount*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>银行放款金额TOP10</span>
	        				<label>总计 : {{(orgLoanDoneAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in orgLoanDoneAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/orgLoanDoneAmount.totalAmount*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        		</Col>
        		<Col span="12" style="padding: 0px 20px 20px;">
        			<Card shadow>
	        			<div class="">
				          <div ref="acceptanceLoanTrend" style="height:400px;"></div>
				        </div>
			        </Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>区县申请金额TOP10</span>
	        				<label>总计 : {{(countyApplyAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in countyApplyAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/countyApplyAmount.totalAmount*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>区县受理金额TOP10</span>
	        				<label>总计 : {{(countyAcceptAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in countyAcceptAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/countyAcceptAmount.totalAmount*100).toFixed(2)}}%</Col>
	        				</Row>
	        			</div>
        			</Card>
        			<Card shadow>
	        			<div class="title">
	        				<span>区县放款金额TOP10</span>
	        				<label>总计 : {{(countyLoanDoneAmount.totalAmount/1e4).toFixed(2)}} 万元</label>
	        			</div>
	        			<div class="content">
	        				<Row :gutter="14" v-for="item in countyLoanDoneAmount.list">
	        					<Col span="12">{{item.name}}</Col>
	        					<Col span="8">{{(item.amount/1e4).toFixed(2)}} 万元</Col>
	        					<Col span="4">{{(item.amount/countyLoanDoneAmount.totalAmount*100).toFixed(2)}}%</Col>
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
	import statementLoanReport from 'rs/statementLoanReport'
	
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
				orgId:null,
				divisionId:this.session.get("divisions")==null?5101:JSON.parse(this.session.get("divisions"))[0],
				thisDivisionId:this.session.get("divisions")==null?5101:JSON.parse(this.session.get("divisions"))[0],
				tjType:'hour',
				data1:[
					{k1:"总计", k2:"", k3:"", k4:"", k5:''},
					{k1:"本月", k2:"", k3:"", k4:"", k5:''},
					{k1:"上月", k2:"", k3:"", k4:"", k5:''}
				],
				orgApplyAmount:{},
				orgAcceptAmount:{},
				orgLoanDoneAmount:{},
				countyApplyAmount:{},
				countyAcceptAmount:{},
				countyLoanDoneAmount:{},
				tempObj:{},
				lendingTrendsOpt:{
					title:{
						text:'受理／放款趋势',
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
	                	left:'right',
	                    data:['新增受理金额','新增放款金额']
	                },
	                grid: {
	                    left: '3%',
	                    right: '4%',
	                    bottom: '3%',
	                    containLabel: true
	                },
	                xAxis: {
	                    type : 'category',
				        boundaryGap : false,
	                    data : []
	                },
	                yAxis: {
	                	name:'万元',
	                    type: 'value'
	                },
	                series: [
	                    {
	                        name:'新增受理金额',
	                        type:'line',
	                        data:[]
	                    },{
	                        name:'新增放款金额',
	                        type:'line',
	                        data:[]
	                    }
	                ]
	            },
	            acceptanceLoanTrendOpt:{
	            	title:{
	            		text:'区县受理／放款区域',
	            		textStyle:{
					        //文字颜色
					        color:'#000000',
					        //字体大小
					　　　　 fontSize:14
					    }
	            	},
	            	tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				    	left:'right',
				        data:["新增受理金额","新增放款金额"]
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
							data : [],
							axisLabel:{  
								interval: 0,
								// rotate:15,
							}  
				        }
				    ],
				    yAxis : [
				        {
				        	name : '万元',
				            type : 'value'
				        }
				    ],
				    series : [
				    	{name:'新增受理金额',type:'bar',data:[]},
				    	{name:'新增放款金额',type:'bar',data:[]}
				    ]
	            }
			}
		},
		created:function(){
			this.generalizationInit(this.thisMonthStart, this.thisMonthEnd, 'this');
			this.generalizationInit(this.lastMonthStart, this.lastMonthEnd, 'last');
			this.detailedInit(this.thisTimeStart, this.thisTimeEnd, 1);
			setTimeout(()=>{
				this.detailedInit(this.thisTimeStart, this.thisTimeEnd, 2);
			}, 500)
		},
		methods:{
			generalizationInit(start, end, type){
				let k2="",k3="",k4="",k5="";
				//统计申请笔数
				statementLoanReport.loanApplyCount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k2==""){
							k2 = rsp.data+"笔"
						}else{
							k2 = k2+" | "+rsp.data+"笔"
						}
						
						if(type == "this"){
							this.data1[1].k2 = k2;
						}else if(type == "last"){
							this.data1[2].k2 = k2;
						}
					}
				}, err=>{
					
				})
				//统计申请金额
				statementLoanReport.loanApplyAmount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k2==""){
							k2 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"
						}else{
							k2 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"+" | "+k2
						}
						
						if(type == "this"){
							this.data1[1].k2 = k2;
						}else if(type == "last"){
							this.data1[2].k2 = k2;
						}
					}
				}, err=>{
					
				})
				//统计受理笔数
				statementLoanReport.loanAcceptCount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k3==""){
							k3 = rsp.data+"笔"
						}else{
							k3 = k3+" | "+rsp.data+"笔"
						}
						
						if(type == "this"){
							this.data1[1].k3 = k3;
						}else if(type == "last"){
							this.data1[2].k3 = k3;
						}
					}
				}, err=>{
					
				})
				//统计受理金额
				statementLoanReport.loanAcceptAmount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k3==""){
							k3 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"
						}else{
							k3 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"+" | "+k3
						}
						
						if(type == "this"){
							this.data1[1].k3 = k3;
						}else if(type == "last"){
							this.data1[2].k3 = k3;
						}
					}
				}, err=>{
					
				})
				//统计放款笔数
				statementLoanReport.loanDoneCount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k4==""){
							k4 = rsp.data+"笔"
						}else{
							k4 = k4+" | "+rsp.data+"笔"
						}
						
						if(type == "this"){
							this.data1[1].k4 = k4;
						}else if(type == "last"){
							this.data1[2].k4 = k4;
						}
					}
				}, err=>{
					
				})
				//统计放款金额
				statementLoanReport.loanDoneAmount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k4==""){
							k4 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"
						}else{
							k4 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"+" | "+k4
						}
						
						if(type == "this"){
							this.data1[1].k4 = k4;
						}else if(type == "last"){
							this.data1[2].k4 = k4;
						}
					}
				}, err=>{
					
				})
				//统计已还完笔数，查询已还完是传入码值6907
				statementLoanReport.loanDoneCount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					loanDoneState:6907,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k5==""){
							k5 = rsp.data+"笔"
						}else{
							k5 = k5+" | "+rsp.data+"笔"
						}
						
						if(type == "this"){
							this.data1[1].k5 = k5;
						}else if(type == "last"){
							this.data1[2].k5 = k5;
						}
					}
				}, err=>{
					
				})
				//统计已还完金额，查询已还完是传入码值6907
				statementLoanReport.loanDoneAmount({}, {
					divisionId:this.divisionId,
					orgId:this.orgId,
					loanDoneState:6907,
					startTime:start,
					entTime:end
				}, rsp=>{
					if(rsp.errorCode == 0){
						if(k5==""){
							k5 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"
						}else{
							k5 = ((rsp.data==null?0:rsp.data)/1e4).toFixed(2)+"万元"+" | "+k5
						}
						
						if(type == "this"){
							this.data1[1].k5 = k5;
						}else if(type == "last"){
							this.data1[2].k5 = k5;
						}
					}
				}, err=>{
					
				})
				
				//贷款报表总计接口
				if(type == 'this'){
					statementLoanReport.loanStatementTotal({}, {
						divisionId: this.divisionId
					}, rsp=>{
						if(rsp.errorCode == 0){
							this.data1[0].k2 = (rsp.data.loanApplyAmount/1e4).toFixed(2)+"万元 | "+rsp.data.loanApplyCount+"笔"
							this.data1[0].k3 = (rsp.data.loanAcceptAmount/1e4).toFixed(2)+"万元 | "+rsp.data.loanAcceptCount+"笔"
							this.data1[0].k4 = (rsp.data.loanDoneAmount/1e4).toFixed(2)+"万元 | "+rsp.data.loanDoneCount+"笔"
							this.data1[0].k5 = (rsp.data.finishAmount/1e4).toFixed(2)+"万元 | "+rsp.data.finishCount+"笔"
						}
					}, err=>{
						
					})
				}
			},
			detailedInit(start, end, l){
				if(l == 1 || l==3){
					//银行受理/放款趋势统计
					statementLoanReport.acceptLoanDoneTrent({}, {
						divisionId:this.thisDivisionId,
						type:this.tjType,
						startTime:start,
						entTime:end
					}, rsp=>{
						let that = this;
						this.lendingTrendsOpt.xAxis.data=[];
						this.lendingTrendsOpt.series[0].data=[];
						this.lendingTrendsOpt.series[1].data=[];
						if(rsp.errorCode == 0){
							let acceptData = rsp.data.acceptData; //受理
							let loanDoneData = rsp.data.loanDoneData; //放款
							let tempObj={};
							acceptData.forEach(function(e){
								let val;
								if(that.tjType == 'hour'){
									val = e.val.split(" ")[1].substring(0, e.val.split(" ")[1].lastIndexOf(":"));
								}else if(that.tjType == 'day'){
									val = e.val.split(" ")[0];
								}else if(that.tjType == 'month'){
									val = e.val.split(" ")[0].substring(0, e.val.split(" ")[0].lastIndexOf("-"));
								}
								tempObj[val]={sl:(e.amount/1e4).toFixed(2), fk:0}
							})
							loanDoneData.forEach(function(e){
								let val;
								if(that.tjType == 'hour'){
									val = e.val.split(" ")[1].substring(0, e.val.split(" ")[1].lastIndexOf(":"));
								}else if(that.tjType == 'day'){
									val = e.val.split(" ")[0];
								}else if(that.tjType == 'month'){
									val = e.val.split(" ")[0].substring(0, e.val.split(" ")[0].lastIndexOf("-"));
								}
								if(tempObj[val]){
									tempObj[val]["fk"]=(e.amount/1e4).toFixed(2)
								}else{
									tempObj[val]={fk:(e.amount/1e4).toFixed(2), sl:0}
								}
							})
							let objKeys = Object.keys(tempObj);
							objKeys = objKeys.sort();
							objKeys.forEach(function(key){
								that.lendingTrendsOpt.xAxis.data.push(key)
								that.lendingTrendsOpt.series[0].data.push(tempObj[key]["sl"])
								that.lendingTrendsOpt.series[1].data.push(tempObj[key]["fk"])
							})
						}
						this.lendingTrendsInit();
					}, err=>{
						
					})
					
					let that = this;
					this.tempObj={};
					//统计区县受理金额
					statementLoanReport.countyAcceptAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
					  	if(rsp.errorCode == 0){
					  		this.countyAcceptAmount = rsp.data;
					  		this.countyAcceptAmount.list.forEach(function(e){
					  			if(that.tempObj[e.name]){
					  				that.tempObj[e.name]["sl"]=(e.amount/1e4).toFixed(2);
					  			}else{
					  				that.tempObj[e.name]={"sl":(e.amount/1e4).toFixed(2), fk:0};
					  			}
					  		})
					  		if(Object.keys(that.tempObj).length>0){
					  			for(let key in that.tempObj){
					  				if(Object.keys(that.tempObj[key]).length == 2){
					  					this.setDatas(that.tempObj);
					  					break;
					  				}
					  			}
					  		}else{
					  			this.setDatas({});
					  		}
					  	}
					}, err=>{
						
					})
					//统计区县放款金额
					statementLoanReport.countyLoanDoneAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
						if(rsp.errorCode == 0){
					  		this.countyLoanDoneAmount = rsp.data;
					  		this.countyLoanDoneAmount.list.forEach(function(e){
					  			if(that.tempObj[e.name]){
					  				that.tempObj[e.name]["fk"]=(e.amount/1e4).toFixed(2);
					  			}else{
					  				that.tempObj[e.name]={"fk":(e.amount/1e4).toFixed(2), sl:0};
					  			}
					  		})
					  		if(Object.keys(that.tempObj).length>0){
					  			for(let key in that.tempObj){
					  				if(Object.keys(that.tempObj[key]).length == 2){
					  					this.setDatas(that.tempObj);
					  					break;
					  				}
					  			}
					  		}else{
					  			this.setDatas({});
					  		}
					  	}
						this.loading = false;
					}, err=>{
					  	this.loading = false;
					})
				}
				
				if(l==2 || l==3){
					//统计银行申请金额
					statementLoanReport.orgApplyAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
					  	if(rsp.errorCode == 0){
					  		this.orgApplyAmount = rsp.data;
					  	}
					}, err=>{
					  	
					})
					//统计银行受理金额
					statementLoanReport.orgAcceptAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
					  	if(rsp.errorCode == 0){
					  		this.orgAcceptAmount = rsp.data;
					  	}
					}, err=>{
					  	
					})
					//统计银行放款金额
					statementLoanReport.orgLoanDoneAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
					  	if(rsp.errorCode == 0){
					  		this.orgLoanDoneAmount = rsp.data;
					  	}
					}, err=>{
					  	
					})
					
					//统计区县申请金额
					statementLoanReport.countyApplyAmount({}, {
						divisionId:this.thisDivisionId,
						limitNum:10,
						startTime:start,
						entTime:end
					}, rsp=>{
					  	if(rsp.errorCode == 0){
					  		this.countyApplyAmount = rsp.data;
					  	}
					}, err=>{
					  	
					})
				}
			},
			setDatas(obj){
				this.acceptanceLoanTrendOpt.xAxis[0].data=[];
				this.acceptanceLoanTrendOpt.series[0].data=[]; //受理
				this.acceptanceLoanTrendOpt.series[1].data=[]; //放款
				for(let key in obj){
					this.acceptanceLoanTrendOpt.xAxis[0].data.push(key)
					this.acceptanceLoanTrendOpt.series[0].data.push(obj[key]["sl"]) //受理
					this.acceptanceLoanTrendOpt.series[1].data.push(obj[key]["fk"]) //放款
				}
				this.acceptanceLoanTrendInit();
			},
			changeItem(flag){
				this.itemFlag = flag;
				if(flag==1){ //今日
					this.tjType='hour';
					this.detailedInit(this.thisTimeStart, this.thisTimeEnd, 3);
				}else if(flag==2){ //近七天
					this.tjType='day';
					this.detailedInit(this.sevenDays, this.thisMonthEnd+' 23:59:59', 3);
				}else if(flag==3){ //近30天
					this.tjType='day';
					this.detailedInit(this.thirtyDays, this.thisMonthEnd, 3);
				}else if(flag==4){ //近半年
					this.tjType='month';
					this.detailedInit(this.halfYear, this.thisMonthEnd, 3);
				}
			},
			adminDivisionIdChange(data){
		        this.divisionId=data[data.length-1];
		        this.generalizationInit(this.thisMonthStart, this.thisMonthEnd, 'this');
				this.generalizationInit(this.lastMonthStart, this.lastMonthEnd, 'last');
		   },
		   lendingTrendsInit(){
		   		let dom = this.$refs.lendingTrends;
	            let lendingChart = echarts.init(dom);
	            lendingChart.setOption(this.lendingTrendsOpt);	
		   },
		   acceptanceLoanTrendInit(){
		   		let dom = this.$refs.acceptanceLoanTrend;
	            let acceptanceLoanChart = echarts.init(dom);
	            acceptanceLoanChart.setOption(this.acceptanceLoanTrendOpt);	
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
    				margin-left: 30px;
    				.GetCity{
		            	display: inline-block;
		            	margin-left: 0px;
		            	width: 400px;
		            }
		            span{
		            	margin-right: 5px;
		            	line-height: 32px;
		            }
		            .ivu-select{
		            	margin-left: 0px;
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
			    margin-bottom: 20px;
			    min-height: 433px;
		    }
    		> .ivu-row{
    			/*background:#eee;*/
    			/*background: red;*/
    			.ivu-row .ivu-col{
    				margin-bottom: 15px;
    			}
    		}
    	}
	}
</style>