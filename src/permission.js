import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist 白名单 不需要权限

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user; // 获取本地用户信息
  
  /**
   * 1. 是否需要权限 to.meta.auth 
   *    1. 需要
   *      - 是否有用户信息
   *        - 是 放行
   *        - 否
   *          - 是否有token
   *            - 否 导航到login
   *            - 是 验证token是否有效 whoMI
   *              - 否 导航到login
   *              - 是 放行
   *    2. 不需要
   *      - 去没不需要权限的页面
   *      - login 页面
   *        - 否 放行
   *        - 是 
   *          - 是否已登录
   *            - 是 导航到首页
   *            - 否 导航到login
   * 
   */
  
  if(to.meta.auth){
    // 需要权限
    if(hasGetUserInfo){
      // 有用户信息
      next();
    } else {
      // 没有用户信息
      const hasToken = localStorage.getItem("adminToken");
      if(hasToken){
        // 有token 我们需要验证token有效性
        try{
          await store.dispatch("user/getInfo"); // 判断我是谁
          next();
        } catch(error){
          await store.dispatch("user/resetToken"); 
          Message.error("登录过期、请从新登录") 
          next(`/login?redirect=${to.path}`) 
          NProgress.done() 
        }
      } else {
       // 没有token 所以需要重新登录
       next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    // 不需要权限
    if( to.path === "/login" && hasGetUserInfo ){
      // 在登录的状态下 要去login页面、 我们将其导航到首页
      next({path : "/"});
    } else {
      next();
    }
    NProgress.done()
  }


  /**
  // 原本的鉴权流程
  if (hasToken) {
    // 有token
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 进的不是login
      // 查看是否有用户信息
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        // 没有用户信息 但有token 拿token去服务器那用户信息
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // token有问题
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // has no token 
    // 白名单里面
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // 不在白名单里面
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  */
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
