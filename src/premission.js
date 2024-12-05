/**
 * 处理需要登录页面的访问权限
 */
import router from '@/router'
import store from '@/store'
import { message } from '@/libs/index.js'
router.beforeEach((to, from) => {
  // to and from are both route objects. must call `next`.
  if (!to.meta.user) {
    return
  }
  if (store.getters.token) {
    return true
  }
  message('warn', '登录失效，请重新登录')
  return '/'
})
