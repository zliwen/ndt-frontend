/**
 * Created by zhanglw on 2017/10/26.
 */
import server from '@/config/server';
let operateplatformReport = server('/v1/:params1/:params2/:params3/:params4/:params5', {}, {
  getNews: {
    method: 'post',
    params: {
      params1: 'statistics',
      params2: 'info',
      params3: 'findInfoPublishNum'
    }
  },
  getPolicy: {
    method: 'post',
    params: {
      params1: 'statistics',
      params2: 'policy',
      params3: 'findOperatingReportsPolicyPublishNum'
    }
  },
  getvillage: {
    method: 'post',
    params: {
      params1: 'statistics',
      params2: 'villageInfo',
      params3: 'findVillageInfoCollect'
    }
  },
  villageStatementTotal: {
    method: 'post',
    params: {
      params1: 'statistics',
      params2: 'villageStatementTotal'
    }
  },
  findOperatingReportsInfoPublishNum: {
    method: 'post',
    params: {
      params1: 'statistics',
      params2: 'info',
      params3: 'findOperatingReportsInfoPublishNum'
    }
  }

});
export default operateplatformReport;
