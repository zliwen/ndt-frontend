/**
 * Created by zhaowei on 2017/9/26.
 */

import server from '@/config/server'
let personServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  findByUserId:{
    method:'get',
    params:{
      params1:'person',
      params2:'findByUserId'
    }
  },
  updateUser:{
    method:'post',
    params:{
      params1:'person',
      params2:'update'
    }
  },
  updateIdentityInfo:{
    method:'post',
    params:{
      params1:'user',
      params2:'updateIdentityInfo'
    }
  },
  findById:{
    method:'get',
    params:{
      params1:'user',
      params2:'findById'
    }
  },
  myLoanHistory:{
    method:'post',
    params:{
      params1:'loanInvitation',
      params2:'list'
    }
  },
  myLoanDetail:{
    method:'get',
    params:{
      params1:'loanInvitation',
      params2:'detailById'
    }
  },
  stateValueList:{
    method:'post',
    params:{
      params1:'loanFlowSync',
      params2:'list'
    }
  }

});
export default personServer
