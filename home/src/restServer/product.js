/**
 * Created by zhaowei on 2017/9/26.
 */

import server from '@/config/server'
let productServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  findById:{
    method:'get',
    params:{
      params1:'front',
      params2:'loanProduct',
      params3:'findById'
    }
  }

});
export default productServer
