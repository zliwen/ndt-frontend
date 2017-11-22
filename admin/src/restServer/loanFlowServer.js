/**
 * Created by zhaowei on 2017/9/14.
 */
import server from '@/config/server'
let loanFlowServer = server('/v1/loanFlow/:params1/:params2/:params3/:params4/:params5',{},{
  review:{
    method:'post',
    params:{
      params1:'review'
    }
  },
  find:{
    method:'post',
    params:{
      params1:'find'
    }
  }
});
export default loanFlowServer
