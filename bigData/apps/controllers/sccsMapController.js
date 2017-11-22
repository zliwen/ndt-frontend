qsDataAnalysisApp.controller("sccsMapController", ["$scope", "$http", "$rootScope", "$state", function ($scope, $http, $rootScope, $state) {
    var canvas = document.getElementsByClassName('canvas-container');
    var lineStyle = {show: false};//柱状图网格线
    var itemStyle = {
        normal: {
            color: function (params) {
                var list = ['#FF802C', '#FF4B42', '#E87C25', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                return list[params.dataIndex % list.length];
            }
        }
    };//柱状图颜色
    var tableUrl = "../city/api/";
    var baseUrl = "../v1/";
    // tableUrl="http://192.168.1.177:8080/city/api/";
    $rootScope.showChang = true;
    $rootScope.bigTitle = "农贷通大数据";
    //创建成都市地图
    function createMap() {
        var arr = [
            {
                name: "天府新区",
                name1: "tianfu",
                value: 3,
                url: "510110"
            },
            {
                name: "高新区",
                name1: "gaoxin",
                value: 3,
                url: "510109"
            },

            {
                name: "双流区",
                name1: "shuangliu",
                value: 3,
                url: "510116"
            },
            {
                name: "郫都区",
                name1: "pidu",
                value: 3,
                url: "510117"
            },
            {
                name: "青白江区",
                name1: "qingbai",
                value: 3,
                url: "510113"
            },
            {
                name: "龙泉驿区",
                name1: "longquan",
                value: 3,
                url: "510112"
            },
            {
                name: "温江区",
                name1: "wenjiang",
                value: 3,
                url: "510115"
            },
            {
                name: "新都区",
                name1: "xindu",
                value: 3,
                url: "510114"
            },
            {
                name: "崇州市",
                name1: "chonzhou",
                value: 3,
                url: "510184"
            },
            {
                name: "彭州市",
                name1: "pengzhou",
                value: 3,
                url: "510182"
            },
            {
                name: "都江堰市",
                name1: "dujiang",
                value: 3,
                url: "510181"
            },

            {
                name: "邛崃市",
                name1: "qionglai",
                value: 3,
                url: "510183"
            },
            {
                name: "新津县",
                name1: "xinjin",
                value: 3,
                url: "510132"
            },
            {
                name: "蒲江县",
                name1: "pujiang",
                value: 3,
                url: "510131"
            },
            {
                name: "大邑县",
                name1: "daba",
                value: 3,
                url: "510129"
            },
            {
                name: "金堂县",
                name1: "jintang",
                value: 3,
                url: "510121"
            },
            {
                name: "简阳市",
                name1: "jianyang",
                value: 3,
                url: "510180"
            },

            {
                name: "金牛区",
                name1: "jingniu",
                value: 1,
                url: "510106"
            },
            {
                name: "青羊区",
                name1: "qingyang",
                value: 2,
                url: "510105"
            },
            {
                name: "锦江区",
                name1: "jinjiang",
                value: 3,
                url: "510104"
            },
            {
                name: "武侯区",
                name1: "wuhou",
                value: 3,
                url: "510107"
            },
            {
                name: "成华区",
                name1: "chenghua",
                value: 3,
                url: "510108"
            }
        ];
        var colors = [
            "#f9f9f9",
            "#fdf7e0",
            "#f9d6f9",
            "#fdf0e6",
            "#f3f4f9",
            "#f9f7e6",
            "#fdf0e0",
            "#ccc"
        ]
        $.each(arr, function (index, item) {
            var ind = index % colors.length;

            item.itemStyle = {
                normal: {
                    //areaColor:colors[ind],
                    areaColor: '#243d68',
                    //opacity:0.4,
                    borderWidth: 1,
                    borderColor: '#00083e'
                },
                emphasis: {
                    areaColor: "#f89367",
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 15,
                    shadowOffsetX: 10,
                    shadowOffsetY: 10
                }
            }
            item.label = {
                normal: {
                    textStyle: {
                        color: "#ccc",
                        fontSize: 13
                    }
                },
                emphasis: {
                    textStyle: {
                        fontWeight: "bold",
                        fontColor: "#ccc",
                        fontSize: 20
                    }

                }
            }
        })

        //设置地图geoJson数据
        function setMapData(mapName, callBack) {
            if (echarts.getMap(mapName)) {
                callBack();
                return;
            }
            $.getJSON('./static/datas/' + mapName + '.json', function (data) {
                echarts.registerMap('chengdu', data);
                callBack();
            });
        }

        //创建地图类
        function zMap(mapName, dom, data) {
            this.mapName = mapName;
            this.chart = echarts.init(dom);
            this.data = data;
            this.time = 21;

            this.chart.on("click", function (e) {
                $scope.goMap(e.data);
                $(".tab-fore").hide();
                if (e.seriesType == "map" && e.componentSubType == "map") {
                }
            });

            var that = this;
            setMapData(this.mapName, function () {
                that.setOp()
            });
        }

        zMap.prototype.setOp = function () {
            var that = this;
            setTimeout(function () {
                if (that.time < that.data.length) {
                    that.time++
                    var newData = [];
                    for (var j = 0; j < that.time; j++) {
                        newData.push(that.data[j]);
                    }
                    that.chart.setOption({
                        /**tooltip: {
        trigger: 'item'
    },*/
                        animation: true,

                        series: [{
                            name: "test",
                            type: 'map',
                            map: 'chengdu',
                            roam: false,
                            zoom: 1,
                            scaleLimit: {
                                max: 2,
                                min: 1
                            },
                            label: {

                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    //borderWidth: 0
                                }
                            },
                            data: newData
                        }]
                    });
                    that.setOp();
                }
            }, 100)
        }

        new zMap("chengdu", $('#mainChart')[0], arr);
    }

    createMap();
    $scope.goMap = function (data) {
        $state.transitionTo("ndt.scscProvince", {name: data.name, name1: data.name1, id: data.url});
    };
    $.ajax({
        url: baseUrl + "statistics/getAreaBankAmt?divisionId=5101&limit=10", success: function (res) {
            var list = res.data.bankVoList;
            list = list.slice(0, 5);
            if (!list.length) {
                canvas[0].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                return
            }
            var ec = echarts.init(canvas[0]);
            var total = res.data.totalAmt / 100000000;
            var option = {
                title: {
                    text: '放款金额排名前5的银行（' + total.toFixed(2) + '亿）',
                    x: 'center',
                    y: 10,
                    textStyle: {color: "#ff0"}
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
                },
                series: [
                    {
                        name: '放款金额',
                        type: 'pie',
                        radius: ["30%", "45%"],
                        center: ['50%', '50%'],
                        data: list.map(function (li) {
                            var value = li.amt / 10000;
                            return {
                                value: value.toFixed(2) == value ? value : value.toFixed(2),
                                name: li.name
                            }
                        }),
                        label: {
                            normal: {
                                formatter: function (s) {
                                    var p = s.name;
                                    var num = Math.ceil(p.length / 8), arr = [];
                                    for (var i = 0; i < num; i++) {
                                        arr.push(p.slice(i * 8, (i + 1) * 8));
                                    }
                                    return arr.join("\n") + "\n(" + s.value + ")万";
                                }
                            }
                        }
                    }
                ]
            };
            ec.setOption(option);
        }
    });
    $.ajax({
        url: baseUrl + "statistics/getAreaBankCount?divisionId=5101&limit=5", success: function (res) {
            var result = res.data.bankVoList;
            result = result.slice(0, 5);
            var total = res.data.totalCount;
            if (!result.length) {
                canvas[1].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                return
            }
            result = result.sort(function (n, o) {
                return o.count - n.count;
            });
            // var result = list.sort(function (a, b) {
            //   return b.count - a.count;
            // });
            var ec = echarts.init(canvas[1]);
            var option = {
                title: {
                    text: '放款笔数排名前5的银行（' + total + '笔）',
                    x: 'center',
                    y: 10,
                    textStyle: {color: "#ff0"}
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '50px',
                    containLabel: true,
                },
                xAxis: [
                    {
                        splitLine: lineStyle,
                        type: 'category',
                        data: result.map(function (li) {
                            return li.name
                        }),
                        axisTick: {
                            alignWithLabel: false
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 38,
                            formatter: function (p) {
                                var num = Math.ceil(p.length / 6), arr = [];
                                for (var i = 0; i < num; i++) {
                                    arr.push(p.slice(i * 6, (i + 1) * 6));
                                }
                                return arr.join("\n");
                            },
                            textStyle: {
                                color: '#ccc'
                            }
                        }
                        //                  nameRotate:-5
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#ccc'
                            }
                        },
                        splitLine: lineStyle,
                    }
                ],
                series: [
                    {
                        name: '笔数',
                        type: 'bar',
                        data: result.map(function (li) {
                            return li.count
                        }),
                        label: {
                            normal: {show: true, position: "outside"}
                        },
                        itemStyle: itemStyle
                    }
                ]
            };
            ec.setOption(option);
        }
    });
    $.ajax({
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        url: baseUrl + "statistics/loanDoneAmountData", success: function (data) {
            var result = data.data;
            result = result.slice(0, 5);
            result=result.sort(function (n,o) {
                return o.totalAmount-n.totalAmount;
            });
            //result = result.slice(0, 5);
            if (!data.data.length) {
                canvas[2].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                return
            }
            // var result = data.data.sort(function (a, b) {
            //     return b.totalAmount - a.totalAmount;
            // });
            var total = data.data.reduce(function (sum, value) {
                return sum + value.totalAmount / 100000000
            }, 0);
            var ec = echarts.init(canvas[2]);
            var option = {
                title: {
                    text: '放款金额排名前5的区县（' + total.toFixed(2) + '亿）',
                    x: 'center',
                    y: 10,
                    textStyle: {color: "#ff0"}
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'horizontal',
                    left: 'left',
                    bottom: 10,
                    data: result.map(function (li) {
                        return li.divisionName
                    }),
                    textStyle: {color: "#ccc"}
                },
                series: [
                    {
                        name: '放款金额',
                        type: 'pie',
                        radius: ["30%", "45%"],
                        center: ['50%', '50%'],
                        data: result.map(function (li) {
                            var value = li.totalAmount / 10000;
                            return {
                                value: value.toFixed(2) == value ? value : value.toFixed(2),
                                name: li.divisionName
                            }
                        }),
                        label: {
                            normal: {
                                formatter: function (p) {
                                    return p.name + "(" + p.value + "万)"
                                }
                            }
                        }
                    }
                ]
            };
            ec.setOption(option);
        }
    });
    $.ajax({
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        url: baseUrl + "statistics/loanDoneCountData", success: function (data) {
            var result = data.data;
            result = result.slice(0, 5);
            if (!data.data.length) {
                canvas[3].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                return
            }
            // var result = data.data.sort(function (a, b) {
            //     return b.totalNum - a.totalNum;
            // });
            var total = data.data.reduce(function (sum, value) {
                return sum + value.totalNum
            }, 0);
            var ec = echarts.init(canvas[3]);
            var
                option = {
                    title: {
                        text: '放款笔数排名前5的区县（' + total + '笔）',
                        x: 'center',
                        y: 10,
                        textStyle: {color: "#ff0"}
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '30px',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            splitLine: lineStyle,
                            type: 'category',
                            data: result.map(function (li) {
                                return li.divisionName
                            }),
                            axisTick: {
                                alignWithLabel: false
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 30,
                                formatter: function (p) {
                                    var num = Math.ceil(p.length / 8), arr = [];
                                    for (var i = 0; i < num; i++) {
                                        arr.push(p.slice(i * 8, (i + 1) * 8));
                                    }
                                    return arr.join("\n");
                                },
                                show: true,
                                textStyle: {
                                    color: '#ccc'
                                }
                            }
//                  nameRotate:-5
                        }
                    ],
                    yAxis: [
                        {
                            splitLine: lineStyle,
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: '#ccc'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '笔数',
                            type: 'bar',
                            data: result.map(function (li) {
                                return li.totalNum
                            }),
                            label: {
                                normal: {show: true, position: "outside"}
                            },
                            itemStyle: itemStyle
                        }
                    ]
                };
            ec.setOption(option);
        }
    });
}]);

// function setValueUnite(v) {
//     var cs = 1, unit = "";
//     switch (type) {
//         case 4:
//             cs = 10000;
//             unit = '万';
//             break;
//         case 5:
//             cs = 100000;
//             unit = '十万';
//             break;
//         case 6:
//             cs = 1000000;
//             unit = '百万';
//             break;
//         case 7:
//             cs = 10000000;
//             unit = '千万';
//             break;
//         case 8:
//             cs = 100000000;
//             unit = '亿';
//             break;
//     }
//     if (v == '中文') {
//         return unit;
//     } else {
//         return parseFloat(v) / cs;
//     }
//
// }