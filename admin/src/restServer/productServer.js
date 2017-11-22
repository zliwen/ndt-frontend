/**
 * Created by zhaowei on 2017/9/1.
 */
import server from '@/config/server';
let productServer = server('/v1/loanProduct/:params1/:params2/:params3/:params4/:params5', {}, {
  getProductDetail: {
  //getProductList: {
    method: 'get',
    params: {
      params1: 'list4Front'
    }
  },
  getProductListForOwn: {
    method: 'post',
    params: {
      params1: 'find'
    }
  },
  sortIndex: {
    method: 'post',
    params: {
      params1: 'updateIndex'
    }
  },
  addProduct: {
    method: 'post',
    params: {
      params1: 'add'
    }
  },
  updateState:{
    method: 'post',
    params: {
      params1: 'updateState'
    }
  },
  deleteProduct: {
    method: 'post',
    params: {
      params1: 'delete'
    }
  },
  editProduct: {
    method: 'post',
    params: {
      params1: 'update'
    }
  },

});
export default productServer;
