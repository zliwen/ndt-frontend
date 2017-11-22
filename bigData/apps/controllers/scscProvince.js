window.formatter = function formatter(value) {
    if (value < 10000)return value;
    var num = value / 10000;

    if (value < 100000000)return num.toFixed(2) == num ? num + "万" : num.toFixed(2) + "万";
    num = value / 100000000;
    if (value >= 100000000)return num.toFixed(2) == num ? num + "亿" : num.toFixed(2) + "亿";
}
qsDataAnalysisApp.controller("qsScscProvinceController",
    ["$scope", "chartService", "$stateParams", "$rootScope", "session",
        function ($scope, chartService, $stateParams, $rootScope, session) {
            var wxUrl = "../city";
            var baseUrl = "../v1/statistics";
            // wxUrl="http://192.168.1.177:8080/city";
            var city = $rootScope.bigTitle = $stateParams.name;
            var contyId = $stateParams.id;
            $scope.mane1 = $stateParams.name1;
            var lineStyle = {show: false};
            var itemStyle = {
                normal: {
                    color: function (params) {
                        var list = ['#FF802C', '#FF4B42', '#E87C25', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                        return list[params.dataIndex % list.length]
                    }
                }
            };//柱状图颜色
            initChart();
            function initChart() {
                $.getJSON('./static/datas/' + $scope.mane1 + '.json', function (data) {
                    echarts.registerMap($scope.mane1, data);
                    var chart = echarts.init($('#provinceMap')[0]);
                    chart.setOption({
                        /**tooltip: {
                        trigger: 'item'
                    },*/
                        animation: true,

                        series: [{
                            name: "test",
                            type: 'map',
                            map: $scope.mane1,
                            cursor: 'default',
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
                            //data: newData
                        }]
                    })
                });


            };
            var token = session.get('token');
            var canvas = document.getElementsByClassName('canvas-container');
            var span = document.getElementsByClassName('canvas-title-span');
            var ajax = $.ajax;


            //金额总计
            ajax({
                url: baseUrl + "/business/countByDivisionId?divisionId=" + contyId, success: function (data) {
                    var value = data.data;
                    $("#amount").html(formatter(value.areaTotalAmt));
                    $("#deal").html(value.areaTotalCount + "笔");
                    $("#users").html(value.userRegisterCount + "人");
                    $("#lendingAmt").html(formatter(value.lendingAmt));
                }
            });
            //2金额按区县区分
            ajax({
                url: baseUrl + "/getAreaBankAmt?limit=10&divisionId=" + contyId, success: function (data) {
                    var result = data.data.bankVoList;
                    result=result.slice(0,10);
                    span[0].innerHTML = (data.data.totalAmt || 0) / 10000;
                    if (!result.length) {
                        canvas[0].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[0]);
                    var option = {
                        title: {
                            text: '银行放款金额（万元）',
                            x: 'center',
                            y: 10,
                            show: false
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
                        },
                        legend: {
                            show: false,
                            orient: 'horizontal',
                            left: 'left',
                            bottom: 10,
                            data: result.map(function (li) {
                                return li.name
                            }),
                            textStyle: {color: "#ccc"}
                        },
                        series: [
                            {
                                name: '放款金额',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: result.map(function (li) {
                                    return {value: li.amt / 10000, name: li.name}
                                }),
                                label: {
                                    normal: {
                                        formatter: function (s) {
                                            var p = s.name;
                                            var num = Math.ceil(p.length / 6), arr = [];
                                            for (var i = 0; i < num; i++) {
                                                arr.push(p.slice(i * 6, (i + 1) * 6));
                                            }
                                            return arr.join("\n") + "\n(" + s.value + ")万元";
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    ec.setOption(option);
                }
            });
            //3笔数按银行区分
            ajax({
                url: baseUrl + "/getAreaBankCount?limit=10&divisionId=" + contyId, success: function (data) {
                    var result = data.data.bankVoList;
                    result=result.slice(0,10);
                    span[1].innerHTML = (data.data.totalCount || 0);
                    if (!result.length) {
                        canvas[1].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[1]);
                    var
                        option = {
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
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    splitLine: lineStyle,
                                    type: 'category',
                                    data: result.map(function (li) {
                                        return li.name
                                    }),
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (p) {
                                            var num = Math.ceil(p.length / 6), arr = [];
                                            for (var i = 0; i < num; i++) {
                                                arr.push(p.slice(i * 6, (i + 1) * 6));
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
                                        show: true,
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
                                    // barWidth: '60%',
                                    data: result.map(function (li) {
                                        return li.count
                                    }),
                                    label: {
                                        normal: {show: true, position: "outside", color: "#ccc"}
                                    },
                                    itemStyle: itemStyle
                                }
                            ]
                        };
                    ec.setOption(option);
                }
            });
            //4金额按照区县区分
            ajax({
                method: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({divisionId: +contyId}),
                dataType: "json",
                url: baseUrl + "/loanDoneAmountData", success: function (data) {
                    var result = data.data;
                    result=result.slice(0,10);
                    span[2].innerHTML = result.reduce(function (p, c) {
                            return p + c.totalAmount
                        }, 0) / 10000;
                    if (!result.length) {
                        canvas[2].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[2]);
                    var option = {
                        title: {
                            text: '各区县放款金额（万元）',
                            x: 'center',
                            y: 10,
                            show: false
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
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
                                center: ['50%', '45%'],
                                data: result.map(function (li) {
                                    return {value: li.totalAmount / 10000, name: li.divisionName}
                                }),
                                label: {
                                    normal: {
                                        formatter: function (p) {
                                            return p.name + "(" + p.value + ")万元"
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    ec.setOption(option);
                }
            });
            //5各区县受理金额
            ajax({
                url: baseUrl + "/acceptance/lendingAmtOrg?limitNum=10&divisionId=" + contyId, success: function (data) {
                    var result = data.data;
                    var ct=0;
                    for(var i=0;i<result.length;i++){
                        ct+=result[i].amount;
                    }
                    result=result.slice(0,10);

                    span[3].innerHTML = ct / 10000;
                    if (!result.length) {
                        canvas[3].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[3]);
                    var option = {
                        title: {
                            text: '银行受理金额（万元）',
                            x: 'center',
                            y: 10,
                            show: false
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
                        },
                        legend: {
                            show: false,
                            orient: 'horizontal',
                            left: 'left',
                            bottom: 10,
                            data: result.map(function (li) {
                                return li.name
                            }),
                            textStyle: {color: "#ccc"}
                        },
                        series: [
                            {
                                name: '受理金额',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: result.map(function (li) {
                                    return {value: (li.amount / 10000).toFixed(2), name: li.name}
                                }),
                                label: {
                                    normal: {
                                        formatter: function (s) {
                                            var p = s.name;
                                            var num = Math.ceil(p.length / 8), arr = [];
                                            for (var i = 0; i < num; i++) {
                                                arr.push(p.slice(i * 8, (i + 1) * 8));
                                            }
                                            return arr.join("\n") + "\n(" + s.value + ")万元";
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    ec.setOption(option);
                }
            });
            //6各区县受理笔数
            ajax({
                url: baseUrl + "/acceptance/lendingCountOrg?limitNum=10&divisionId=" + contyId, success: function (data) {
                    var result = data.data;
                    var ct=0;
                    for(var i=0;i<result.length;i++){
                        ct+=result[i].count;
                    }
                    result=result.slice(0,10);
                    span[4].innerHTML = ct;

                    if (!result.length) {
                        canvas[4].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[4]);
                    var
                        option = {
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
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    splitLine: lineStyle,
                                    type: 'category',
                                    data: result.map(function (li) {
                                        return li.name
                                    }),
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (p) {
                                            var num = Math.ceil(p.length / 6), arr = [];
                                            for (var i = 0; i < num; i++) {
                                                arr.push(p.slice(i * 6, (i + 1) * 6));
                                            }
                                            return arr.join("\n");
                                        },
                                        show: true,
                                        textStyle: {
                                            color: '#ccc'
                                        }
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    splitLine: lineStyle,
                                    type: 'value',
                                    axisLabel: {
                                        show: true,
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
                                    // barWidth: '60%',
                                    data: result.map(function (li) {
                                        return li.count
                                    }),
                                    label: {
                                        normal: {show: true, position: "outside", color: "#ccc"}
                                    },
                                    itemStyle: itemStyle
                                }
                            ]
                        };
                    ec.setOption(option);
                }
            });
            //7笔数按照区县区分
            ajax({
                method: "post",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({divisionId: +contyId}),
                dataType: "json",
                url: baseUrl + "/loanDoneCountData", success: function (data) {
                    var result = data.data;

                    span[5].innerHTML = result.reduce(function (p, c) {
                        return p + c.totalNum
                    }, 0);
                    if (!result.length) {
                        canvas[5].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    result=result.slice(0,10);
                    var ec = echarts.init(canvas[5]);
                    var
                        option = {
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
                                        show: true,
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
                                    // barWidth: '60%',
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
            //8
            ajax({
                url: baseUrl + "/user/town?divisionId=" + contyId, success: function (data) {
                    var result = data.data;

                    span[6].innerHTML = result.reduce(function (p, c) {
                        return p + c.count
                    }, 0);
                    if (!result.length) {
                        canvas[6].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    result = result.slice(0, 10);
                    var ec = echarts.init(canvas[6]);
                    var
                        option = {
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
                                        return li.name
                                    }),
                                    axisTick: {
                                        alignWithLabel: false
                                    },
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
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
                                        show: true,
                                        textStyle: {
                                            color: '#ccc'
                                        }
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '人数',
                                    type: 'bar',
                                    // barWidth: '60%',
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
            //9
            ajax({
                url: baseUrl + "/org/countByDivisionId?divisionId=" + contyId, success: function (data) {
                    var result1 = data.data;
                    var result = [];
                    for (var i = 0; i < result1.length; i++) {
                        if (result1[i].count) result.push(result1[i])
                    }
                    result=result.slice(0,10);
                    span[7].innerHTML = result.reduce(function (p, c) {
                        return p + c.count
                    }, 0);
                    if (!result.length) {
                        canvas[7].innerHTML = "<p style='line-height: 398px;text-align:center'>没有数据</p>";
                        return
                    }
                    var ec = echarts.init(canvas[7]);

                    var option = {
                        title: {
                            text: '入驻金融机构数（个）',
                            x: 'center',
                            y: 10,
                            show: false
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
                                return li.name
                            }),
                            textStyle: {color: "#ccc"}
                        },
                        series: [
                            {
                                name: '金融机构数',
                                type: 'pie',
                                radius: ["30%", "45%"],
                                center: ['50%', '50%'],
                                data: result.map(function (li) {
                                    return {value: li.count, name: li.name}
                                }),
                                label: {
                                    normal: {
                                        formatter: function (p) {
                                            return p.name + "(" + p.value + ")"
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    ec.setOption(option);
                }
            });

        }]);