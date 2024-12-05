import { ALL_CATEGORY_ITEM, CATEGORY_NOMAL_DATA } from '@/constants/index'
import { getCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => {
    return {
      categorys: []
    }
  },
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
