export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/main/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/register/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    // 标记当前页面只有用户登录才可以进入
    meta: {
      user: true
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
    // 标记当前页面只有用户登录才可以进入
    meta: {
      user: true
    }
  },
  {
    path: '/pay/result',
    name: 'payResult',
    component: () => import('@/views/pay/index.vue')
    // 标记当前页面只有用户登录才可以进入
  }
]
