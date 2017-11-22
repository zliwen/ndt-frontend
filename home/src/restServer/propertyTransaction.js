import server from '@/config/server'
let accountServer = server('/v1/front/propertyRightsTrading/:params1/:params2/:params3/:params4/:params5',{},{
  find:{
    method:'post',
    params:{
      params1:'find'
    }
  },
  detail:{
    method:'get',
    params:{
      params1:'detail'
    }
  }
});
export default accountServer
