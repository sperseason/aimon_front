import { watch } from 'vue'
import { THEME_LIGHT, THEME_DRAK, THEME_SYSTEM } from '@/constants/index.js'
import store from '../store'
let matchMedia
const watchSytemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DRAK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      console.log('system')
      watchSytemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
