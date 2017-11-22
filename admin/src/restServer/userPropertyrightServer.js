/**
 * Created by zhaowei on 2017/9/12.
 */
import server from '@/config/server'
let userPropertyrightServer = server('/v1/userPropertyright/:params1/:params2/:params3/:params4/:params5',{},{
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
  update:{
    method:'post',
    params:{
      params1:'update'
    }
  }
});
export default userPropertyrightServer
