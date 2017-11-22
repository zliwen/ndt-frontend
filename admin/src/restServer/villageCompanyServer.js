/**
 * Created by zhaowei on 2017/10/19.
 */

import server from '@/config/server';
let villageCompanyServer = server('/v1/:params1/:params2/:params3/:params4/:params5', {}, {
  find: {
    method: 'post',
    params: {
      params1: 'villageCompanyBaseInfo',
      params2: 'find'
    }
  },
  del: {
    method: 'post',
    params: {
      params1: 'villageCompany',
      params2: 'delete'
    }
  }

});
export default villageCompanyServer;
