/**
 * Created by zhanglw on 2017/11/08.
 */
import server from '@/config/server';
let villageWorkReport = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
    villagePeopleCollectNum:{
        method: 'post',
        params: {
            params1: 'statistics',
            params2: 'villagePeopleCollectNum'
        }
    },
    villageCollectNum:{
    	method: 'post',
        params: {
            params1: 'statistics',
            params2: 'villageCollectNum'
        }
    },
    villageInfoNum:{
    	method: 'post',
        params: {
            params1: 'statistics',
            params2: 'villageInfoNum'
        }
    },
    creditTrent:{
    	method: 'post',
        params: {
            params1: 'statistics',
            params2: 'creditTrent'
        }
    }
});
export default villageWorkReport;
