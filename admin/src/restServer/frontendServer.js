/**
 * Created by zhaowei on 2017/9/16.
 */

import server from '@/config/server';
let frontendServer = server('/v1/front/:params1/:params2/:params3/:params4/:params5',{},{
  orgFind:{
    method:'post',
    params:{
      params1:'org',
      params2:'find'
    }
  },
  getProductListForOwn: {
    method: 'post',
    params: {
      params1:'loanProduct',
      params2: 'find'
    }
  },
});
export default frontendServer
