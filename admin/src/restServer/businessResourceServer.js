/**
 * Created by chenchen on 2017/9/28.
 */
import server from '@/config/server';
let businessResourceServer = server('/v1/businessResource/:params1/:params2/:params3/:params4/:params5',{},{
    add:{//新增资源
        method: 'post',
        params: {
            params1: 'add',
        }
    },
    list:{//资源列表
        method: 'post',
        params: {
            params1: 'list',
        }
    },
    deleteAll:{//删除资源
        method: 'get',
        params: {
            params1: 'deleteAll',
        }
    },
    deleteSingle:{//单个删除资源文件
        method: 'get',
        params: {
            params1: 'deleteSingle',
        }
    },
    detailById:{//待处理的列表，审核机构调?
        method: 'get',
        params: {
            params1: 'detailById',
        }
    },
});
export default businessResourceServer;
