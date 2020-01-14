import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './dashboard'
import App from './App.vue'
import routes from './routes/routes'
import store from './store/store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(far, fas)
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* import jquery from 'jquery'
Object.defineProperty(Vue.prototype, '$jQuery', { value: jquery }) */

Vue.use(VueRouter)
Vue.use(Dashboard)

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
