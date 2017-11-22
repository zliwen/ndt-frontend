/**
 * Created by zhaowei on 2017/9/13.
 */
import server from '@/config/server'
let companyCheckServer = server('/v1/companyCheck/:params1/:params2/:params3/:params4/:params5',{},{
  listByid:{
    method:'post',
    params:{
      params1:'list',
      params2:'byId'
    }
  },
  companyCheckList: {
    method: 'post',
    params: {
      params1: 'list'
    }
  },
  companyCheck: {
    method: 'post',
    params: {
      params1: 'check'
    }
  }
});
export default companyCheckServer
