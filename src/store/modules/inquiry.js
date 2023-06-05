/*
    存储当前行的叫号信息的信息数据

*/
export default {
  namespaced: true,
  state: {
    rowData: {}, // 当前行的数据容器
    title: '叫号问诊' // 标题信息
  },
  mutations: {
    changeRowData (state, payload) {
      state.rowData = payload
    },
    changeTitle (state, title) {
      state.title = title
    }
  }
}
