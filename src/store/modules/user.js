import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys.js'
import { message } from '@/libs/index.js'
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from '../../constants'
export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(start, newToken) {
      start.token = newToken
    },
    setUserInfo(start, newUserInfo) {
      start.userInfo = newUserInfo
    }
  },
  actions: {
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      if (data.code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
        return data.code
      }
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      console.log('data', data)
      message(
        'success',
        `欢迎您 ${
          data.vipLevel
            ? '尊贵的vip-' + data.vipLevel + '用户:' + data.username
            : data.username
        }`,
        6000
      )
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      location.reload()
    }
  }
}
