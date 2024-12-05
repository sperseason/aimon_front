import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import 'virtual:svg-icons-register'
import useTheme from '@/utils/theme'
import mLibs from '@/libs/index.js'
import mDirective from '@/directives'
import './premission.js'
useREM()
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(mDirective).mount('#app')
