<template>
  <div class="Report">
    <div class="big-block user-line-chart">
      <div class="block-title">
        <Icon size="16" type="person-stalker"></Icon>
        <span>新增注册用户</span>
      </div>
      <div class="content">
        <div ref="userChart" style="height:400px;"></div>
      </div>
      <div class="right-top">
        <label>
          <span>地区:</span>
          <Select v-if="adminDivisionId==5101" placeholder="选择区县" style="width: 120px;" v-model="userCityValue"
                  @on-change="userCityChange">
            <Option :value="5101">全市</Option>
            <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <span v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
        </label>
      </div>
    </div>
    <div class="big-block user-line-chart">
      <div class="block-title">
        <Icon size="16" type="person-stalker"></Icon>
        <span>新闻发布统计</span>
      </div>
      <div class="content">
        <div ref="newsChart" style="height:400px;"></div>
      </div>
      <div class="right-top">
        <label>
          <span>开始时间:</span>
          <DatePicker type="date" v-model="newsStartTime" placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>结束时间:</span>
          <DatePicker type="date" v-model="newsEndTime" placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>地区:</span>
          <Select v-if="adminDivisionId==5101" placeholder="选择区县" style="width: 120px;" v-model="newsCityValue">
            <Option :value="5101">全市</Option>
            <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <span v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
        </label>
        <label>
          <Button type="primary" icon="ios-search" @click="newsCityChange">搜索</Button>
        </label>
      </div>
    </div>
    <div class="big-block user-line-chart">
      <div class="block-title">
        <Icon size="16" type="person-stalker"></Icon>
        <span>政策发布统计</span>
      </div>
      <div class="content">
        <div ref="policyChart" style="height:400px;"></div>
      </div>
      <div class="right-top">
        <label>
          <span>开始时间:</span>
          <DatePicker type="date" v-model='policyStartTime' placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>结束时间:</span>
          <DatePicker type="date" v-model='policyEndTime' placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>地区:</span>
          <Select v-if="adminDivisionId==5101" placeholder="选择区县" style="width: 120px;" v-model="policyCityValue">
            <Option :value="5101">全市</Option>
            <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <span v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
        </label>
        <label>
          <Button type="primary" icon="ios-search" @click="policyCityChange">搜索</Button>
        </label>
      </div>
    </div>
    <div class="big-block user-line-chart">
      <div class="block-title">
        <Icon size="16" type="person-stalker"></Icon>
        <span>信息采集统计</span>
      </div>
      <div class="content">
        <div ref="villageChart" style="height:400px;"></div>
      </div>
      <div class="right-top">
        <label>
          <span>开始时间:</span>
          <DatePicker type="date" v-model='villageStartTime' placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>结束时间:</span>
          <DatePicker type="date" v-model='villageEndTime' placeholder="选择日期" style="width: 120px"></DatePicker>
        </label>
        <label>
          <span>地区:</span>
          <Select v-if="adminDivisionId==5101" placeholder="选择区县" style="width: 120px;" v-model="villageCityValue">
            <Option :value="5101">全市</Option>
            <Option v-for="(item,index) in cityList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <span v-if="adminDivisionId!=5101">{{adminDivisionName}}</span>
        </label>
        <label>
          <Button type="primary" icon="ios-search" @click="villageCityChange">搜索</Button>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import reportServer from 'rs/reportServer'
  import otherServer from 'rs/otherServer';
  import operateplatformReport from 'rs/operateplatformReport'
  export default {
    data(){
      let xAxisArray = [];
      let d = new Date();
      let yy = d.getFullYear();
      let MM = d.getMonth();
      for (let i = 0; i < 12; i++) {
        xAxisArray.push(
          (++MM >= 12 ? yy : yy - 1) + "-" + ( MM % 12 + 1 < 10 ? ('0' + (MM % 12 + 1)) : MM % 12 + 1)
        );
      }
      return {
        xAxisArray,
        adminDivisionName: "",
        adminDivisionId: '',
        userCityValue: 5101,
        newsCityValue: 5101,
        policyCityValue: 5101,
        villageCityValue: 5101,
        newsStartTime: null,
        newsEndTime: null,
        policyStartTime: null,
        policyEndTime: null,
        villageStartTime: null,
        villageEndTime: null,
        cityList: [],
        userChartOpt: {
          color: ["#f86e26", "#000000"],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['个人用户', '企业用户']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisArray
          },
          yAxis: {
            type: 'value',
            name: '个'
          },
          series: [
            {
              name: '个人用户',
              type: 'line',
              areaStyle: {
                normal: {
                  color: {
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
                  opacity: 0.1
                }
              },
              smooth: true,
              smoothMonotone: true,
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: '企业用户',
              type: 'line',
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'blue' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#fff' // 100% 处的颜色
                    }],
                  },
                  opacity: 0.1
                }
              },
              smooth: true,
              smoothMonotone: true,
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        newsChartOpt: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["新闻", "村务", "招工用工", "种植指导", "特色景点", "特色美食"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisLabel: {
                interval: 0,
                // rotate:15,
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        policyChartOpt: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["农贷通政策", "普通政策"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisLabel: {
                interval: 0
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        villageChartOpt: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ["新型农业经营主体", "农户"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisLabel: {
                interval: 0
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        }

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
      this.adminDivisionId = this.session.get("adminDivisionId") == 'null' ? 5101 : this.session.get("adminDivisionId");
      if (this.adminDivisionId != 5101) {
        otherServer.getCityDetails({params3: this.adminDivisionId}, {}, response => {
          this.adminDivisionName = response.data.name;
        })
      }
    },
    methods: {
      //图表初始化
      allChartInit(){
        //按月注册用户信息
        reportServer.getUserMonth({}, {}, (response) => {
          if (response.errorCode == 0) {
            for (let item of response.data) {
              this.userChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)] = (item.personCount);
              this.userChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)] = (item.companyCount);
            }
          }
          this.userChartInit();
        }, (error) => {
        });
        //新闻发布统计
        this.newsServer({}, '');

        //政策发布统计
        this.policyServer({}, '');

        //村务信息发布统计
        this.villageServer({}, '');
      },
      newsServer(param, type){
        operateplatformReport.findOperatingReportsInfoPublishNum({}, param, rsp => {
          let tempTypeObj = {};
          this.getCodeTable('3', data => {
            let tempType = [];
            data.forEach(function (e) {
              tempType.push(e.value)
              tempTypeObj[e.value] = [];
            })
            this.newsChartOpt.legend.data = tempType;
          });

          this.newsChartOpt.series = [];
          if (rsp.errorCode == 0) {
            let datas = rsp.data;
            if (datas.length == 0) {
              //this.$Message.error("没有获取到相关数据")
            }
            let tempRegion = [];
            let num = 0;
            datas.forEach(function (e) {
              tempRegion.push(e.divisionName)
              for (let key in tempTypeObj) {
                tempTypeObj[key].push(0);
              }

              let infoData = e.infoData;
              infoData.forEach(function (n) {
                tempTypeObj[n.typeValue][num] = (n.total)
              })
              num++;
            })
            this.newsChartOpt.xAxis[0].data = tempRegion;
            for (let key in tempTypeObj) {
              this.newsChartOpt.series.push({name: key, stack: "总量", type: 'bar', data: tempTypeObj[key]})
            }
          }
          if (type == "change") {
            this.newsChartReset();
          } else {
            this.newsChartInit();
          }
        }, err => {

        });
      },
      policyServer(param, type){
        operateplatformReport.getPolicy({}, param, rsp => {
          let tempTypeObj = {};
          this.getCodeTable('65', data => {
            let tempType = [];
            data.forEach(function (e) {
              tempType.push(e.value)
              tempTypeObj[e.value] = [];
            })
            this.policyChartOpt.legend.data = tempType;
          });

          this.policyChartOpt.series = [];
          if (rsp.errorCode == 0) {
            let datas = rsp.data;
            if (datas.length == 0) {
              //this.$Message.error("没有获取到相关数据")
            }
            let tempRegion = [];
            let num = 0;
            datas.forEach(function (e) {
              tempRegion.push(e.divisionName)
              for (let key in tempTypeObj) {
                tempTypeObj[key].push(0);
              }

              let infoData = e.infoData;
              infoData.forEach(function (n) {
                tempTypeObj[n.typeValue][num] = (n.total)
              })
              num++;
            })
            this.policyChartOpt.xAxis[0].data = tempRegion;
            for (let key in tempTypeObj) {
              this.policyChartOpt.series.push({name: key, stack: "总量", type: 'bar', data: tempTypeObj[key]})
            }
          }
          if (type == "change") {
            this.policyChartReset();
          } else {
            this.policyChartInit();
          }
        }, err => {

        })
      },
      villageServer(param, type){
        operateplatformReport.getvillage({}, param, rsp => {
          this.villageChartOpt.series = [];
          this.villageChartOpt.xAxis[0].data = [];
          if (rsp.errorCode == 0) {
            let companyData = rsp.data.companyData
            let personalData = rsp.data.personalData
            let tempData = {}
            companyData.forEach(function (e) {
              tempData[e.divisionName] = [e.total, 0]
            })
            personalData.forEach(function (e) {
              if (tempData[e.divisionName]) {
                tempData[e.divisionName][1] = (e.total)
              } else {
                tempData[e.divisionName] = [0, e.total]
              }
            })
            let tempTypeObj = {"新型农业经营主体": [], "农户": []}

            for (let key in tempData) {
              this.villageChartOpt.xAxis[0].data.push(key);
              tempTypeObj["新型农业经营主体"].push(tempData[key][0])
              tempTypeObj["农户"].push(tempData[key][1])
            }

            this.villageChartOpt.series.push({
              name: "新型农业经营主体",
              stack: "总量",
              type: 'bar',
              data: tempTypeObj["新型农业经营主体"]
            })
            this.villageChartOpt.series.push({name: "农户", type: 'bar', stack: "总量", data: tempTypeObj["农户"]})
          }
          if (type == "change") {
            this.villageChartReset();
          } else {
            this.villageChartInit();
          }
        }, err => {

        })
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
      },
      policyChartInit(){
        let dom = this.$refs.policyChart;
        this.policyChart = echarts.init(dom);
        this.policyChart.setOption(this.policyChartOpt);
      },
      villageChartInit(){
        let dom = this.$refs.villageChart;
        this.villageChart = echarts.init(dom);
        this.villageChart.setOption(this.villageChartOpt);
      },
      //用户图表选择区域
      userCityChange(){
        reportServer.getUserMonth({
          divisionId: this.userCityValue
        }, {}, (response) => {
          if (response.errorCode == 0) {
            this.userChartOpt.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            this.userChartOpt.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            for (let item of response.data) {
              this.userChartOpt.series[0].data[this.xAxisArray.indexOf(item.month)] = (item.personCount);
              this.userChartOpt.series[1].data[this.xAxisArray.indexOf(item.month)] = (item.companyCount);
            }
            this.userChartReset();
          }
        }, (error) => {
        });
      },
      //新闻发布统计图表选择区域
      newsCityChange(){
        this.newsServer({
          divisionId: this.newsCityValue,
          creatStartTime: this.newsStartTime,
          creatEndTime: this.newsEndTime
        }, 'change');
      },
      //政策发布统计图表选择区域
      policyCityChange(){
        this.policyServer({
          divisionId: this.policyCityValue,
          creatStartTime: this.policyStartTime,
          creatEndTime: this.policyEndTime
        }, 'change')
      },
      //信息采集统计图表选择区域
      villageCityChange(){
        this.villageServer({
          divisionId: this.villageCityValue,
          creatStartTime: this.villageStartTime,
          creatEndTime: this.villageEndTime
        }, 'change')
      },
      userChartReset(){
        this.userChart.setOption(this.userChartOpt);
      },
      newsChartReset(){
        this.newsChart.setOption(this.newsChartOpt);
      },
      policyChartReset(){
        this.policyChart.setOption(this.policyChartOpt);
      },
      villageChartReset(){
        this.villageChart.setOption(this.villageChartOpt);
      }
    }
  }
</script>

<style scoped lang="less">
  .Report {
    margin: 0 auto;
    min-width: 900px;

  .big-block {
    border-radius: 3px;
    margin-bottom: 60px;
    background-color: #fff;
    box-shadow: 1px 15px 30px #f0f0f0;
    overflow: hidden;
    position: relative;

  .block-title {
    font-size: 16px;
    color: #909090;
    margin-top: 20px;
    text-indent: 10px;
  }

  .right-top {
    color: #909090;
    position: absolute;
    top: 20px;
    right: 10px;

  label {
    display: inline-block;
    margin-right: 20px;

  span {
    margin-right: 10px;
  }

  }
  }
  .content {
    background-color: #f9f9f9;
    margin-top: 40px;
  }

  }
  }
</style>
