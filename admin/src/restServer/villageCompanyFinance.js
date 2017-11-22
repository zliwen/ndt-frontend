/**
 * Created by zhaowei on 2017/10/24.
 */

import server from '@/config/server';
let villageCompanyFinanceServer = server('/v1/villageCompanyFinance/:params1/:params2/:params3/:params4/:params5', {}, {
  batchAdd: {
    method: 'post',
    params: {
      params1: 'add'
    }
  },
  update:{
    method: 'post',
    params: {
      params1: 'updateByBaseInfoId'
    }
  },
  findByBaseInfoId:{
    method: 'get',
    params: {
      params1: 'findByBaseInfoId'
    }
  }
});
export default villageCompanyFinanceServer;
