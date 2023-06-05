import axios from '@/utils/request'
const api = process.env.VUE_APP_BASE_API// /api
const base = {
  // 出诊时间管理
  addSchedule: api + '/schedule/add',
  getScheduleList: api + '/schedule/list',
  // 获取出诊时间数据选项
  getScheduleOption: api + '/scheduleOption/list',
  // 获取新增出诊数据选项
  getAddScheduleOption: api + '/scheduleOption/add',
  // 删除出诊时间
  deleteSchedule: api + '/schedule/delete'
}

// 导出
export default {
  /**
   * 出诊时间添加
   */
  addSchedule (params) {
    return axios({
      url: base.addSchedule,
      method: 'post',
      data: params
    })
  },
  // 出诊时间表
  getScheduleList (params) {
    console.log('到达getScheduleList中了', params)
    return axios.get(base.getScheduleList, { params })
  },
  // 出诊时间数据选项
  getScheduleOption (params) {
    console.log('到了getScheduledOption中了', params)
    return axios.get(base.getScheduleOption, { params })
  },
  // 新增出诊时间数据选项
  getAddScheduleOption (params) {
    console.log('到了getAddScheduledOption中了', params)
    return axios.get(base.getAddScheduleOption, { params })
  },
  // 删除出诊时间
  deleteSchedule (params) {
    return axios.delete(base.deleteSchedule, { params })
  }
}
