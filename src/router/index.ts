import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () =>import('../views/InicioView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/resertpassword',
      name: 'resertpassword',
      component: () => import('../views/ResertPasswordView.vue'),
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/quienessomo',
      name: 'quienessomo',
      component: () => import('../views/QuienSomosView.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/citas',
      name: 'citas',
      component: () => import('../views/CitasView.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, role: 'admin'}
    }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const usertype = localStorage.getItem('usertype');

  if(to.meta.requiresAuth) {
    if(token && usertype && usertype === to.meta.role){
      next()
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router
