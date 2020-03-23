import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import crud from './crud'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    crud
  }
})

Vuex.Store.prototype.registerModuleWithoutRepeat = (a, b) => {
  if (!store.state[a]) {
    store.registerModule(a, b)
  }
}
export default store
