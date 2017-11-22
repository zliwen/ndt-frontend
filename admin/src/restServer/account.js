import server from '@/config/server'
let accountServer = server('/v1/account/:params1/:params2/:params3/:params4/:params5',{},{
  updatePasswd:{
    method:'post',
    params:{
      params1:'updatePasswd'
    }
  }
});
export default accountServer
