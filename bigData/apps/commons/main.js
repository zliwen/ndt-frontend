var qsDataAnalysisApp = angular.module("qsDataAnalysisApp",[
    "ui.router",
    "ngResource",
    "ngAnimate",
    "session"
]);
//

window.fuckData= {
    "都江堰市": {
        name: "都江堰市",
        sumM: 13942,
        bi: 63,
        fk: 63,
        yh: 48,
        nh: 6,
        ny: 57,
        data: [
            {
                name: "都江堰金都村镇银行",
                value: 15,
                value1: 9279
            },
            {
                name: "农业银行都江堰市支行",
                value: 1,
                value1: 80
            },
            {
                name: "成都银行都江堰市支行",
                value: 1,
                value1: 70
            },
            {
                name: "建设银行都江堰市支行",
                value: 3,
                value1: 172
            },
            {
                name: "邮储银行都江堰市支行",
                value: 2,
                value1: 25
            },
            {
                name: "成都农商银行都江堰市支行",
                value: 41,
                value1: 4316
            }
        ]
    },
    "彭州市": {
        name: "彭州市",
        sumM: 4005.025,
        bi: 246,
        fk: 245,
        yh: 235,
        nh: 242,
        ny: 4,
        data: [
            {
                name: "农业银行",
                value: 1,
                value1: 40.425
            },
            {
                name: "邮储银行",
                value: 1,
                value1: 65
            },
            {
                name: "农业发展银行",
                value: 1,
                value1: 700
            },
            {
                name: "成都农商银行彭州支行",
                value: 229,
                value1: 2346.6
            },
            {
                name: "浙江民泰",
                value: 3,
                value1: 150
            },
            {
                name: "民生村镇银行",
                value: 1,
                value1: 20
            },
            {
                name: "中国工商银行",
                value: 1,
                value1: 323
            },
            {
                name: "旭力农村资金互助合作社",
                value: 9,
                value1: 360
            }
        ]
    },
    "崇州市": {
        name: "崇州市",
        sumM: 17459.6,
        bi: 354,
        fk: 321,
        yh: 281,
        nh: 295,
        ny: 59,
        data: [
            {
                name: "成都农商行",
                value: 199,
                value1: 8967.1
            },
            {
                name: "农业银行",
                value: 25,
                value1: 1929
            },
            {
                name: "邮政储蓄",
                value: 22,
                value1: 1120
            },
            {
                name: "浙江民泰",
                value: 6,
                value1: 113
            },
            {
                name: "成都银行",
                value: 89,
                value1: 4948.5
            },
            {
                name: "上银村镇银行",
                value: 89,
                value1: 4948.5
            },
            {
                name: "崇州合力科技小额贷款",
                value: 1,
                value1: 2
            }
        ]
    }
}


qsDataAnalysisApp.config(function($stateProvider, $urlRouterProvider,$httpProvider){

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"]="*";
    $httpProvider.defaults.headers.common["Content-Type"]="application/json";

    $stateProvider
        .state("ndt",{
            url:"/ndt",
            abstract:true,
            templateUrl:"views/commons/framework.html",
            controller:'frameworkerController'
        })

        .state('ndt.sccsMap', {
            url: "/sccsMap?type?url",
            templateUrl:"views/pages/sccsMap.html",
            controller:'sccsMapController'
        })
        .state('ndt.scscProvince', {
            url: "/scscProvince/:name/:name1/:id",
            templateUrl:"views/pages/scscProvince.html",
            controller:'qsScscProvinceController'
        })

    $urlRouterProvider.otherwise("/ndt/sccsMap");


});

qsDataAnalysisApp.run(function($rootScope, $urlRouter,$state) {
    $rootScope.$on('$locationChangeSuccess', function (evt,toState) {

    });
});
