/**
 * Created by zhaowei on 2017/9/28.
 */
import server from '@/config/server'
let orgServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  findById:{
    method:'get',
    params:{
      params1:'org',
      params2:'findById'
    }
  }
});
export default orgServer
