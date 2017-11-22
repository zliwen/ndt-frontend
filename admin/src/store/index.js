import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
console.log(actions);

import user from './modules/user'
import createLogger from './plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    menu: []
  },
  mutations: {
    setMenu(s, n){
      s.menu = n;
    }
  },
  actions,
  getters,
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
