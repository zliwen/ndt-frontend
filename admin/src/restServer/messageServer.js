/**
 * Created by chenchen on 2017/8/29.
 */
import server from '@/config/server';
let messageServer = server('/city/api/admin/:params1/:params2/:params3/:params4/:params5',{},{
   queryNoticeListForUser:{
      method:'post',
      params:{
        params1:'notice',
        params2:'queryNoticeListForUser'
      }
    },
    deleteNotice:{
      method:'post',
      params:{
        params1:'notice',
        params2:'deleteNotice'
      }
    }
});
export default messageServer;
