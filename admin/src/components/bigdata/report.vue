/**
* Created by chenchen on 2017/9/20.
*/

<template>
  <div class="Report">
      <div class="big-block data-text">
          <div class="block-title">
            <Icon  size="16" type="clipboard"></Icon>
            <span>统计报表/月度概要</span>
          </div>
          <div class="right-top">
          </div>
          <div class="content">
            <Row style=" margin-top:10px; border-top:1px solid #ccc">
              <Col span="8" class="sub-block">
              <div class="text-area">
                <p>累计放款金额 <span class="right-value orange" >{{monthData.totalAmount|calcAmont}}</span> </p>
                <p>本月放款金额 <span class="right-value">{{monthData.monthAmount|calcAmont}}</span> </p>
                <p>累计放款笔数 <span class="right-value">{{monthData.totalCount}}笔</span> </p>
                <p>本月放款笔数 <span class="right-value">{{monthData.monthCount}}笔</span> </p>
              </div>
              </Col>
              <!-- <Col span="8" class="sub-block">
             <div class="text-area">
               <p>累计逾期金额 <span class="right-value orange" v-text="'0'"></span> </p>
               <p>本月新增逾期金额 <span class="right-value" v-text="'0'"></span> </p>
               <p>累计逾期笔数 <span class="right-value" v-text="'0'"></span> </p>
               <p>本月新增逾期笔数 <span class="right-value" v-text="'0'"></span> </p>
               <p>风险分担累计发放金额 <span class="right-value" v-text="'0'"></span> </p>
               <p>风险分担累计发放笔数 <span class="right-value" v-text="'0'"></span> </p>
             </div>
              </Col> -->
              <Col span="8" class="sub-block">
             <div class="text-area">
               <p>累计新型农业经营主体 <span class="right-value orange">{{villageInfoCollect.company}}</span> </p>
               <p>累计农户 <span class="right-value orange" >{{villageInfoCollect.person }}</span> </p>
               <p>本月新增新型农业经营主体 <span class="right-value">{{villageInfoCollect.mCompany}}</span> </p>
               <p>本月新增农户 <span class="right-value" >{{villageInfoCollect.mPerson }}</span> </p>
             </div>
              </Col>
              <Col span="8" class="sub-block">
             <div class="text-area">
               <p>平台累计注册用户 <span class="right-value orange">{{BusinessCount.userRegisterCount>100000?BusinessCount.userRegisterCount/1000+'万人':BusinessCount.userRegisterCount+'人'}}</span> </p>
               <p>平台入驻金融机构数 <span class="right-value">{{BusinessCount.orgCount}}家</span> </p>
               <p>平台发布金融产品 <span class="right-value">{{BusinessCount.productCount}}个</span> </p>
               <p>平台发布新闻数量 <span class="right-value">{{BusinessCount.infoCount}}条</span> </p>
               <p>平台发政策数量 <span class="right-value">{{BusinessCount.policyCount}}条</span> </p>
             </div>
              </Col>
            </Row>
          </div>
      </div>
      <div class="big-block amount-line-chart">
          <div class="block-title">
            <Icon  size="16" type="social-yen"></Icon>
            <span>区域受理中/已放款金额</span>
          </div>
          <div class="content">
              <div ref="amountChart" style="height:400px;"></div>
          </div>
          <div class="right-top">
            <div v-if="adminDivisionId==5101">
              <Select   placeholder="选择区县" style="width:200px;" v-model="amountCityValue" @on-change="amountCityChange">
                <Option :value="5101">全市</Option>
                <Option v-for="(item,index) in cityList"  :key="index" :value="item.id">{{item.name}}</Option>
              </Select>
            </div>
            <span  v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
          </div>
      </div>
      <div class="big-block pie-chart">
          <div class="block-title">
            <Icon  size="16" type="pie-graph"></Icon>
            <span>银行放款TOP</span>
          </div>
          <div class="content" style="padding-top: 10px;">
            <Row>
              <Col span="8">
                  <div ref="pieChart1" style="height:300px;"></div>
              </Col>
              <Col span="8">
                  <div ref="pieChart2" style="height:300px;"></div>
              </Col>
              <Col span="8">
                  <div ref="pieChart3" style="height:300px;"></div>
              </Col>
            </Row>
          </div>
          <div class="right-top">
            <span  v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
          </div>
      </div>
      <div class="big-block user-line-chart">
          <div class="block-title">
            <Icon  size="16" type="person-stalker"></Icon>
            <span>新增注册用户</span>
          </div>
          <div class="content">
              <div ref="userChart" style="height:400px;"></div>
          </div>
          <div class="right-top" >
              <Select  v-if="adminDivisionId==5101" placeholder="选择区县" style="width:200px;" v-model="userCityValue" @on-change="userCityChange">
                  <Option :value="5101">全市</Option>
                  <Option v-for="(item,index) in cityList"  :key="index" :value="item.id">{{item.name}}</Option>
              </Select>
              <span  v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
          </div>
      </div>
      <div class="big-block news-line-chart">
          <div class="block-title">
            <Icon size="16" type="compose"></Icon>
            <span>新闻数量</span>
          </div>
          <div class="content">
              <div ref="newsChart" style="height:400px;"></div>
          </div>
          <div class="right-top" >
              <Select v-if="adminDivisionId==5101" placeholder="选择区县" style="width:200px;" v-model="newsCityValue" @on-change="newsCityChange">
                  <Option :value="5101">全市</Option>
                  <Option v-for="(item,index) in cityList"  :key="index" :value="item.id">{{item.name}}</Option>
              </Select>
            <span  v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
          </div>
        </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import cityData from '@/services/cityData';
  import reportServer from 'rs/reportServer'
  import otherServer from 'rs/otherServer';
  export default {
    name: 'Report',
    data () {
        let xAxisArray = [];
        let d = new Date();
        let yy = d.getFullYear();
        let MM = d.getMonth();
        MM +=6;
        for(let i = 0;i<6;i++){
           xAxisArray.push(
               (++MM>=12?yy:yy-1)+"-"+( MM%12+1<10?('0'+(MM%12+1)):MM%12+1)
            );
        }
        return {
            xAxisArray,
            adminDivisionName:"",
            adminDivisionId:'',
            newsCityValue:5101,
            userCityValue:5101,
            amountCityValue:5101,
            cityList:[],
            monthData:{
                totalAmount:0,
                monthAmount:0,
                totalCount:0,
                monthCount:0,
            },
            villageInfoCollect:{
                totla:0,
                company :0,
                person :0,
                month:0,
                mCompany:0,
                mPerson:0
            },
            BusinessCount:{
                policyCount: 0,
                userRegisterCount: 0,
                orgCount: 0,
                productCount: 0,
                infoCount: 0
            },
            amountChartOpt:{
                color:["#ffda19","#4edf96"],
                tooltip : {
                    trigger: 'axis',
                    // formatter:"{b0}{a0}:{c0}万<br>{b1}{a1}:{c1}万",
                    // formatter:[
                    //     "{b}:{c}万元",
                    //     "{b}:{c}万元"
                    // ] ,
                },
                legend: {
                    data:[
                        {
                            name:'新增放款',
                            icon:'pin'
                        },
                        {
                            name:'新增受理',
                            icon:'pin'
                        }
                    ],
                    right:30
                },
                xAxis : {
                    type : 'category',
                    boundaryGap : false,
                    data : xAxisArray,
                },
                yAxis : {
                    type : 'value',
                    name: '万元',
                    axisLine: {
                        lineStyle: {
                            color: "#000"
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series : [
                    {
                        name:'新增放款',
                        type:'line',
                        smooth:true,
                        smoothMonotone:true,
                        data:[0,0,0,0,0,0],
                    },
                    {
                        name:'新增受理',
                        type:'line',
                        smooth:true,
                        smoothMonotone:true,
                        data:[0,0,0,0,0,0],
                    }
                ]
            },
            pieChartOpt:[
                {
                    color:["#F74F51","#4ECF96","#70A1F7","#FFD24F","#FF883B"],
                    title:[
                        {
                            show:true,
                            text:"今日数据(万元)",
                            textStyle:{
                                color:'#000',
                                fontSize:"14",
                            },
                            left:'20%'
                        },{
                            show:true,
                            text:'放款总额',
                            subtext:'0',
                            textStyle:{
                                color:'#888889',

                                fontSize:"12",
                            },
                            subtextStyle:{
                                color:'#121210',
                                fontWeight:"100",
                                fontSize:"14",
                            },
                            left:'22%',
                            top:'45%'
                        }
                    ],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}:{c}万元({d}%)",
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        left:'55%',
                        top:'20px',
                        data:[]
                    },
                    calculable : true,
                    series : {
                        name:'今日放款',
                        type:'pie',
                        radius : ['40%', '55%'],
                        animation:false,
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                        },
                        data:[],
                        center:['30%','50%'],
                    }
                },
                {
                    color:["#F74F51","#4ECF96","#70A1F7","#FFD24F","#FF883B"],
                    title:[
                        {
                            show:true,
                            text:"近15日数据(万元)",
                            textStyle:{
                              color:'#000',
                              fontSize:"14",
                            },
                            left:'15%'
                        },{
                            show:true,
                            text:'放款总额',
                            subtext:'0',
                            textStyle:{
                                color:'#888889',

                                fontSize:"12",
                            },
                            subtextStyle:{
                                color:'#121210',

                                fontSize:"14",
                            },
                            left:'22%',
                            top:'45%'
                        }
                    ],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}:{c}万元({d}%)",
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        left:'55%',
                        top:'15px',
                        data:[]
                    },
                    calculable : true,
                    series : {
                        animation:false,
                        name:'近15日放款',
                        type:'pie',
                        radius : ['40%', '55%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                        },
                        data:[],
                        center:['30%','50%'],
                    }

                },
                {
                     color:["#F74F51","#4ECF96","#70A1F7","#FFD24F","#FF883B"],
                    title:[
                        {
                            show:true,
                            text:"近30日数据(万元)",
                            textStyle:{
                              color:'#000',
                              fontSize:"14",
                            },
                            left:'15%'
                        },{
                            show:true,
                            text:'放款总额',
                            subtext:'0',
                            textStyle:{
                                color:'#888889',

                                fontSize:"12",
                            },
                            subtextStyle:{
                                color:'#121210',

                                fontSize:"14",
                            },
                            left:'22%',
                            top:'45%'
                        }
                    ],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}:{c}万元({d}%)",
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        top:'15px',
                        left:'55%',
                        data:[]
                    },
                    calculable : true,
                    series : {
                        animation:false,
                        name:'近30日放款',
                        type:'pie',
                        radius : ['40%', '55%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : false
                                },
                                labelLine : {
                                    show : false
                                }
                            },
                        },
                        data:[],
                        center:['30%','50%'],
                    }

                }
            ],
            userChartOpt: {
                color:["#f86e26","#4edf96"],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:[
                        {
                            name:'企业用户',
                            icon:'pin'
                        },
                        {
                            name:'个人用户',
                            icon:'pin'
                        }
                    ],
                    right:30
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
                    data : xAxisArray
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'企业用户',
                        type:'line',
                        areaStyle: {normal: {
                            color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'red' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#fff' // 100% 处的颜色
                                    }],
                            },
                            opacity :0.1
                        }},
                        smooth:true,
                        smoothMonotone:true,
                        data:[0,0,0,0,0,0,0,0,0,0,0,0],
                    },
                    {
                        name:'个人用户',
                        type:'line',
                        areaStyle: {normal: {
                            color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'green' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#fff' // 100% 处的颜色
                                    }],
                            },
                            opacity :0.1
                        }},
                        smooth:true,
                        smoothMonotone:true,
                        data:[0,0,0,0,0,0,0,0,0,0,0,0]
                    },
                ]
            },
            newsChartOpt: {
                color:["#70a1f8"],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['资讯数量']
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
                    data : xAxisArray
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'资讯',
                        type:'line',
                        data:[0,0,0,0,0,0,0,0,0,0,0,0],
                        areaStyle: {normal: {
                            color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#70a1f8' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#fff' // 100% 处的颜色
                                    }],
                            },
                            opacity :0.1
                        }},
                        smooth:true,
                        smoothMonotone:true,
                    },
                ]
            }

      }
    },
    computed:{
    },
    filters:{
        calcAmont(v){
            let r = v;
            let u ="元";
            if(v>10000){
                r = Math.floor(v/100)/100;
                u="万元"
            }
            if(v>100000000){
                r = Math.floor(v/1000000)/100;
                u = "亿元"
            }
            return r+u;
        }
    },
    created(){
        this.allChartInit();
        otherServer.getCityById({params3: 5101}, {}, response => {
                let data = response.data
                let arr = ["市辖区"];
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (data[j].name == arr[i]) {
                        data.splice(j, 1);
                        }
                    }
                }
                this.cityList = data;
            }, err => {
            }
        );
        this.adminDivisionId=this.session.get("adminDivisionId")=='null'?5101:this.session.get("adminDivisionId");
        if(this.adminDivisionId!=5101){
          otherServer.getCityDetails({params3: this.adminDivisionId}, {},response=>{
            this.adminDivisionName=response.data.name;
          })
        }

    },
    methods: {
        //图表初始化
        allChartInit(){
            //双接口
            let boolOne = false;
            let boolTwo = false;
            let drawLines = ()=>{
                if(boolOne&&boolTwo){
                    this.amountChartInit();
                }
            }
            //获取月报表
            reportServer.getMonthReport({
                },{},(response)=>{
                    if(response.errorCode == 0){
                        this.monthData.totalAmount = response.data.totalAmt||0;
                        this.monthData.monthAmount =response.data.increaseAmt||0;
                        this.monthData.totalCount =response.data.totalCount||0;
                        this.monthData.monthCount = response.data.increaseCount||0;
                    }
                    console.log( this.monthData)
                },(error)=>{
            });
            // 获取涉农信用指标
            reportServer.findVillageInfoCollect({
                },{
                    divisionId:5101,
                },(response)=>{
                    if(response.errorCode == 0){
                        let count = 0;
                        let count1 = 0;
                        for(let o of response.data.companyData){
                            count +=o.total;
                        }
                        for(let o of response.data.personalData){
                            count1 +=o.total;
                        }
                        this.villageInfoCollect.total = count+count1;
                        this.villageInfoCollect.company = count;
                        this.villageInfoCollect.person = count1;
                    }
                },(error)=>{
            });
            // 获取本月涉农指标
            reportServer.findVillageInfoCollect({
                },{
                    divisionId:5101,
                    creatStartTime:new Date( new Date( new Date(new Date().setDate(1)).setHours(0)).setMinutes(0)).setSeconds(0)
                },(response)=>{
                    if(response.errorCode == 0){
                        let count = 0;
                        let count1 = 0;
                        for(let o of response.data.companyData){
                            count +=o.total;
                        }
                        for(let o of response.data.personalData){
                            count1 +=o.total;
                        }
                        this.villageInfoCollect.month = count+count1;
                        this.villageInfoCollect.mCompany = count;
                        this.villageInfoCollect.mPerson = count1;
                    }
                },(error)=>{
            });
            //各项累计数据
            reportServer.getBusinessCount({
                },{},(response)=>{
                    if(response.errorCode == 0){
                        this.BusinessCount.policyCount = response.data.policyCount;
                        this.BusinessCount.userRegisterCount = response.data.userRegisterCount;
                        this.BusinessCount.orgCount = response.data.orgCount;
                        this.BusinessCount.productCount = response.data.productCount;
                        this.BusinessCount.infoCount = response.data.infoCount;
                    }
                },(error)=>{
            });

            //按月放款金额
            reportServer.getAreaAmtByMonth({
                    divisionId:5101,
                    orgId:null,
                },{
                },(response)=>{
                    if(response.errorCode == 0){
                        for(let item of response.data){
                            this.amountChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=Math.floor(item.amt/1000)/10;
                        }
                        boolOne = true;
                        drawLines();
                    }
                },(error)=>{
            });

            //按月受理金额
            reportServer.getAreaAcceptByMonth({},{divisionId:5101},
              (response)=>{
                    if(response.errorCode == 0){
                        for(let item of response.data){
                            this.amountChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)]=Math.floor(item.totalAmount/1000)/10;
                        }
                        boolTwo = true;
                        drawLines();
                    }
                },(error)=>{
            });

            //按月注册用户信息
            reportServer.getUserMonth({
                },{},(response)=>{
                    for(let item of response.data){
                        this.userChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=(item.companyCount);
                        this.userChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)]=(item.personCount);
                    }
                    this.userChartInit();
                },(error)=>{
            });

            //按月新闻资讯信息
            reportServer.getNewsMonth({
                },{},(response)=>{
                    for(let item of response.data){
                        this.newsChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=(item.count);
                    }
                    this.newsChartInit();
                },(error)=>{
            });

            //获取今日放款排行
            reportServer.getBankAmt({
                    dayBefore:1
                },{},(response)=>{
                    if(response.errorCode == 0){
                        for(let i = 0;i<5;i++ ){
                            if(i==response.data.bankVoList.length) break;
                            let item = response.data.bankVoList[i];

                            this.pieChartOpt[0].series.data.push({
                                name:item.name,
                                value:Math.floor(item.amt/1000)/10
                            });
                            this.pieChartOpt[0].legend.data.push({
                                name:item.name,
                                icon:"pin",
                                value:Math.floor(item.amt/1000)/10
                                });
                        }
                        // for(let item of response.data.bankVoList){
                        //     this.pieChartOpt[0].series.data.push({
                        //         name:item.name,
                        //         value:Math.floor(item.amt/1000)/10
                        //     });
                        //     this.pieChartOpt[0].legend.data.push({
                        //         name:item.name,
                        //         icon:"pin",
                        //         value:Math.floor(item.amt/1000)/10
                        //         });
                        // }
                        this.pieChartOpt[0].series.data.sort((a,b)=>{
                            return Number( b.value)- Number(a.value)
                        })
                        this.pieChartOpt[0].legend.data.sort((a,b)=>{
                            return Number( b.value)-Number(a.value)
                        })
                        if(response.data.totalAmt>1000000000){
                            this.pieChartOpt[0].title[1].subtext = Math.floor(response.data.totalAmt/1000000)/100+'亿';
                        }else if(response.data.totalAmt>100000){
                            this.pieChartOpt[0].title[1].subtext = Math.floor(response.data.totalAmt/1000)/10+"万";
                        }else{
                            this.pieChartOpt[0].title[1].subtext = Math.floor(response.data.totalAmt)+"元";
                        }
                        this.pieChartInitToday()
                    }
                },(error)=>{
            });

            //获取15日放款排行
            reportServer.getBankAmt({
                    dayBefore:15
                },{},(response)=>{
                    if(response.errorCode == 0){
                        for(let i = 0;i<5;i++ ){
                            if(i==response.data.bankVoList.length) break;
                            let item = response.data.bankVoList[i];
                            this.pieChartOpt[1].series.data.push({
                                name:item.name,
                                value:Math.floor(item.amt/1000)/10
                            });
                            this.pieChartOpt[1].legend.data.push({
                                name:item.name,
                                icon:"pin",
                                value:Math.floor(item.amt/1000)/10
                                });
                        }
                        // for(let item of response.data.bankVoList){
                        //     this.pieChartOpt[1].series.data.push({
                        //         name:item.name,
                        //         value:Math.floor(item.amt/1000)/10
                        //     });
                        //     this.pieChartOpt[1].legend.data.push({
                        //         name:item.name,
                        //         icon:"pin",
                        //         value:Math.floor(item.amt/1000)/10
                        //         });
                        // }
                        this.pieChartOpt[1].series.data.sort((a,b)=>{
                            return Number( b.value)- Number(a.value)
                        })
                        this.pieChartOpt[1].legend.data.sort((a,b)=>{
                            return Number( b.value)-Number(a.value)
                        })
                        if(response.data.totalAmt>1000000000){
                            this.pieChartOpt[1].title[1].subtext = Math.floor(response.data.totalAmt/1000000)/100+'亿';
                        }else if(response.data.totalAmt>100000){
                            this.pieChartOpt[1].title[1].subtext = Math.floor(response.data.totalAmt/1000)/10+"万";
                        }else{
                            this.pieChartOpt[1].title[1].subtext = Math.floor(response.data.totalAmt)+"元";
                        }
                        this.pieChartInitFifteen()
                    }
                },(error)=>{
            });

            //获取30日放款排行
            reportServer.getBankAmt({
                    dayBefore:30
                },{},(response)=>{
                    if(response.errorCode == 0){
                        for(let i = 0;i<5;i++ ){
                            if(i==response.data.bankVoList.length) break;
                            let item = response.data.bankVoList[i];
                            this.pieChartOpt[2].series.data.push({
                                name:item.name,
                                value:Math.floor(item.amt/1000)/10
                            });
                            this.pieChartOpt[2].legend.data.push({
                                name:item.name,
                                icon:"pin",
                                value:Math.floor(item.amt/1000)/10
                                });
                        }
                        // for(let item of response.data.bankVoList){
                        //     this.pieChartOpt[2].series.data.push({
                        //         name:item.name,
                        //         value:Math.floor(item.amt/1000)/10
                        //     });
                        //     this.pieChartOpt[2].legend.data.push({
                        //         name:item.name,
                        //         icon:"pin",
                        //         value:Math.floor(item.amt/1000)/10
                        //         });
                        // }
                        this.pieChartOpt[2].series.data.sort((a,b)=>{
                            return Number( b.value)- Number(a.value)
                        })
                        this.pieChartOpt[2].legend.data.sort((a,b)=>{
                            return Number( b.value)-Number(a.value)
                        })
                        if(response.data.totalAmt>1000000000){
                            this.pieChartOpt[2].title[1].subtext = Math.floor(response.data.totalAmt/1000000)/100+'亿';
                        }else if(response.data.totalAmt>100000){
                            this.pieChartOpt[2].title[1].subtext = Math.floor(response.data.totalAmt/1000)/10+"万";
                        }else{
                            this.pieChartOpt[2].title[1].subtext = Math.floor(response.data.totalAmt)+"元";
                        }
                        this.pieChartInitThirty()
                    }
                },(error)=>{
            });
        },

        //双线图选择区域
        amountCityChange(){
            let boolOne = false;
            let boolTwo = false;
            let drawLines = ()=>{
                if(boolOne&&boolTwo){
                    this.amountChartReset();
                }
            }

            //按月放款金额
            reportServer.getAreaAmtByMonth({
                },{
                    divisionId:this.amountCityValue,
                },(response)=>{
                    if(response.errorCode == 0){
                        this.amountChartOpt.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]
                        for(let item of response.data){
                            this.amountChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=(item.amt/10000);
                        }
                        boolOne =true;
                        drawLines();
                    }
                },(error)=>{
            });
            //按月受理金额
            reportServer.getAreaAcceptByMonth({
                },{
                    divisionId:this.amountCityValue,
                },(response)=>{
                    if(response.errorCode == 0){
                        this.amountChartOpt.series[1].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                        for(let item of response.data){
                            this.amountChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)]=(item.totalAmount/10000);
                        }
                        boolTwo =true;
                        drawLines();
                    }
                },(error)=>{
            });

        },

        //用户图表选择区域
        userCityChange(){
            reportServer.getUserMonth({
                    divisionId:this.userCityValue
                },{},(response)=>{
                    if(response.errorCode == 0){
                        this.userChartOpt.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]
                        this.userChartOpt.series[1].data = [0,0,0,0,0,0,0,0,0,0,0,0]
                        for(let item of response.data){
                            this.userChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=(item.companyCount);
                            this.userChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)]=(item.personCount);
                        }
                        this.userChartReset();
                    }
                },(error)=>{
            });
        },

        //新闻区域切换
        newsCityChange(){
            reportServer.getNewsMonth({
                divisionId:this.newsCityValue
                },{},(response)=>{
                    if(response.errorCode == 0){
                        this.newsChartOpt.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0]
                        for(let item of response.data){
                            this.newsChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)]=(item.count);
                        }
                        this.newsChartReset();
                    }
                },(error)=>{
            });
        },

        amountChartReset(){
            this.amountChart.setOption(this.amountChartOpt);
        },
        userChartReset(){
            this.userChart.setOption(this.userChartOpt);
        },
        newsChartReset(){
            this.newsChart.setOption(this.newsChartOpt);
        },

        amountChartInit(){
            let dom = this.$refs.amountChart;
            this.amountChart = echarts.init(dom);
            this.amountChart.setOption(this.amountChartOpt);
        },
        pieChartInitToday(){
            let dom1 = this.$refs.pieChart1;
            this.pieChart1 = echarts.init(dom1);
            this.pieChart1.setOption(this.pieChartOpt[0]);
        },
        pieChartInitFifteen(){
            let dom2 = this.$refs.pieChart2;
            this.pieChart2 = echarts.init(dom2);
            this.pieChart2.setOption(this.pieChartOpt[1]);
        },
        pieChartInitThirty(){
            let dom3 = this.$refs.pieChart3;
            this.pieChart3 = echarts.init(dom3);
            this.pieChart3.setOption(this.pieChartOpt[2]);
        },
        userChartInit(){
            let dom = this.$refs.userChart;
            this.userChart = echarts.init(dom);
            this.userChart.setOption(this.userChartOpt);
        },
        newsChartInit(){
            let dom = this.$refs.newsChart;
            this.newsChart = echarts.init(dom);
            this.newsChart.setOption(this.newsChartOpt);
        }
    }
  }
</script>

<style  lang='less'>
  .Report {
    width: 100%;
    margin: 0 auto;
    min-width:900px ;
    .big-block{
        border-radius: 3px;
        margin-bottom: 60px;
        background-color: #fff;
        box-shadow: 1px 15px 30px #f0f0f0;
        overflow: hidden;
        position: relative;
        .block-title{
          font-size: 16px;
          color: #909090;
          margin-top: 20px;
          text-indent: 10px;
        }
        .right-top{
          color:#909090;
          position: absolute;
          top: 20px;
          right: 10px;
          >span{ line-height: 40px; margin-right: 20px;}
        }
        .content{
            background-color: #f9f9f9;
          margin-top: 30px;
        }
    }
    .data-text{
      .sub-block{
        border-right:1px solid #ccc;
        height: 240px;
        display: table;
        .text-area{
          display: table-cell;
          vertical-align: middle;
          p{
            text-indent: 14px;
            line-height: 28px;
            .right-value{
                float: right;
                margin-right: 12px;
            }
            .right-value.orange{
                color:orange;
            }
          }
        }
      }
      .sub-block:last-child{
        border:0
      }
    }
  }
</style>
