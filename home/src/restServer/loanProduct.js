/**
 * Created by zhaowei on 2017/9/25.
 */

import server from '@/config/server'
let loanProductServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  recommend:{
    method:'get',
    params:{
      params1:'front',
      params2:'loanProduct',
      params3:'recommend'
    }
  },
  getData:{
    method:'get',
    params:{
      params1:'statistics',
      params2:'business',
      params3:'countByDivisionId'
    }
  },
  find:{
    method:'post',
    params:{
      params1:'front',
      params2:'loanProduct',
      params3:'find'
    }
  },
  findById:{
    method:'get',
    params:{
      params1:'front',
      params2:'loanProduct',
      params3:'findById'
    }
  },
  isLoanable:{
    method:'get',
    params:{
      params1:'loanProduct',
      params2:'isLoanable'
    }
  }
});
export default loanProductServer;
