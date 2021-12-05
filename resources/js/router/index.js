import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import admin from './admin'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: '/login',
  routes: [
    ...admin
  ],
})

// Middleware
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });


export default router
