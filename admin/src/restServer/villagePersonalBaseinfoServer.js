/**
 * Created by zhaowei on 2017/10/19.
 */
import server from '@/config/server';
let villagePersonalBaseServer = server('/v1/villagePersonalBaseinfo/:params1/:params2/:params3/:params4/:params5', {}, {
  add:{
    method: 'post',
    params: {
      params1: 'add'
    }
  },
  update:{
    method: 'post',
    params: {
      params1: 'update'
    }
  }


});
export default villagePersonalBaseServer;
