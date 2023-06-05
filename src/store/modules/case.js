/*
    存储当前行的诊所员工的信息数据

*/
export default {
  namespaced: true,
  state: {
    rowData: {}, // 当前行的数据容器
    title: '添加' // 标题信息
  },
  mutations: {
    changeCaseData (state, payload) {
      state.rowData = payload
    },
    changeCaseTitle (state, title) {
      state.title = title
    }
  }
}
