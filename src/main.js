import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

import 'popper.js'
import 'bootstrap'
import './assets/app.scss'

import { fb } from './firebase'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

Vue.component('Navbar', require('./components/Navbar.vue').default)

Vue.config.productionTip = false

let app = '' // false

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    // true
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
