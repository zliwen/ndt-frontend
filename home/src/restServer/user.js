/**
 * Created by zhaowei on 2017/10/18.
 */

import server from '@/config/server'
let userServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  updateLoginName:{
    method:'post',
    params:{
      params1:'user',
      params2:'updateLoginName'
    }
  }
});
export default userServer
