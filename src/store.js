import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    addToCartModal: false
  },

  mutations: {
    addToCart(state, payload) {
      let found = state.cart.find(
        product => product.productId === payload.productId
      )
      if (found) {
        payload.productQuantity++
      } else {
        state.cart.push(payload)
      }
    },
    displayAddToCartModal(state, payload) {
      state.addToCartModal = payload
    }
  }
})
