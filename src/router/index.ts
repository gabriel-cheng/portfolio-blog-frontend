import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: function(to, from, next) {
        const token = sessionStorage.getItem('token');

        if(!token) {
            next('/auth/login');
        }
        next();
      },
      component: () => import('../views/VerPostagens.vue')
    },
    {
      path: '/ver-postagens',
      name: 'ver-postagens',
      beforeEnter: function(to, from, next) {
        const token = sessionStorage.getItem('token');

        if(!token) {
            return next('/auth/login');
        }
        next();
      },
      component: () => import('../views/VerPostagens.vue')
    },
    {
      path: '/criar-postagem',
      name: 'criar-postagem',
      beforeEnter: function(to, from, next) {
        const token = sessionStorage.getItem('token');

        if(!token) {
            return next('/auth/login');
        }
        next();
      },
      component: () => import('../views/CriarPostagem.vue')
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('../views/AuthLogin.vue')
    },
  ]
})

export default router
