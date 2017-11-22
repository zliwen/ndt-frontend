/**
 * Created by zhaowei on 2017/9/13.
 */
import server from '@/config/server'
let loanInvitationServer = server('/v1/loanInvitation/:params1/:params2/:params3/:params4/:params5',{},{
  list:{
    method:'post',
    params:{
      params1:'list'
    }
  },
  detailById:{
    method:'get',
    params:{
      params1:'detailById'
    }
  },
  update:{
    method:'post',
    params:{
      params1:'update'
    }
  }
});
export default loanInvitationServer
