qsDataAnalysisApp.controller("frameworkerController",
    ["$scope","backTop", "$rootScope", "session","$state", "$http", "$sce", "$stateParams", "$location",
        function ($scope,backTop, $rootScope,session, $state, $http, $sce,  $stateParams, $location) {

            $rootScope.bigTitle="农贷通-成果展示";
            $scope.goBack=function(){
                if($state.current.name=="ndt.scscProvince"){
                    $state.go("ndt.sccsMap");
                }else {
                    window.location.href="/#"+session.get("pageBackUrl");
                }
            };
        }]);