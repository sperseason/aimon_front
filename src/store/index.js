import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import pay from './modules/pay'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user,
    pay
  },
  plugins: [
    createPersistedState({
      key: 'aimon-front',
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})
export default store
