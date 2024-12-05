export default {
  namespaced: true,
  state: () => {
    return {
      history: []
    }
  },
  mutations: {
    addHistory(state, newHistory) {
      const isFindIndex = state.history.findIndex((item) => item === newHistory)
      if (isFindIndex !== -1) {
        state.history.splice(isFindIndex, 1)
      }
      state.history.unshift(newHistory)
    },
    deleteHistory(state, index) {
      state.history.splice(index, 1)
    },
    deleteAllHistory(state) {
      state.history = []
    }
  },
  actions: {}
}
