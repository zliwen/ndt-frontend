/**
 * Created by zhaowei on 2017/10/19.
 */
import server from '@/config/server';
let villagePersonalServer = server('/v1/villagePersonal/:params1/:params2/:params3/:params4/:params5', {}, {
  list: {
    method: 'post',
    params: {
      params1: 'list'
    }
  },
  del: {
    method: 'get',
    params: {
      params1: 'delete'
    }
  },
  getById:{
    method: 'get',
    params: {
      params1: 'detailById'
    }
  }


});
export default villagePersonalServer;
