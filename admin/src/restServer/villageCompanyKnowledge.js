/**
 * Created by zhaowei on 2017/10/25.
 */

import server from '@/config/server';
let villageCompanyKnowledgeServer = server('/v1/villageCompanyKnowledge/:params1/:params2/:params3/:params4/:params5', {}, {
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
export default villageCompanyKnowledgeServer;
