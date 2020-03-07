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
              <!-- <th>Description</th> -->
              <th>Modify</th>
            </tr>
            <tr v-for="p in products" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.price }}</td>
              <!-- <td>{{ p.description }}</td> -->
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
                    <vue-editor v-model="product.description" />
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
                      v-model="currentTag"
                      class="form-control"
                      @keyup.188="addTag()"
                    />
                    <div v-if="product.tags">
                      <span v-for="tag in product.tags" :key="tag">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      @change="uploadImage"
                    />
                    <div
                      class="d-flex align-items-start py-2"
                      v-if="product.images"
                    >
                      <div
                        v-for="(img, idx) in product.images"
                        :key="img"
                        class="img-wrapper"
                      >
                        <img :src="img" class="mr-3" width="80px" />
                        <span class="delete" @click="deleteImage(img, idx)">
                          X
                        </span>
                      </div>
                    </div>
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
import { fb, db } from '../firebase'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Products',
  components: { VueEditor },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: []
      },
      showModal: false,
      mode: null,
      currentTag: null
    }
  },

  created() {},

  firestore() {
    return {
      products: db.collection('products')
    }
  },

  methods: {
    reset() {
      this.product = {
        name: null,
        price: null,
        description: null,
        tags: [],
        images: []
      }
    },

    openAddModal() {
      this.mode = 'add'
      this.reset()
      this.showModal = true
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

    addTag() {
      this.product.tags.findIndex(x => x == this.currentTag) < 0
        ? this.product.tags.push(this.currentTag) // TODO if array is null, create an empty array
        : console.log('This key already exists!')
      this.currentTag = ''
    },

    uploadImage(e) {
      let file = e.target.files[0]
      // TODO add timestamp to the file name
      let storageRef = fb.storage().ref('products/' + file.name)
      let uploadTask = storageRef.put(file)

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        () => {},
        () => {},
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL)
            this.product.images.push(downloadURL) // TODO if array is null, create an empty array
          })
        }
      )
    },

    deleteImage(img, idx) {
      let storageRef = fb.storage().refFromURL(img)

      this.product.images.splice(idx, 1)

      // Delete the file
      storageRef
        .delete()
        .then(() => {
          // File deleted successfully
          console.log('Image was deleted')
        })
        .catch(() => {
          // Uh-oh, an error occurred!
        })
    }
  }
}
</script>

<style>
.img-wrapper {
  position: relative;
}
.delete {
  position: absolute;
  padding: 1rem;
  left: -10px;
}
.delete:hover {
  cursor: pointer;
}
</style>
