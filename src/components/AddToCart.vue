<template>
  <div>
    <button class="btn btn-primary" @click="addToCart()">Add to card</button>
  </div>
</template>

<script>
export default {
  name: 'AddToCart',
  props: {
    id: String,
    name: String,
    price: String,
    featuredImage: String
  },
  data() {
    return {
      item: {
        productId: this.id,
        productName: this.name,
        productPrice: this.price,
        productImage: this.featuredImage,
        productQuantity: 1
      }
    }
  },
  methods: {
    addToCart() {
      this.$store.commit('addToCart', this.item)
      this.$store.commit('displayAddToCartModal', true)
    }
  }
}
</script>

<style></style>
