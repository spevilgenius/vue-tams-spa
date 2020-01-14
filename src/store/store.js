import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
// import VuexORMAxios from '@vuex-orm/plugin-axios'
import Hull from '@/models/Hull'
import Fleet from '@/models/Fleet'
import * as notification from '@/store/modules/notification.js'
Vue.use(Vuex)
// VuexORM.use(VuexORMAxios, { axios })

const database = new VuexORM.Database()

database.register(Hull)
database.register(Fleet)
Vue.config.devtools = true
const store = new Vuex.Store({
  modules: {
    notification
  },
  plugins: [VuexORM.install(database)]
})

export default store
