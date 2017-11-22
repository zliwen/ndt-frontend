/**
 * Created by zhaowei on 2017/9/25.
 */

import server from '@/config/server'
let insureProductServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  find:{
    method:'post',
    params:{
      params1:'front',
      params2:'insureProduct',
      params3:'find'
    }
  },
  findById:{
    method:'get',
    params:{
      params1:'front',
      params2:'insureProduct',
      params3:'findById'
    }
  }
});
export default insureProductServer;
