import Vue from 'vue';
import Router from 'vue-router';

import App from 'cmpts/App';
import home from './home';
import financialService from './financial-service';
import policyInfomation from './policy-infomation';
import ndtBigData from './ndt-big-data';
import nonstopCounty from './nonstop-county';
import countryCredit from './country-credit';
import propertyTransaction from './property-transaction';
import user from './user';
import storage from '../config/storage';

Vue.use(Router);
//路由在这里配置，以后文件多了，还可以拆分然后在合并
let routes = [
  {
    path: '/',
    component:App,
    meta: {
      name: "app"
    },
    redirect:{name:"index"},
    children: [].concat(home,financialService,policyInfomation,ndtBigData,nonstopCounty,countryCredit,propertyTransaction,user)
  }
];
let router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  // 设置 标题
  document.title = '农贷通-'+to.meta.name || '农贷通';
  // 统计代码
  if (from.name) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath, window.location.origin ]);
  } else {
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  //设置divisionId
  if(/^(\/xian)/.test(to.fullPath)){
    let id = from.query.tsid||to.query.tsid||storage.get("cityId");
    let name = from.query.tsname||to.query.tsname||storage.get("cityName");

    storage.set("cityId",id).set("cityName",name);
    let query = Object.assign({},to.query,{tsid:id,tsname:name});
    if(!/tsid/.test(to.fullPath)){next({name:to.name,query:query});return}
  }
  $("#app_container").animate({scrollTop:0},0);

  next();
});
export default router;


