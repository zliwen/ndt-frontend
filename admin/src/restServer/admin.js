/**
 * Created by zhaowei on 2017/9/28.
 */
import server from '@/config/server'
let adminServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  divisions:{
    method:'get',
    params:{
      params1:'admin',
      params2:'divisions'
    }
  }
});
export default adminServer
