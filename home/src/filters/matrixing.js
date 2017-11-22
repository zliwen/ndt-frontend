/**
 * Created by zhaowei on 2017/11/7.
 */

function matrixing(Vue) {
  Vue.filter("matrixing", function (value,p1,p2) {
    let ut=p2;
    if(p2=="万元"){
      if(value>=10000){
        ut = "亿元";
        let num = value/10000;
        let ne=num.toFixed(2);
        value=ne==num?num:ne;
      }
    }else{
      ut = "元";
      if(value>=10000){
        ut = "万元";
        let num = value/10000;
        let ne=num.toFixed(2);
        value=ne==num?num:ne;
      }else if(value>=100000000){
        ut = "亿元";
        let num = value/100000000;
        let ne=num.toFixed(2);
        value=ne==num?num:ne;
      }
    }
    if(p1==1){
      return value;
    }else {
      return ut;
    }
  });
}
export {matrixing as default};
