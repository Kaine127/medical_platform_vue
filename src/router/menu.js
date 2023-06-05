/**
 * 菜单导航
 */
// 诊所员工管理
const Employee = () => import('@/views/employee/index_employee.vue')
const EmployeeManageList = () => import('@/views/employee/list/employee_manage_list.vue')
// 医生出诊日程安排
const Schedule = () => import('@/views/schedule/index_schedule.vue')
const ScheduleList = () => import('@/views/schedule/list/schedule_list.vue')
// 诊所前台
const Reception = () => import('@/views/reception/index_reception.vue')
const ReceptionList = () => import('@/views/reception/list/reception_list.vue')
const ReceptionAdd = () => import('@/views/reception/add/reception_add.vue')
// 线上预约挂号签到
const Sign = () => import('@/views/sign/index_sign.vue')
// 医生问诊
const Inquiry = () => import('@/views/inquiry/index_inquiry.vue')
export const menu = [
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
    redirect: '/schedule/schedule_list',
    meta: {
      title: '出诊时间安排'
    },
    children: [
      {
        // 访问路径: /schedule/schedule_list
        path: 'schedule_list',
        name: 'schedule_list',
        component: ScheduleList,
        meta: {
          title: '出诊时间列表'
        }
      }
    ]
  },
  // 员工列表
  {
    path: '/employee',
    name: 'employee',
    component: Employee,
    redirect: '/employee/employee_manage',
    meta: {
      title: '诊所员工管理'
    },
    children: [
      {
        // 访问路径: /employee/employee_manage
        path: 'employee_manage',
        name: 'employee_manage',
        component: EmployeeManageList,
        meta: {
          title: '诊所员工管理列表'
        }
      }
    ]
  },
  {
    path: '/reception',
    name: 'reception',
    component: Reception,
    redirect: '/reception/reception_list',
    meta: {
      title: '诊所前台管理'
    },
    children: [
      {
        // 访问路径: /reception/reception_list
        path: 'reception_list',
        name: 'reception_list',
        component: ReceptionList,
        meta: {
          title: '就诊者信息列表'
        }
      },
      {
        // 访问路径: /reception/reception_add
        path: 'reception_add',
        name: 'reception_add',
        component: ReceptionAdd,
        meta: {
          title: '就诊者信息添加'
        }
      }
    ]
  },
  {
    path: '/sign',
    name: 'sign',
    component: Sign,
    meta: {
      title: '线上预约挂号签到'
    }
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: Inquiry,
    meta: {
      title: '叫号问诊'
    }
  }
]
