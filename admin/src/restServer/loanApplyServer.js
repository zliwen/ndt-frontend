/**
 * Created by zhaowei on 2017/9/11.
 */

import server from '@/config/server'
let loanApplyServer = server('/v1/loanApply/:params1/:params2/:params3/:params4/:params5',{},{
  add:{
    method:'post',
    params:{
      params1:'add'
    }
  },
  list4Front:{
    method:'post',
    params:{
      params1:'list4Front'
    }
  },
  deleteApply:{
    method:'post',
    params:{
      params1:'deleteApply'
    }
  }

});
export default loanApplyServer
