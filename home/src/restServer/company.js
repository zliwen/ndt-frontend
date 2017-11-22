/**
 * Created by zhaowei on 2017/9/26.
 */
import server from '@/config/server'
let companyServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
  detail:{
    method:'get',
    params:{
      params1:'front',
      params2:'company',
      params3:'detail'
    }
  }
});
export default companyServer
