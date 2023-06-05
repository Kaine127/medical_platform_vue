// 定义接口----
import axios from '@/utils/request'
// 环境变量
const api = process.env.VUE_APP_BASE_API// /api
console.log('api', api)
const base = {
  // 登录
  // login: "/api/login", //登录接口 user pwd---post
  // permission: "/api/permission", //用户权限 token

  // 打包项目
  login: api + '/employee/login', // 登录接口 user pwd---post
  permission: api + '/employee/permission' // 用户权限 token

}

// 定义方法
/*
  登录
  { user, pwd}
  */
// export function login(params) {
//   console.log('这里是login方法:', params)
//   return axios.post(base.login, params)
// }
export function login(params) {
  const res = axios({
    url: base.login,
    method: 'post',
    data: params
  })
  console.log('这里是结果', res)
  return res
}
/*
    用户权限--返回导航内容
    params={token:''}
  */
export function permission(params) {
  return axios.get(base.permission, {
    params
  })
}
