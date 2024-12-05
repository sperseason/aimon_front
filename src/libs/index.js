import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index.js'
export { message } from './message/index.js'
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentsName = 'm-' + fullPath.replace('./', '').split('/')[0]
      app.component(componentsName, defineAsyncComponent(fn))
    }
  }
}
