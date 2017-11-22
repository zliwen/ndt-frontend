qsDataAnalysisApp.factory('chartService', ['$resource', function ($resource) {
    return $resource('v1/:param1/:param2/:param3/:param4/:param5', {}, {
        getBankAmt: {
            method: 'get',
            params: {param1: 'statistics', param2: "getBankAmt"}
        },
        getAreaBankCount: {
            method: 'get',
            params: {param1: 'statistics', param2: "getBankAmt"}
        }
    })
}])



