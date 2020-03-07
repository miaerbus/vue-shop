import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
import Vue2Filters from 'vue2-filters'
import store from './store'

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

Vue.use(Vue2Filters)

Vue.component('Navbar', require('./components/Navbar.vue').default)

Vue.config.productionTip = false

let app = '' // false

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    // true
    new Vue({
      router,
      // provide the store using the "store" option.
      // this will inject the store instance to all child components.
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
