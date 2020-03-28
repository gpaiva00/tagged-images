import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import Admin from '../pages/Admin.vue';
import Login from '../pages/Login.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const vuex = localStorage.getItem('vuex');
    const { user } = JSON.parse(vuex);

    // console.log({ user });

    if (user.logged === true) {
      // allow to enter /admin route
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    next();
  }
});

export default router;
