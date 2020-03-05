<template>
  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3>Products</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta cum
            saepe rerum, repellat exercitationem quod dolor a voluptate corrupti
            voluptates aut quibusdam, itaque et dolorum! Sed rerum perferendis
            sunt veritatis.
          </p>
        </div>
        <div class="col-md-6">
          <img src="/img/admin_products.svg" alt="" class="img-fluid" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3 class="d-inline-block">Product list</h3>
          <button class="btn btn-primary float-right" @click="openAddModal()">
            Add product
          </button>
          <table class="table">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Modify</th>
            </tr>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.price }}</td>
              <td>{{ p.description }}</td>
              <td>
                <button
                  class="btn btn-sm btn-primary"
                  @click="openEditModal(p)"
                >
                  Edit
                </button>
                <button class="btn btn-sm btn-danger" @click="deleteProduct(p)">
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editTitle"
      aria-hidden="true"
    >
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Edit product
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="showModal = false"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Product name"
                      v-model="product.name"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      name="description"
                      v-model="product.description"
                      id="description"
                      placeholder="Description"
                      class="form-control"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Price"
                      v-model="product.price"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Tags"
                      v-model="product.tags"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      @change="uploadImage()"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    @click="showModal = false"
                  >
                    Close
                  </button>
                  <button
                    v-if="mode === 'add'"
                    type="button"
                    class="btn btn-primary"
                    @click="addProduct()"
                  >
                    Save changes
                  </button>
                  <button
                    v-if="mode === 'edit'"
                    type="button"
                    class="btn btn-primary"
                    @click="updateProduct()"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tags: null,
        images: null
      },
      showModal: false,
      mode: null
    }
  },

  created() {},

  firestore() {
    return {
      products: db.collection('products')
    }
  },

  methods: {
    openAddModal() {
      this.mode = 'add'
      this.showModal = true
      this.product = {}
    },

    addProduct() {
      this.$firestore.products.add(this.product)
      this.showModal = false
    },

    deleteProduct(product) {
      this.$firestore.products.doc(product.id).delete()
    },

    openEditModal(product) {
      this.mode = 'edit'
      this.product = product
      this.showModal = true
    },

    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product)
      this.showModal = false
    },

    uploadImage() {}
  }
}
</script>

<style></style>
