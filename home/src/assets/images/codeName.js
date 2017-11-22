/**
 * Created by zhaowei on 2017/9/22.
 */
/**
 * Created by zhaowei on 2017/9/9.
 */
function codeName(Vue) {
  Vue.filter("codeName", codeName);
}
import codeTableObj from '@/services/getCodeTable';

function codeName(value) {
  return codeTableObj.getCodeName(value);
}


export {codeName as default};

