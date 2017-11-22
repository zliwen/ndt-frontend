/**
 * Created by chenchen on 2017/9/22.
 */
import server from '@/config/server';
let reportServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
    getMonthReport:{
        method: 'get',
        params: {
            params1: 'statistics',
            params2: 'getMonthReport'
        }
    },
    findVillageInfoCollect:{
        method: 'post',
        params: {
            params1: 'statistics',
            params2: 'villageInfo',
            params3: 'findVillageInfoCollect'
        }
    },

    getBusinessCount:{
        method: 'get',
        params: {
            params1: 'statistics',
            params2: 'business',
            params3: 'count'
        }
    },

    getAreaAmtByMonth:{
        method: 'post',
        params: {
            params1: 'statistics',
            params2: 'getAreaAmt',
        }

    },
    getAreaAcceptByMonth:{
        method: 'post',
        params: {
            params1: 'statistics',
            params2: 'acceptStatement',
            params3: 'acceptStatisticsData',
        }
    },

    getBankAmt:{
        method: 'get',
        params: {
            params1: 'statistics',
            params2: 'getBankAmt'
        }
    },
    getTotalLoanUser:{
        method: 'get',
        params: {
            params1: 'admin',
            params2: 'statistics2',
            params3: 'getTotalLoanUser'
        }
    },
    getUserMonth:{
        method: 'get',
        params: {
            params1: 'statistics',
            params2: 'user',
            params3: 'month'
        }
    },
    getNewsMonth:{
        method: 'get',
        params: {
            params1: 'statistics',
            params2: 'info',
            params3: 'month'
        }
    },
});
export default reportServer;
