<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn @click="fetchProducts" class="mb-4">Fetch Products</v-btn>
        <v-btn @click="showCreateModal" class="mb-4">Create Product</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-center">Product Name</th>
              <th class="text-center">Price</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Image</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="text-center">{{ product.productname }}</td>
              <td class="text-center">{{ product.price }}</td>
              <td class="text-center">{{ product.quantity }}</td>
              <td class="text-center">
                <v-img :src="`http://localhost:3000${product.img}`" alt="Product Image" max-width="100"  @click="showImg(`http://localhost:3000${product.img}`)"></v-img>
              </td>
              <td class="text-center">
                <v-btn @click="showEditModal(product)" class="primary mx-2">Edit</v-btn>
                <v-btn @click="deleteProduct(product._id)" class="error mx-2">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    
    <v-dialog v-model="isModalVisible" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ isEditMode ? 'Edit Product' : 'Create Product' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="isEditMode ? updateProduct() : createProduct()">
            <v-text-field
              v-model="productForm.productname"
              label="Product Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="productForm.price"
              label="Price"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="productForm.quantity"
              label="Quantity"
              type="number"
              required
            ></v-text-field>
            <v-file-input
              v-model="productForm.img"
              label="Image File"
              accept="image/*"
              @change="handleFileUpload"
              required
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="isEditMode ? updateProduct() : createProduct()">
            {{ isEditMode ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      isModalVisible: false,
      isEditMode: false,
      productForm: {
        productname: '',
        price: 0,
        quantity: 0,
        img: null, // เปลี่ยนเป็น null เพื่อรับไฟล์รูปภาพ
      },
      token: localStorage.getItem('userToken')
    };
  },
  created() {
    this.fetchProducts();
    // แสดงรูปขนาดใหญ่
  },
  methods: {
    // แสดงรูปขนาดใหญ่
    showImg(){
      this.$store.commit('showImg', this.productForm.img)

    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/product', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.products = response.data.data;
        console.log(this.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    showCreateModal() {
      this.isEditMode = false;
      this.productForm = { id: null, productname: '', price: '', quantity: '', img: null };
      this.isModalVisible = true;
    },
    showEditModal(product) {
      this.isEditMode = true;
      this.productForm = { ...product, img: null }; // รีเซ็ต img เป็น null เพื่อรับไฟล์ใหม่
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.productForm.img = file;
    },
    async createProduct() {
      const formData = new FormData();
      formData.append('productname', this.productForm.productname);
      formData.append('price', this.productForm.price);
      formData.append('quantity', this.productForm.quantity);
      formData.append('img', this.productForm.img);

      try {
        await axios.post('http://localhost:3000/api/v1/product', formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        this.fetchProducts();
        this.closeModal();
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
    async updateProduct() {
      const formData = new FormData();
      formData.append('productname', this.productForm.productname);
      formData.append('price', this.productForm.price);
      formData.append('quantity', this.productForm.quantity);
      if (this.productForm.img) {
        formData.append('img', this.productForm.img);
      }

      try {
        await axios.put(`http://localhost:3000/api/v1/product/${this.productForm.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        this.fetchProducts();
        this.closeModal();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },

  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>