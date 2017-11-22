/**
 * Created by zhaowei on 2017/9/9.
 */
function formatterNumber(Vue) {
  Vue.filter("formatterNumber", formatter);
}

function formatter(value) {
  if (value < 10000)return value;
  let num = value / 10000;
  if (value < 100000000)return num.toFixed(2) == num ? num + "万元" : num.toFixed(2) + "万元";
  num = value / 100000000;
  if (value >= 100000000)return num.toFixed(2) == num ? num + "亿元" : num.toFixed(2) + "亿元";
}


export {formatterNumber as default};

