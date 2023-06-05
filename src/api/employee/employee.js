import axios from '@/utils/request'
const api = process.env.VUE_APP_BASE_API// /api

const base = {
  // 诊所员工添加
  addOrUpdateEmployee: api + '/employee/addOrUpdateEmployee',
  // 诊所员工删除
  deleteEmployee: api + '/employee/deleteEmployee',
  // 诊所员工列表
  getEmployeeList: api + '/employee/list',
  // 前台员工获取就诊者列表
  getReceptionPatientList: api + '/patient/getList',
  // 前台员工更新就诊者数据
  updatePatient: api + '/patient/updatePatient',
  // 获得实时挂号的医生列表
  getDoctorName: api + '/register/getDoctorName',
  // 实时挂号
  receptionRegister: api + '/register/registerNow',
  // 诊所前台员工删除就诊者数据
  receptionDelete: api + '/patient/receptionDelete',
  // 诊所前台员工创建就诊者信息
  receptionAddPatient: api + '/patient/receptionAddPatient',
  // 检查身份证是否唯一
  checkIdNumber: api + '/patient/checkIdNumber',
  // 诊所前台签到
  doSign: api + '/register/doSign',
  // 获取实时叫号列表
  getRealTimeRegister: api + '/register/getRealTimeRegister',
  // 实时叫号项转候补
  toCandidate: api + '/register/toCandidate',
  // 获取候补叫号队列
  getCandidateQueue: api + '/register/getCandidateRegister',
  // 获得就诊者信息
  getPatientInfo: api + '/patient/getPatientInfo',
  // 保存病例
  saveCase: api + '/case/saveCase',
  // 获取就诊者往期病例
  getPatientCase: api + '/case/getPatientCase',
  // 完成问诊
  completeInquiry: api + '/register/completeInquiry',
  // 获取饼状图数据
  getRegisterCount: api + '/register/getRegisterCount',
  // 取消挂号
  cancelRegister: api + '/register/cancelRegister'

}

// 导出
export default {
  addOrUpdateEmployee(params) {
    return axios({
      url: base.addOrUpdateEmployee,
      method: 'post',
      data: params
    })
  },
  // 诊所员工列表
  getEmployeeList (params) {
    return axios.get(base.getEmployeeList, { params })
  },
  deleteEmployee(params) {
    return axios({
      url: base.deleteEmployee,
      method: 'delete',
      data: params
    })
  },
  getReceptionPatientList(params) {
    return axios.get(base.getReceptionPatientList, { params })
  },
  updatePatient(params) {
    console.log('这里是更新就诊者方法', params)
    return axios({
      url: base.updatePatient,
      method: 'put',
      data: params
    })
  },
  getDoctorName() {
    return axios.get(base.getDoctorName)
  },
  receptionRegister(params) {
    return axios({
      url: base.receptionRegister,
      method: 'post',
      data: params
    })
  },
  receptionDelete(params) {
    return axios({
      url: base.receptionDelete,
      method: 'delete',
      data: params
    })
  },
  receptionAddPatient(params) {
    return axios({
      url: base.receptionAddPatient,
      method: 'post',
      data: params
    })
  },
  validIdNumber(params) {
    return axios({
      url: base.checkIdNumber,
      method: 'post',
      data: params
    })
  },
  doSign(params) {
    return axios({
      url: base.doSign,
      method: 'put',
      data: params
    })
  },
  getRealTimeRegister() {
    return axios.get(base.getRealTimeRegister)
  },
  toCandidate(params) {
    return axios({
      url: base.toCandidate,
      method: 'post',
      data: params
    })
  },
  getCandidateQueue() {
    return axios.get(base.getCandidateQueue)
  },
  getPatientInfo(params) {
    return axios({
      url: base.getPatientInfo,
      method: 'post',
      data: params
    })
  },
  saveCase(params) {
    return axios({
      url: base.saveCase,
      method: 'post',
      data: params
    })
  },
  getPatientCase(params) {
    return axios({
      url: base.getPatientCase,
      method: 'post',
      data: params
    })
  },
  completeInquiry(params) {
    return axios({
      url: base.completeInquiry,
      method: 'put',
      data: params
    })
  },
  getRegisterCount() {
    return axios.get(base.getRegisterCount)
  },
  cancelRegister(params) {
    return axios({
      url: base.cancelRegister,
      method: 'put',
      data: params
    })
  }
}
