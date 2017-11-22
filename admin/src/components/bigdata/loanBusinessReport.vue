<!--
	作者：zhanglw
	时间：2017-10-23
	描述：贷款业务报表
-->
<template>
	 <div class="loanBusinessReport">
	 	<Loading v-show="loading"></Loading>
	 	<div class="loanBusinessReport-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">统计报表</BreadcrumbItem>
                <BreadcrumbItem>贷款业务详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="tags-export-div">
        	<div class="tags-btn">
        		<label>贷款状态 : </label>
        		<Button :type="typeFlag==3802?'primary':'ghost'" @click="itemChange(3802, 'change')">受理中</Button>
    			<Button :type="typeFlag==3804?'primary':'ghost'" @click="itemChange(3804, 'change')">已放款</Button>
    			<Button :type="typeFlag==3801?'primary':'ghost'" @click="itemChange(3801, 'change')">新申请</Button>
    			<Button :type="typeFlag==3803?'primary':'ghost'" @click="itemChange(3803, 'change')">已拒绝</Button>
        	</div>
        	<div class="export-btn">
        		<Button type="info" @click="exportData">导出数据</Button>
        	</div>
        </div>
        <div class="search-div">
	        <Row style="margin-bottom: 15px;" type="flex" justify="end" >
		        <Col :xs="24" :sm="24" :md="24" :lg="24">
		            <div class="search-label" v-if="true">
		                <span>区域</span>
		                <GetCity :set-value="keyWord.divisionId"
                           @onChange="adminDivisionIdChange"
                           :changeOnSelect="changeOnSelect"></GetCity>
		            </div>
		            <div class="search-label">
		                <span>申请时间</span>
		                <DatePicker type="date" v-model="keyWord.applyTimeMin" format="yyyy-MM-dd" placeholder="选择日期" style="width: 200px"></DatePicker>
		        		<span>至</span>
		        		<DatePicker type="date" v-model="keyWord.applyTimeMax" format="yyyy-MM-dd" placeholder="选择日期" style="width: 200px"></DatePicker>
		            </div>
		            <div class="search-label" v-show="typeFlag==3802">
		                <span>受理时间</span>
		                <DatePicker type="date" v-model="keyWord.acceptTimeMin" placeholder="选择日期" style="width: 200px"></DatePicker>
		        		<span>至</span>
		        		<DatePicker type="date" v-model="keyWord.acceptTimeMax" placeholder="选择日期" style="width: 200px"></DatePicker>
		            </div>
		            <div class="search-label" v-show="typeFlag==3804">
		                <span>放款时间</span>
		                <DatePicker type="date" v-model="keyWord.lastUpdateTimeMin" placeholder="选择日期" style="width: 200px"></DatePicker>
		        		<span>至</span>
		        		<DatePicker type="date" v-model="keyWord.lastUpdateTimeMax" placeholder="选择日期" style="width: 200px"></DatePicker>
		            </div>
		            <Button icon="search" type="info" @click="search">搜索</Button>
		        </Col>
	        </Row>
        </div>
        <div class="content-div">
        	<Table border :columns="tempColumns" :data="datas"></Table>
        	<Page :total="total" :current="current" :page-size="pageSize"
            show-total show-elevator show-sizer
            v-on:on-change="pageChange" v-on:on-page-size-change="pageSizeChange"
       		></Page>
        </div>
    </div>
</template>

<script>
	import loanBusinessReportServer from 'rs/loanBusinessReportServer'
	import {baseURL} from '@/config/constant'
	export default {
		name: 'LoanBusinessReport',
		data() {
			return {
        		roleIds:this.session.get("roleIds"),
				total:0,
				current:1,
				pageSize:20,
				loading:false,
				typeFlag:3802,
				timeTitle:'受理时间',
				changeOnSelect: true,
		        keyWord:{
		          orgId:'',
		          divisionId:this.session.get("roleIds")=="35"?this.session.get("adminDivisionId"):"",
		          applyTimeMin:'',
		          applyTimeMax:'',
		          acceptTimeMin:'',
		          acceptTimeMax:'',
		          lastUpdateTimeMin:'',
		          lastUpdateTimeMax:'',
		          period:''
		        },
		        tempColumns:[],
		        columns3802:[
		          {
		          	title: '序号',
		          	type: 'index',
                    width: 70,
                    align: 'center'
		          },
		          {title: '贷款主体',key: 'userName', width: 90},
		          {title: '联系方式 ',key: 'mobile', width: 115},
		          {title: '机构代码',key: 'code', width: 160},
		          {title: '类型',key: 'userTypeName', width: 70},
		          {title: '区/县',key: 'countyName', width: 90},
		          {title: '乡/镇',key: 'townName', width: 90},
		          {title: '社区/村',key: 'villageName', width: 100},
		          {title: '金融机构',key: 'orgName', width: 110},
		          {title: '状态',key: 'stateName', width: 80},
		          {title: '申请金额', render:(h, params)=>{let row = params.row;return h('span', (row.applyAmount==null?0:row.applyAmount)+"元")}, width: 100},
		          {title: '申请时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.applyTime!=null && row.applyTime.indexOf(":")!=-1){
		          		return h('span', row.applyTime.substring(0, row.applyTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.applyTime);
		          	}
		          }},
		          {title: '受理金额', render:(h, params)=>{let row = params.row;return h('span', (row.acceptAmount==null?0:row.acceptAmount)+"元")}, width: 100},
		          {title: '受理时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.acceptTime!=null && row.acceptTime.indexOf(":")!=-1){
		          		return h('span', row.acceptTime.substring(0, row.acceptTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.acceptTime);
		          	}
		          }},
		          {
	                title: '操作',
	                key: 'action',
	                width: 70,
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
	                                  let pam = params.row.invitationId;
	                                  this.$router.push({path:'/banking/financeloan-apply/financeloan-detail/'+pam})
	                                }
	                            }
	                        }, '详情')
	                    ]);
	                }
		          }
		        ],
		        columns3804:[
		          {
		          	title: '序号',
		          	type: 'index',
                    width: 70,
                    align: 'center'
		          },
		          {title: '贷款主体',key: 'userName', width: 90},
		          {title: '联系方式 ',key: 'mobile', width: 115},
		          {title: '机构代码',key: 'code', width: 160},
		          {title: '类型',key: 'userTypeName', width: 70},
		          {title: '区/县',key: 'countyName', width: 90},
		          {title: '乡/镇',key: 'townName', width: 90},
		          {title: '社区/村',key: 'villageName', width: 100},
		          {title: '金融机构',key: 'orgName', width: 150},
		          {title: '状态',key: 'stateName', width: 80},
		          {title: '申请金额', render:(h, params)=>{let row = params.row;return h('span', (row.applyAmount==null?0:row.applyAmount)+"元")}, width: 100},
		          {title: '申请时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.applyTime!=null && row.applyTime.indexOf(":")!=-1){
		          		return h('span', row.applyTime.substring(0, row.applyTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.applyTime);
		          	}
		          }},
		          {title: '受理金额', render:(h, params)=>{let row = params.row;return h('span', (row.acceptAmount==null?0:row.acceptAmount)+"元")}, width: 100},
		          {title: '受理时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.acceptTime!=null && row.acceptTime.indexOf(":")!=-1){
		          		return h('span', row.acceptTime.substring(0, row.acceptTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.acceptTime);
		          	}
		          }},
		          {title: '放款金额', render:(h, params)=>{let row = params.row;return h('span', (row.doneAmount==null?0:row.doneAmount)+"元")}, width: 100},
		          {title: '放款时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.lastUpdateTime!=null && row.lastUpdateTime.indexOf(":")!=-1){
		          		return h('span', row.lastUpdateTime.substring(0, row.lastUpdateTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.lastUpdateTime);
		          	}
		          }},
		          {
	                title: '操作',
	                key: 'action',
	                width: 70,
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
	                                  let pam = params.row.invitationId;
	                                  this.$router.push({path:'/banking/financeloan-apply/financeloan-detail/'+pam})
	                                }
	                            }
	                        }, '详情')
	                    ]);
	                }
		          }
		        ],
		        columns3801:[
		          {
		          	title: '序号',
		          	type: 'index',
                    width: 70,
                    align: 'center'
		          },
		          {title: '贷款主体',key: 'userName', width: 90},
		          {title: '联系方式 ',key: 'mobile', width: 115},
		          {title: '机构代码',key: 'code', width: 160},
		          {title: '类型',key: 'userTypeName', width: 70},
		          {title: '区/县',key: 'countyName', width: 90},
		          {title: '乡/镇',key: 'townName', width: 90},
		          {title: '社区/村',key: 'villageName', width: 100},
		          {title: '金融机构',key: 'orgName'},
		          {title: '状态',key: 'stateName', width: 80},
		          {title: '申请金额', render:(h, params)=>{let row = params.row;return h('span', (row.applyAmount==null?0:row.applyAmount)+"元")}, width: 100},
		          {title: '申请时间', width: 131, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.applyTime!=null && row.applyTime.indexOf(":")!=-1){
		          		return h('span', row.applyTime.substring(0, row.applyTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.applyTime);
		          	}
		          }},
		          {
	                title: '操作',
	                key: 'action',
	                width: 70,
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
	                                  let pam = params.row.invitationId;
	                                  this.$router.push({path:'/banking/financeloan-apply/financeloan-detail/'+pam})
	                                }
	                            }
	                        }, '详情')
	                    ]);
	                }
		          }
		        ],
		        columns3803:[
		          {
		          	title: '序号',
		          	type: 'index',
                    width: 70,
                    align: 'center'
		          },
		          {title: '贷款主体',key: 'userName', width: 90},
		          {title: '联系方式 ',key: 'mobile', width: 115},
		          {title: '机构代码',key: 'code', width: 160},
		          {title: '类型',key: 'userTypeName', width: 70},
		          {title: '区/县',key: 'countyName', width: 90},
		          {title: '乡/镇',key: 'townName', width: 90},
		          {title: '社区/村',key: 'villageName', width: 100},
		          {title: '金融机构',key: 'orgName', width: 150},
		          {title: '状态',key: 'stateName', width: 90},
		          {title: '申请金额', render:(h, params)=>{let row = params.row;return h('span', (row.applyAmount==null?0:row.applyAmount)+"元")}, width: 100},
		          {title: '申请时间', width: 132, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.applyTime!=null && row.applyTime.indexOf(":")!=-1){
		          		return h('span', row.applyTime.substring(0, row.applyTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.applyTime);
		          	}
		          }},
		          {title: '受理金额', render:(h, params)=>{let row = params.row;return h('span', (row.acceptAmount==null?0:row.acceptAmount)+"元")}, width: 100},
		          {title: '受理时间', width: 132, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.acceptTime!=null && row.acceptTime.indexOf(":")!=-1){
		          		return h('span', row.acceptTime.substring(0, row.acceptTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.acceptTime);
		          	}
		          }},
		          {title: '拒绝时间', width: 132, render:(h, params)=>{
		          	let row = params.row;
		          	if(row.lastUpdateTime!=null && row.lastUpdateTime.indexOf(":")!=-1){
		          		return h('span', row.lastUpdateTime.substring(0, row.lastUpdateTime.lastIndexOf(":")));
		          	}else{
		          		return h('span', row.lastUpdateTime);
		          	}
		          }},
		          {
	                title: '操作',
	                key: 'action',
	                width: 70,
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
	                                  let pam = params.row.invitationId;
	                                  this.$router.push({path:'/banking/financeloan-apply/financeloan-detail/'+pam})
	                                }
	                            }
	                        }, '详情')
	                    ]);
	                }
		          }
		        ],
		        datas:[]
			}
		},
		created:function(){
			if (this.$route.query.typeFlag) this.typeFlag = this.$route.query.typeFlag;
			if (this.$route.query.current) this.current = Number(this.$route.query.current);
			if (this.$route.query.pageSize) this.pageSize = Number(this.$route.query.pageSize);
			if (this.$route.query.divisionId) this.keyWord.divisionId = this.$route.query.divisionId;
			if (this.$route.query.applyTimeMin) this.keyWord.applyTimeMin = this.$route.query.applyTimeMin;
			if (this.$route.query.applyTimeMax) this.keyWord.applyTimeMax = this.$route.query.applyTimeMax;
			if (this.$route.query.acceptTimeMin) this.keyWord.acceptTimeMin = this.$route.query.acceptTimeMin;
			if (this.$route.query.acceptTimeMax) this.keyWord.acceptTimeMax = this.$route.query.acceptTimeMax;
			if (this.$route.query.lastUpdateTimeMin) this.keyWord.lastUpdateTimeMin = this.$route.query.lastUpdateTimeMin;
			if (this.$route.query.lastUpdateTimeMax) this.keyWord.lastUpdateTimeMax = this.$route.query.lastUpdateTimeMax;
		},
		mounted:function(){
			this.$nextTick(function(){
				this.itemChange(this.typeFlag, 'load');
			});
		},
		methods:{
			getAcceptStatementList(){
				this.$router.push('loan-business-report?typeFlag='+this.typeFlag+'&current='+this.current+'&pageSize='+this.pageSize+'&divisionId='+this.keyWord.divisionId
							+'&applyTimeMin='+this.keyWord.applyTimeMin+'&applyTimeMax='+this.keyWord.applyTimeMax
							+'&acceptTimeMin='+this.keyWord.acceptTimeMin+'&acceptTimeMax='+this.keyWord.acceptTimeMax
							+'&lastUpdateTimeMin='+this.keyWord.lastUpdateTimeMin+'&lastUpdateTimeMax='+this.keyWord.lastUpdateTimeMax);
				if(this.typeFlag == 3802){
					this.tempColumns = this.columns3802;
				}else if(this.typeFlag == 3801){
					this.tempColumns = this.columns3801;
				}else if(this.typeFlag == 3803){
					this.tempColumns = this.columns3803;
				}else if(this.typeFlag == 3804){
					this.tempColumns = this.columns3804;
				}
				this.loading = true;
				let searchData = Object.assign({},this.keyWord)
				loanBusinessReportServer.acceptStatement({
					params4:this.current,
                    params5:this.pageSize
				},searchData, rsp=>{
					if(rsp.errorCode == 0){
						this.datas = rsp.data.pageData
						this.total = rsp.data.totalCount
						this.loading = false;
					}else{
                        this.datas =[];
                        this.loading = false;
                        this.$Message.error("获取受理报表失败！")
                    }
				}, err=>{
					 this.loading = false;
				})
			},
			search(){
				this.current = 1;
				this.formatDate('yyyy-MM-dd');
				this.keyWord.period = this.typeFlag;
				this.getAcceptStatementList();
			},
			pageChange(current) {
				this.current = current;
				this.keyWord.period = this.typeFlag;
				this.getAcceptStatementList();
			},
			pageSizeChange(pageSize) {
				this.current = 1;
				this.pageSize = pageSize;
				this.keyWord.period = this.typeFlag;
				this.getAcceptStatementList();
			},
			itemChange(t, p){
				this.typeFlag = t;
				if(p=='change'){
					this.current = 1;
					this.pageSize = 20;
					this.keyWord={
	                	orgId:'',
				        divisionId:this.session.get("roleIds")=="35"?this.session.get("adminDivisionId"):"",
				        applyTimeMin:'',
				        applyTimeMax:'',
				        acceptTimeMin:'',
				        acceptTimeMax:'',
				        lastUpdateTimeMin:'',
				        lastUpdateTimeMax:'',
				        period:''
	                }
				}
				this.formatDate('yyyy-MM-dd');
				this.keyWord.period = t;
				this.getAcceptStatementList();
			},
			exportData(){
				this.formatDate('yyyyMMdd');
				let token = this.session.get('adminToken');
				let searchData = Object.assign({token:token},this.keyWord)
				this.download(baseURL+'/v1/statistics/acceptStatement/exportToExcel?'+this.toParams(searchData));
			},
			formatDate(format){
				if(this.keyWord.applyTimeMin !="" && this.keyWord.applyTimeMin!=null){
       				this.keyWord.applyTimeMin = this.format(this.keyWord.applyTimeMin, format);
				}

				if(this.keyWord.applyTimeMax !="" && this.keyWord.applyTimeMax!=null){
       				this.keyWord.applyTimeMax = this.format(this.keyWord.applyTimeMax, format);
				}

				if(this.keyWord.acceptTimeMin !="" && this.keyWord.acceptTimeMin!=null){
       				this.keyWord.acceptTimeMin = this.format(this.keyWord.acceptTimeMin, format);
				}

				if(this.keyWord.acceptTimeMax !="" && this.keyWord.acceptTimeMax!=null){
       				this.keyWord.acceptTimeMax = this.format(this.keyWord.acceptTimeMax, format);
				}
				
				if(this.keyWord.lastUpdateTimeMin !="" && this.keyWord.lastUpdateTimeMin!=null){
       				this.keyWord.lastUpdateTimeMin = this.format(this.keyWord.lastUpdateTimeMin, format);
				}

				if(this.keyWord.lastUpdateTimeMax !="" && this.keyWord.lastUpdateTimeMax!=null){
       				this.keyWord.lastUpdateTimeMax = this.format(this.keyWord.lastUpdateTimeMax, format);
				}
			},
			download(url) {
				let that = this;
				let xhr = new XMLHttpRequest();
				xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
				xhr.responseType = "blob";  // 返回类型blob
				xhr.onreadystatechange = function () {
					switch ( xhr.readyState ) {
						case 0:
//							console.log( "xhr请求已初始化" );
						break;
						case 1:
//							console.log( "xhr请求已打开" );
						break;
						case 2:
//							console.log( "xhr请求已发送" );
						break;
						case 3:
//							console.log( "xhr请求已响应");
							break;
						case 4:
							let contentType = xhr.getResponseHeader('content-type')
							if ( xhr.status == 200 ) {
								if(contentType.indexOf("application/json")!=-1){
									that.$Message.error("超过导出数量10000条，导出失败...")
								}else{
									var blob = this.response;
									var reader = new FileReader();
									reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
									reader.onload = function (e) {
										// 转换完成，创建一个a标签用于下载
										var a = document.createElement('a');
										if(that.typeFlag == 3802){
											a.download = '受理中报表.xlsx';
										}else if(that.typeFlag == 3804){
											a.download = '已放款报表.xlsx';
										}else if(that.typeFlag == 3801){
											a.download = '新申请报表.xlsx';
										}else if(that.typeFlag == 3803){
											a.download = '已拒绝报表.xlsx';
										}
										a.href = e.target.result;
										a.click();
									}
								}
							} else {
//								console.log( "xhr请求失败："+xhr.readyState );
								that.$Message.error("导出请求失败...")
							}
							break;
						default :
							break;
					}
				}
				xhr.send();
			},
			toParams(obj){
				let param = '';
				for(let key in obj){
					let val = obj[key].toString();
					param+=key+"="+val+"&"
				}
				if(param.lastIndexOf("&")){
					param=param.substring(0, param.length-1);
				}
				return param;
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
			adminDivisionIdChange(data){
		        this.keyWord.divisionId=data[data.length-1];
		   },
		   clone(obj){  
			    var o, obj;  
			    if (obj.constructor == Object){  
			        o = new obj.constructor();   
			    }else{  
			        o = new obj.constructor(obj.valueOf());   
			    }  
			    for(var key in obj){  
			        if ( o[key] != obj[key] ){   
			            if ( typeof(obj[key]) == 'object' ){   
			                o[key] = this.clone(obj[key]);  
			            }else{  
			                o[key] = obj[key];  
			            }  
			        }  
			    }  
			    o.toString = obj.toString;  
			    o.valueOf = obj.valueOf;  
			    return o;  
			}
		}
	}
</script>

<style scoped lang="less">
    .loanBusinessReport{
        background: #f5f7f9;
        position: relative;
        .tags-export-div{
        	margin:20px;
        	overflow: hidden;
        	.tags-btn{
	        	float: left;
	        	button{
	        		margin-right: 15px;
	        	}
	        }
	        .export-btn{
	        	float: right;
	        }
        }
        .search-div{
	    	padding: 10px 20px;
	    	.search-label{
	            display: inline-block;
	            margin-right: 30px;
	            margin-bottom: 10px;
	            span{
	                width: 80px;
	                letter-spacing: 4px;
	                padding: 4px;
	            }
	            .GetCity{
	            	display: inline-block;
	            }
	        }
	    }
	    .content-div{
	    	padding: 0px 20px 20px;
	    }
    }
    .loanBusinessReport-breadcrumb{
        padding: 10px 15px 0;
    }
</style>
