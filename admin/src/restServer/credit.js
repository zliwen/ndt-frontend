/**
 * Created by zhangliwen on 2017/10/11.
 */
import server from '@/config/server1';
import axios from 'axios';
let creditServer = server('http://182.140.213.68:9080/zhixin/:params1/:params2/:params3/:params4/:params5',{},{
  searchCompanyInfoByKey:{
    method:'get',
    params:{
      params1:'baseInfo',
      params2:'searchCompanyInfoByKey.st',
      sid:"ndt"
    }
  },
  getData:{
    method:'get',
    params:{
      sid:"ndt"
    }
  },
  propertyRight:{
    method:'get',
    params:{
      params1:'propertyRight',
      sid:"ndt"
    }
  },
  searchQySight:{
  	method:'get',
    params:{
      params1:'qySight',
      params2:'searchQySight.st',
      sid:"ndt"
    }
  },
  queryCompanyInfoByName:{
  	method:'get',
    params:{
      params1:'baseInfo',
      params2:'queryCompanyInfoByName.st',
      sid:"ndt"
    }
  },
  queryShareHolderByName:{ //股东情况
  	method:'get',
    params:{
      params1:'baseInfo',
      params2:'queryShareHolderByName.st',
      sid:'ndt'
    }
  },
  queryOverseaInstByName:{ //海外投资机构
  	method:'get',
    params:{
      params1:'baseInfo',
      params2:'queryOverseaInstByName.st',
      sid:'ndt'
    }
  },
  queryBoardDirectorByName:{ //主要人员
  	method:'get',
    params:{
      params1:'baseInfo',
      params2:'queryBoardDirectorByName.st',
      sid:'ndt'
    }
  },
  queryBranchsByName:{ //分支机构
  	method:'get',
    params:{
      params1:'baseInfo',
      params2:'queryBranchsByName.st',
      sid:'ndt'
    }
  },
  queryCompanyInforChangeByName:{ //工商变更
  	method:'get',
    params:{
      params1:'law',
      params2:'queryCompanyInforChangeByName.st',
      sid:'ndt'
    }
  },
  queryCreditBehaviorByName:{ //信用行为
  	method:'get',
    params:{
      sid:'ndt'
    }
  }
},axios.create({baseURL:"http://182.140.213.68:9080"}));
export default creditServer;
