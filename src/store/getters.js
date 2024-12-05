import { isMoblieTerminal } from '@/utils/flexible'
export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  /**
   * 获取当前分类
   */
  currentCategory: (state) => state.app.currentCategory,
  //选中项的下标
  currentCategoryIndex: (state, getters) => {
    console.log(
      getters.categorys.findIndex(
        (item) => item.id === getters.currentCategory.id
      )
    )
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    )
  },
  historys: (state) => state.search.history,
  searchText: (state) => state.app.searchText,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  routerType: (state) => {
    if (!isMoblieTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
