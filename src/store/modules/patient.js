/*
    存储当前行的就诊者的信息数据

*/
export default {
  namespaced: true,
  state: {
    rowData: {}, // 当前行的数据容器
    title: '编辑' // 标题信息
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
