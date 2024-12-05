import { ALL_CATEGORY_ITEM } from '@/constants/index.js'
export default {
  namespaced: true,
  state: () => {
    return {
      currentCategory: ALL_CATEGORY_ITEM,
      searchText: '',
      // 路由跳转类型
      routerType: 'none'
    }
  },
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, category) {
      state.currentCategory = category
    },
    changeSearchText(state, text) {
      state.searchText = text
    },
    changeRouterType(state, type) {
      state.routerType = type
    }
  },
  actions: {}
}
