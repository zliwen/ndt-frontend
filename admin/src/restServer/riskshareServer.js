/**
 * Created by chenchen on 2017/9/28.
 */
import server from '@/config/server';
let riskshareServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
    addToRiskShare:{//添加到申请列表，银行调
        method: 'post',
        params: {
            params1: 'riskshareApply',
            params2: 'addToRiskshare'
        }
    },
    listForBanking:{//银行的申请列表
        method: 'post',
        params: {
            params1: 'riskshareApply',
            params2: 'list',
            params3:'bankingOrg'
        }
    },
    startFlow:{//开启审核流程。提交申请，银行调
        method: 'post',
        params: {
            params1: 'riskShareFlow',
            params2: 'start',
        }
    },
    delete:{//取消申请，银行调
        method: 'get',
        params: {
            params1: 'riskshareApply',
            params2: 'delete'
        }
    },
    listForFlow:{//待处理的列表，审核机构调?
        method: 'post',
        params: {
            params1: 'riskShareFlow',
            params2: 'todo',
            params3: 'list',
        }
    },
    detailById:{//详情，银行调,审核机构调
        method: 'get',
        params: {
            params1: 'riskshareApply',
            params2: 'detailById'
        }
    },
    stepDetail:{//流程步骤详情，银行调,审核机构调
        method: 'post',
        params: {
            params1: 'riskshareApply',
            params2: 'list'
        }
    },
    reviewFlow:{//审核步骤，审核机构调
        method: 'post',
        params: {
            params1: 'riskShareFlow',
            params2: 'review',
        }
    },
});
export default riskshareServer;
