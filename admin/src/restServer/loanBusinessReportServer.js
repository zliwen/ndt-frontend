/**
 * Created by zhanglw on 2017/10/24.
 * interface 0.0.1
 */
import server from '@/config/server';
let loanBusinessReportServer = server('/v1/:params1/:params2/:params3/:params4/:params5',{},{
    acceptStatement:{
	    method: 'post',
	    params: {
	      params1: 'statistics',
	      params2: 'acceptStatement',
	      params3: 'list'
	    }
  	},
  	exportToExcel:{
  		method: 'get',
	    params: {
	      params1: 'statistics',
	      params2: 'acceptStatement',
	      params3: 'exportToExcel'
	    }
  	}
});
export default loanBusinessReportServer;