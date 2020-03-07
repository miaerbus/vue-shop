<template>
  <div class="container">
    <h5 class="text-center">Product list</h5>
    <div class="row">
      <div class="col-md-4" v-for="(product, index) in products" :key="index">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ product.name }}</h5>
              <h5 class="card-price">{{ product.price | currency }}</h5>
            </div>
            <AddToCart
              :id="product.id"
              :name="product.name"
              :price="product.price"
              :featured-image="
                product.images ? getFeaturedImage(product.images) : ''
              "
            ></AddToCart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCart from '@/components/AddToCart'
import { db } from '../firebase'

export default {
  name: 'ProductList',
  components: {
    AddToCart
  },
  data() {
    return {
      products: []
    }
  },

  firestore() {
    return {
      products: db.collection('products')
    }
  },

  methods: {
    getFeaturedImage(images) {
      return images[0]
    }
  }
}
</script>

<style></style>
