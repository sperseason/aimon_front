import { THEME_LIGHT } from '@/constants/index.js'
export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT
  }),
  mutations: {
    changeThemeType(state, themeType) {
      state.themeType = themeType
    }
  } 
}
