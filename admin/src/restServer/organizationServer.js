/**
 * Created by zhaowei on 2017/8/24.
 */
import server from '@/config/server';
let organizationServer = server('/city/api/admin/:params1/:params2/:params3/:params4/:params5', {}, {
  listOrgs: {
    method: 'post',
    params: {
      params1: 'userManager',
      params2: 'listOrgs'
    }
  },
  getOrganizationTypeList: {
    method: 'post',
    params: {
      params1: 'userManager',
      params2: 'listOrgTypes'
    }
  },
  getCityById: {
    method: 'post',
    params: {
      params1: 'admindivision',
      params2: 'findById'
    }
  },
  addOrg: {
    method: 'post',
    params: {
      params1: 'userManager',
      params2: 'addOrg'
    }
  },
  updateOrgInfo: {
    method: 'post',
    params: {
      params1: 'userManager',
      params2: 'updateOrgInfo'
    }
  }

});
export default organizationServer;
