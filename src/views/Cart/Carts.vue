<template>
  <div>
    <h1>Shopping Cart</h1>
    <v-btn color="success" @click="created">text</v-btn>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.productname" class="cart-item">
        <h2>{{ item.productname }}</h2>
        <p>Order Quantity: {{ item.order }}</p>
        <p>Total Quantity: {{ item.totlequantity }}</p>
        <p>Total Quantity: {{ item.totleprice }}</p>
        <p>Order Date: {{ item.orderdate }}</p>
        <v-btn color="error" @click="deleteOrder(item._id)">Delete</v-btn>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      cartItems: [],
      loading: true,
      error: null,
      token: localStorage.getItem("userToken"),
    };
  },
  created() {
    this.created();
  },
  methods: {
    // โหลดข้อมูลสินค้าที่มีในตะกร้า
    async created() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/order", {
          headers: {
            Authorization: `Bearer ${this.token}`, // ส่ง token ไปยัง API
          },
        });
        console.log("Response:", response.data);
        this.cartItems = response.data.data;
        console.log("Cart Items:", this.cartItems);
      } catch (err) {
        this.error = "Failed to fetch order data";
      } finally {
        this.loading = false;
      }
    },
    // ลบ order แต่ละ order
    async deleteOrder(orderId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`, // ส่ง token ไปยัง API
          },
        });
        this.cartItems = this.cartItems.filter((item) => item._id !== orderId);
      } catch (err) {
        this.error = "Failed to delete order";
      }
    },
  },
};
</script>
  
  <style scoped>
.cart-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
.error {
  color: red;
}
</style>