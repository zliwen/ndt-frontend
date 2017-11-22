/**
 * Created by chenchen on 2017/9/1.
 */
import server from '@/config/server';
let policyServer = server('/city/api/admin/:params1/:params2/:params3/:params4/:params5',{},{
    getList:{
      method:'post',
      params:{
        params1:'policyInformation',
        params2:'findExamine'
      }
    }
});
export default policyServer;
