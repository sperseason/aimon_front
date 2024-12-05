export default {
  namespaced: true,
  state: () => {
    return {
      payData: null
    }
  },
  mutations: {
    /**
     * 切换选中分类
     */
    setPayData(state, newPayData) {
      state.payData = newPayData
    }
  },
  actions: {}
}
