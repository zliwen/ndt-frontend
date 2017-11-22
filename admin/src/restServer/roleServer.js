/**
 * Created by nxm on 2017/8/24.
 */
import server from '@/config/server';
let roleServer = server('/v1/role/:params1/:params2/:params3/:params4/:params5',{},{
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
  deleteRole:{
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
export default roleServer;
