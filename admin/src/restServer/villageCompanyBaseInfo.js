/**
 * Created by zhaowei on 2017/10/24.
 */

import server from '@/config/server';
let villageCompanyBaseInfoServer = server('/v1/villageCompanyBaseInfo/:params1/:params2/:params3/:params4/:params5', {}, {
  add: {
    method: 'post',
    params: {
      params1: 'add'
    }
  },
  del: {
    method: 'get',
    params: {
      params1: 'delete'
    }
  },
  findById:{
    method: 'get',
    params: {
      params1: 'findById'
    }
  },
  update:{
    method: 'post',
    params: {
      params1: 'update'
    }
  }
});
export default villageCompanyBaseInfoServer;
