<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1>Product List</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="product in products" :key="product._id" cols="12" sm="6" md="4">
        <v-card>
          <v-img :src="`http://localhost:3000${product.img}`" height="200px"></v-img>
          <v-card-title>{{ product.productname }}</v-card-title>
          <v-card-subtitle>Price: {{ product.price }}</v-card-subtitle>
          <v-card-text>Quantity: {{ product.quantity }}</v-card-text>
          <v-card-text>_id: {{ product._id }}</v-card-text>
          <v-card-actions>
            
            
            <v-text-field v-model="product.order" 
            label="Order Quantity" 
            type="number" >
              
            </v-text-field>

            <v-btn color="primary" @click="addOrder(product._id)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="isImgDialogVisible" max-width="600px">
      <v-card>
        <v-img :src="selectedImg" alt="Large Product Image"></v-img>
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
      isImgDialogVisible: false,
      selectedImg: '',
      token: localStorage.getItem('userToken')
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/product', {
          headers: {
            Authorization: `Bearer ${this.token}` // ส่ง token ไปยัง API
          }
        });
        this.products = response.data.data;
        console.log("Products:", this.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async addOrder(product) {

      console.log('Adding to cart:', product);
      try {
        const response = await axios.post(`http://localhost:3000/api/v1/product/${product}/order`, {
          _id: product,
          order: 1, // หรือจำนวนที่ต้องการสั่งซื้อ
        }, {
          headers: {
            Authorization: `Bearer ${this.token}` // ส่ง token ไปยัง API
          }
        });
        console.log('Order response:', response.data);
        // alert(`${product.productname} has been added to your cart.`);
        return this.fetchProducts();
      } catch (error) {
        console.error('Error adding to cart:', error);
       
      }
    },
    showImg(imgUrl) {
      this.selectedImg = imgUrl;
      this.isImgDialogVisible = true;
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>