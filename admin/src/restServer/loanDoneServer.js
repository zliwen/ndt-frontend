/**
 * Created by zhaowei on 2017/9/11.
 */

import server from '@/config/server'
let loanDoneServer = server('/v1/loanDone/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'list'
    }
  },
  updateState:{
    method:'post',
    params:{
      params1:'updateState'
    }
  }

});
export default loanDoneServer
