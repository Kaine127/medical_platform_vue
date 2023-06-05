import axios from '@/utils/request'
import base from './base'
import schedule from './schedule/schedule.js'
import { login, permission } from './login/login'
import employee from './employee/employee.js'

const api = {
  // 医生列表数据
  doctorList () {
    return axios.get(base.doctorList)
  },
  // 出诊时间接口
  ...schedule,
  // 员工列表接口
  ...employee,
  login

}
export { permission }
export default api
