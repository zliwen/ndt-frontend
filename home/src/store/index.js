import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import createLogger from './plugins/logger'
import storage from "@/config/storage"
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  state:{
    screenHeight:0,
    screenWidthScale:((document.body.clientWidth-15)<1200?1200:(document.body.clientWidth-15))/1920,
    token:storage.get('token'),
    loginName:storage.get('loginName'),
  },
  mutations:{
    setScreenWidthScale(c,v){c.screenWidthScale = v},
    setScreenHeight(c,v){c.screenHeight = v},
    setToken(c,v){c.token = v},
    setLoginName(c,v){c.loginName = v}
  },
  actions,
  getters,
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
