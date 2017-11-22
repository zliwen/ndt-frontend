/**
 * Created by chenchen on 2017/9/26.
 */
import server from '@/config/server'
let dictServer = server('/v1/front/:params1/:params2/:params3/:params4/:params5',{},{
    infolist:{
        method:'post',
        params:{
          params1:'info',
          params2:'search'
        }
    },
    policylist:{
        method:'post',
        params:{
            params1:'policy',
            params2:'search'
        }
    },
    infoDetails:{
        method:'get',
        params:{
          params1:'info',
          params2:'detail'
        }
    },
    policyDetails:{
        method:'get',
        params:{
            params1:'policy',
            params2:'detail'
        }
    },
});
export default dictServer
