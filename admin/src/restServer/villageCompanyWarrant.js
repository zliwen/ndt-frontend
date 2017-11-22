/**
 * Created by zhaowei on 2017/10/24.
 */

import server from '@/config/server';
let villageCompanyWarrantServer = server('/v1/villageCompanyWarrant/:params1/:params2/:params3/:params4/:params5', {}, {
  batchAdd: {
    method: 'post',
    params: {
      params1: 'batchAdd'
    }
  },
  update:{
    method: 'post',
    params: {
      params1: 'update'
    }
  },
  findByBaseInfoId:{
    method: 'get',
    params: {
      params1: 'findByBaseInfoId'
    }
  }
});
export default villageCompanyWarrantServer;