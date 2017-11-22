/**
 * Created by zhaowei on 2017/8/24.
 */
import server from '@/config/server';
let otherServer = server('/v1/:params1/:params2/:params3/:params4/:params5', {}, {
  refreshToken: {
    method: 'get',
    params: {
      params1: 'refreshToken'
    }
  },
  updatePwdByAdmin: {
    method: 'post',
    params: {
      params1: 'account',
      params2: 'updatePwdByAdmin'
    }
  },
  getCityById: {
    method: 'get',
    params: {
      params1: 'division',
      params2: 'children'
    }
  },
  getCityDetails: {
    method: 'get',
    params: {
      params1: 'division',
      params2: 'detail'
    }
  },
  findAllChildsTree: {
    method: 'get',
    params: {
      params1: 'division',
      params2: 'findAllChildsTree'
    }
  },

  listOrgs: {
    method: 'post',
    params: {
      params1: 'admin',
      params2: 'userManager',
      params3: 'listOrgs'
    }
  },
  uploadFiles: {
    method: 'post',
    params: {
      params1: 'file',
      params2: 'upload'
    }
  },
  downloadFiles: {
    method: 'get',
    params: {
      params1: 'file',
      params2: 'download'
    }
  },
  deleteFiles: {
    method: 'delete',
    params: {
      params1: 'file',
      params2: 'delete'
    }
  },
  addSensitiveWord:{
    method: 'post',
    params: {
      params1: 'sensitiveWord',
      params2: 'add'
    }
  },
  updateSensitiveWord:{
    method: 'post',
    params: {
      params1: 'sensitiveWord',
      params2: 'update'
    }
  },
  deleteSensitiveWord:{
    method: 'get',
    params: {
      params1: 'sensitiveWord',
      params2: 'delete'
    }
  },
  getSensitiveWordList:{
    method: 'post',
    params: {
      params1: 'sensitiveWord',
      params2: 'list'
    }
  },
  updatePasswd: {
    method: 'post',
    params: {
      params1: 'account',
      params2: 'updatePasswd'
    }
  }
});
export default otherServer;


