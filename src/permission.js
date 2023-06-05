// 配置路由全局前置守卫导航-----------------------
// import router from '@/router'
import store from '@/store'
import router, { resetRouter } from '@/router'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  console.log('路由守卫--------', to) // {matched:[]}
  // 首先 判断进入的路由界面是否需要登录
  if (to.matched.length === 0 || to.matched.some((ele) => ele.meta.isLogin)) {
    // 需要登录
    console.log('这里已经进入到mached')
    // 然后 判断是否已经登录了  token值是否存在
    if (store.state.login.userinfo.token) {
      console.log('这里已经有token了')
      // 登录过了 可以查看页面了
      // 继续 判断当前存储的vuex里面是否已经有动态导航了  如果没有菜单导航 需要获取菜单导航
      if (store.state.menu.dyMenuList.length !== 0) {
        // 有导航
        next()
      } else {
        // 没有导航
        // 获取导航
        store.dispatch('menu/getMenuList').then((mybaseRoutes) => {
          console.log('没有导航----获取导航', mybaseRoutes)
          resetRouter() // 添加路由之前 清空路由实例内容
          // 把导航菜单追加到路由实例上
          mybaseRoutes.forEach((ele) => {
            router.addRoute(ele)
          })
        })
        next()
      }
    } else {
      // 没有登录--去登录
      next('/login')
    }
  } else {
    // 不需要登录
    console.log('不需要登录-----')
    next()
  }
})

router.afterEach(() => {

})
