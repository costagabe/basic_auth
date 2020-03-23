import '@/plugins/notificacao'
import './registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import uppercase from './directives/uppercase'
import './plugins/components'
import bases from './plugins/bases'
import './plugins/rules'

bases(axios, store)
Vue.config.productionTip = false
Vue.directive('uppercase', uppercase)

export const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
