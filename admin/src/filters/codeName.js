/**
 * Created by zhaowei on 2017/9/22.
 */
/**
 * Created by zhaowei on 2017/9/9.
 */
function codeName(Vue) {
  Vue.filter("codeName", codeName1);
}
import codeTableObj from '@/services/getCodeTable';

function codeName1(value) {
  return codeTableObj.getCodeName(value);
}


export {codeName as default};

