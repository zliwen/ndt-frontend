/**
 * Created by zhaowei on 2017/9/11.
 */

import server from '@/config/server'
let loanApplyServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  add:{
    method:'post',
    params:{
      params1:'loanApply',
      params2:'add'
    }
  },
  list4Front:{
    method:'post',
    params:{
      params1:'loanApply',
      params2:'list4Front'
    }
  },
  deleteApply:{
    method:'post',
    params:{
      params1:'loanApply',
      params2:'deleteApply'
    }
  }

});
export default loanApplyServer
