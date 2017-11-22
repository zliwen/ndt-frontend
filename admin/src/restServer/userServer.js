/**
 * Created by zhaowei on 2017/8/24.
 */
import server from '@/config/server';
let userServer = server('/v1/:params1/:params2/:params3/:params4/:params5', {}, {
  add: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'add'
    }
  },
  login: {
    method: 'post',
    params: {
      params1: 'login'
    }
  },
  logout: {
    method: 'get',
    params: {
      params1: 'logout'
    }
  },
  findByUserId:{
    method: 'get',
    params: {
      params1: 'person',
      params2: 'findByUserId'
    }
  },
  findOrgList: {
    method: 'post',
    params: {
      params1: 'org',
      params2: 'find'
    }
  },
  addOrg: {
    method: 'post',
    params: {
      params1: 'org',
      params2: 'add'
    }
  },
  findOrgChilds: {
    method: 'get',
    params: {
      params1: 'org',
      params2: 'findChilds'
    }
  },
  findOrgById: {
    method: 'get',
    params: {
      params1: 'org',
      params2: 'findById'
    }
  },
  updateOrgInfo: {
    method: 'post',
    params: {
      params1: 'org',
      params2: 'update'
    }
  },
  deleteOrg: {
    method: 'post',
    params: {
      params1: 'org',
      params2: 'delete'
    }
  },
  userAdd: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'add'
    }
  },
  getUser: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'find'
    }
  },
  deleteUser: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'delete'
    }
  },
  updateUser: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'update'
    }
  },
  getVerify: {
    method: 'get',
    params: {
      params1: 'verify',
      params2: 'getCode'
    }
  },
  userRegister: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'register'
    }
  },
  companyRegister: {
    method: 'post',
    params: {
      params1: 'company',
      params2: 'register'
    }
  },
  dictList: {
    method: 'post',
    params: {
      params1: 'dict',
      params2: 'list'
    }
  },
  updateAccountState: {
    method: 'post',
    params: {
      params1: 'user',
      params2: 'updateAccountState'
    }
  },




});
export default userServer;
