import lazy from './modules/lazy'
export default {
  async install(app) {
    const directives = import.meta.glob('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      const d = await value()
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, d.default)
    }
  }
}
