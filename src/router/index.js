import { createRouter, createWebHistory } from 'vue-router'
import { isMoblieTerminal } from '../utils/flexible'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routes'
console.log(isMoblieTerminal.value)
//创建vuerouter的实例
const router = createRouter({
  history: createWebHistory(),
  routes: isMoblieTerminal.value ? mobileRoutes : pcRoutes
})
export default router
