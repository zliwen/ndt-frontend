/**
 * Created by chenchen on 2017/8/30.
 */
import server from '@/config/server';
let award = server('/city/api/admin/:params1/:params2/:params3/:params4/:params5', {}, {
  getList: {
    method: 'post',
    params: {
      params1: 'requisition',
      params2: 'findAllByDocstatus'
    }
  },
  allowanceFinishProcess:{
    method: 'post',
    params: {
      params1: 'activiti',
      params2: 'allowanceFinishProcess'
    }
  },
  startAllowanceReviewProcess:{
    method: 'post',
    params: {
      params1: 'activiti',
      params2: 'startAllowanceReviewProcess'
    }
  },
  allowanceRejectSubmit:{
    method: 'post',
    params: {
      params1: 'activiti',
      params2: 'allowanceRejectSubmit'
    }
  },
  findHistoryComment:{
    method: 'post',
    params: {
      params1: 'activiti',
      params2: 'findHistoryComment'
    }
  },
  findOne:{
    method:'post',
    params:{
      params1: 'requisition',
      params2: 'findOne'
    }
  },
  againAllowanceReview:{
    method:'post',
    params:{
      params1: 'activiti',
      params2: 'againAllowanceReview'
    }
  },
  getTreeNodes:{
    method:'post',
    params:{
      params1: 'treeNode',
      params2: 'findById'
    }
  },
  addOrUpdate:{
    method:'post',
    params:{
      params1: 'requisition',
      params2: 'addOrUpdate'
    }
  }
});
export default award;
