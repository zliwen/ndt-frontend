/**
 * Created by zhaowei on 2017/9/11.
 */
import server from '@/config/server'
let dictServer = server('/v1/dict/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'list'
    }
  },
  add:{
    method:'post',
    params:{
      params1:'add'
    }
  },
  getValue:{
    method:'post',
    params:{
      params1:'getValue'
    }
  }
});
export default dictServer
