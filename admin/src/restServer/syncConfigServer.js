/**
 * Created by chenchen on 2017/9/21.
 */
import server from '@/config/server';
let syncConfigServer = server('/v1/loanProductSyncConfig/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'find'
    }
  },
  findById:{
    method:'get',
    params:{
      params1:'find'
    }
  },
  add:{
    method:'post',
    params:{
      params1:'add'
    }
  },
  delete:{
    method:'post',
    params:{
      params1:'delete'
    }
  },
  update:{
    method:'post',
    params:{
      params1:'update'
    }
  }
});
export default syncConfigServer;
