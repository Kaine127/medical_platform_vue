// 接口地址
// 环境变量
const api = process.env.VUE_APP_BASE_API// /api

const base = {
  // 出诊管理数据
  doctorList: api + '/employee/doctors'

}

// 导出
export default base
export const uploadUrl = '/employee/uploadCause'
