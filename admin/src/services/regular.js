/**
 * Created by zhaowei on 2017/9/19.
 */
let regular={
  test:function (value,key) {
    let isGood=false;
    this.keyList[key].forEach(function (item) {
      if(item.test(value)) isGood=true;
    });
    return isGood;
  },
  keyList:{
    "联系方式":[/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9})|(95\d{3})|(400-\d{3}-\d{4}))$/]
  }
};

export default regular;
