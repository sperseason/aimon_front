import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})
/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    }
    return Promise.reject(new Error(message))
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    return Promise.reject(error)
  }
)
export default service
