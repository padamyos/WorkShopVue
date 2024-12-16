<template>
  <v-app>
    <v-app-bar
      app
      height="80px"
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
    >
      <v-col class="align-center" >
        <v-btn class=" " @click="Home">
          <v-icon>mdi-cart</v-icon>
          <span class="white--text font-weight-bold">VueShop</span>
                
        </v-btn>
      </v-col>

      <v-spacer></v-spacer>

      <v-row justify="end">
        <ToggleTheme @click="toggleTheme" />
        <!-- ถ้า login -->
        <div v-if="this.isLoggin === 'true'">
          <v-btn
            icon
            x-large
            @click="() => this.$router.push('/cart')"
            class="mt-5"
          >
            <v-icon class="">mdi-cart</v-icon>
          </v-btn>

          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on" class="mt-5">
                <v-avatar color="brown" size="48">
                  <span class="white--text text-h5">{{ user.initials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <span class="white--text text-h5">{{ user.initials }}</span>
                  </v-avatar>
                  <h3>{{ user.fullName }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="editAccount">
                    Edit Account
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="Logout">
                    Disconnect
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </div>
        <!-- ถ้า logout -->
        <div v-else>
          <v-btn
            x-large
            elevation="8"
            @click="() => this.$router.push('/login')"
            class="my-5"
            color="success"
          >
            sing in
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>

    <v-main class="">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ToggleTheme from "./components/ToggleTheme.vue";
import { EventBus } from "@/EventBus";

export default {
  name: "App",

  data() {
    return {
      user: {
        fullName: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      },
      isDark: false, // เริ่มต้นธีมที่สว่าง (Light Mode)
      isLoggin: localStorage.getItem("isLoggin"),
    };
  },
  created() {
    // ฟัง event 'user-logged-in' เมื่อ component ถูกสร้าง
    EventBus.$on("user-logged-in", this.handleUserLoggedIn);
    const name = localStorage.getItem("name");
    this.user.name = name;
    this.user.initials = name.substring(0, 2).toUpperCase();
  },
  components: {
    ToggleTheme,
  },
  methods: {
    Home(){
      this.$router.push("/homeshop");
    },
    handleUserLoggedIn({ token, status, name, email }) {
      localStorage.setItem("isLoggin", true);
      console.log("User logged in with token:", token);
      console.log("User status:", status);
      console.log("User name:", name);
      console.log("User email:", email);
      // ทำสิ่งที่ต้องการเมื่อผู้ใช้ล็อกอินสำเร็จ
    },
    beforeDestroy() {
      // ยกเลิกการฟัง event 'user-logged-in' เมื่อ component กำลังจะถูกทำลาย
      EventBus.$off("user-logged-in", this.handleUserLoggedIn);
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.$vuetify.theme.dark = this.isDark;
      console.log(this.isDark);
    },
    Logout() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("status");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("isLoggin");
      // Add your logout logic here
      console.log("User logged out");
      return this.$router.push("/login");
    },
    editAccount() {
      // Add your edit account logic here
      console.log(this.isLoggin);
    },
  },
};
</script>
