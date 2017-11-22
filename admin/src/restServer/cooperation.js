/**
 * Created by zhaowei on 2017/10/23.
 */
import server from '@/config/server'
let cooperationServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'cooperation',
      params2:'list'
    }
  },
  add:{
    method:'post',
    params:{
      params1:'cooperation',
      params2:'add'
    }
  }
});
export default cooperationServer
