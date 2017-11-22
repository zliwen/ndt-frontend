//最开始进入项目之前需要做的一些事情（比如：兼容性之类的）
import "./config/beforeCreate"

//vue 全家桶+iView
import Vue from './config/prototype'
import router from './router'
import iView from 'iview'
//样式
import "@/assets/css/common.less"
import '@/assets/css/default.less'
// import 'iview/dist/styles/iview.css'
//配置config
import component from './config/component'
//vuex
import store from './store'
//根实例
// filter
import filter from './config/filter'
//微信
import "./config/weiXin"
//
import "babel-polyfill"
import storage from "@/config/storage"
let vm =new Vue({
  router:router,
  store,
  mounted(){
    store.commit("setScreenHeight",document.body.clientHeight)
  }
});
//安装插件/config
Vue.use(component);
Vue.use(iView);
Vue.use(filter);

window.Vue = Vue;
window.storage = storage;

window.onresize = (()=>{
  store.commit("setScreenWidthScale",document.body.clientWidth/1920);
});
//挂载到html
vm.$mount('#app');
