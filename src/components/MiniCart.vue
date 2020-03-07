<template>
  <div
    v-if="this.$store.state.addToCartModal"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Your cart
                </h5>
                <button
                  @click="$store.commit('displayAddToCartModal', false)"
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div
                  v-for="(product, index) in this.$store.state.cart"
                  :key="index"
                >
                  <div>{{ product.productName }}</div>
                  <div>
                    {{
                      getTotalSum(
                        product.productPrice,
                        product.productQuantity
                      ) | currency
                    }}
                  </div>
                  <div>Quantity: {{ product.productQuantity }}</div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  @click="$store.commit('displayAddToCartModal', false)"
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Continue Shopping
                </button>
                <button to="button" class="btn btn-primary" @click="checkout()">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MiniCart',
  methods: {
    getTotalSum(price, quantity) {
      return Number(price) * quantity
    },

    checkout() {
      this.$store.commit('displayAddToCartModal', false)
      this.$router.push('/checkout')
    }
  }
}
</script>

<style></style>
