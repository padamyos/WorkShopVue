import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import login from '@/views/user/login.vue'

import workshop1 from '@/views/workshop/workshop1.vue'
import workshop2 from '@/views/workshop/workshop2.vue'

import ProductManage from '@/views/Product/ProductManage.vue'
import HomeShop from '@/views/user/HomeShop.vue'
import Carts from '@/views/Cart/Carts.vue'

Vue.use(VueRouter)

// check if user is logged in
function isLoggedIn() {
  return !!localStorage.getItem('userToken');
}
// check if user is admin
function isApproved() {
  const status = JSON.parse(localStorage.getItem('status'));
  if(status === 'approved'){
    return true;
}
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/workshop1',
    name: 'Workshop1',
    component: workshop1,
    meta: { requiresAuth: true }
  },
  {
    path: '/workshop2',
    name: 'Workshop2',
    component: workshop2,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Carts',
    component: Carts,
    meta: { requiresAuth: true }
  },
  {
    path: '/productmanage',
    name: 'ProductManage',
    component: ProductManage,
    meta: { requiresAuth: true }
  },
  {
    path: '/homeShop',
    name: 'HomeShop',
    component: HomeShop,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  requireConfigFile: false
})


// ตรวจสอบสิทธิ์การเข้าถึงหน้า
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresApproved)) {
    if (!isLoggedIn() || !isApproved() ) {
      next(
        //  ถ้าไม่ใช่ admin ให้ redirect ไปหน้า login
        { name: 'Login' },
        // แจ้งเตือนว่าต้องเข้าใช้งานเป็น admin เท่านั้น
        console.log('You must be an admin to access this page')
      );
    } else {
      // ถ้าเป็น admin ให้ไปหน้าถัดไป
      console.log('You are an admin')
      next(
        { name: 'ProductManage' }
        

      );
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn() ) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
