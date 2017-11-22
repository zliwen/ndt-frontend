/**
 * Created by zhaowei on 2017/9/14.
 */


import server from '@/config/server'
let loanFlowSyncServer = server('/v1/loanFlowSync/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'list'
    }
  },
  update:{
    method:'post',
    params:{
      params1:'update'
    }
  },
  add:{
    method:'post',
    params:{
      params1:'add'
    }
  }

});
export default loanFlowSyncServer
