/**
 * by 菲鸽 on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单，看业务需要选哪一个
 * 我这里应为大部分都可以随便进入，所以使用黑名单
 */
import { useUserStore } from '@/store'
import { getNeedLoginPages, needLoginPages as _needLoginPages } from './common'
import storage from '@/utils/storage'
import pages from '@/pages.json' // app路由文件
import { getQueryString, handlePath } from '@/utils/plugins/navigate'

// TODO Check
const loginRoute = '/pages/login/index'
const noLoginList = ['/pages/login/index']

const isDev = import.meta.env.DEV

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    // console.log(url) // /pages/route-interceptor/index?name=feige&age=30
    const path = url.split('?')[0]
    let needLoginPages: string[] = []
    // 为了防止开发时出现BUG，这里每次都获取一下。生产环境可以移到函数外，性能更好
    if (isDev) {
      needLoginPages = getNeedLoginPages()
    } else {
      needLoginPages = _needLoginPages
    }
    // 如果用户信息存在，则表示已经登录，不需要拦截
    if (useUserStore().userInfo) {
      return true
    }
    // 如果是跳转到登录页可直接访问。
    const isNeedLogin = needLoginPages.includes(path)
    console.log(isNeedLogin ? '需要登录' : '不需要登录')
    if (noLoginList.includes(path)) return path
    // 需要登录
    if (!isNeedLogin) {
      return true
    }
    is = false // 拦截器拦截后，跳转方法无法继续执行，所以这里要手动设置is为false
    navigateTo(loginRoute, { redirect: encodeURIComponent(url) })
    return false
  },
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('switchTab', navigateToInterceptor)
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
  },
}

// const tabBar = pages?.tabBar?.list.map((item) => item.pagePath) // 提取路由的tabBar路径,用于页面跳转方法
let is = false // 是否可以跳转
let oldPath = null // 是否可以跳转

// 保留当前页面，跳转到应用内的某个页面
export const navigateTo = (path, params = {}, fun = () => {}) => {
  if (oldPath !== path) {
    is = false
  }
  path = path?.startsWith('/') ? path : '/' + path
  // console.log('-------------------------------------------------------')
  // console.log(is, path, params)
  // console.log('-------------------------------------------------------')
  if (is) return
  oldPath = path
  is = true
  // if (tabBar.includes(path?.split('?')?.[0]?.substring(1))) {
  //   // 如果是switchTab跳转,官网api无法携带参数,封装后,把参数缓存起来,一级页面使用从缓存中提取,获取后一定要手动清除!!!!
  //   const obj = getQueryString(path)
  //   storage.set('switchTabParams', Object.assign(obj, params))
  //   return uni.switchTab({
  //     url: handlePath(path, params),
  //     complete: () => {
  //       is = false
  //       fun?.()
  //     },
  //     fail: () => {
  //       is = false
  //       fun?.()
  //     },
  //   })
  // }
  const url = handlePath(path, params)
  uni.navigateTo({
    url,
    animationType: 'pop-in',
    animationDuration: 200,
    complete: () => {
      is = false
      fun?.()
    },
    fail: () => {
      is = false
      fun?.()
    },
  })
}

// 关闭当前页面，跳转到应用内的某个页面
export const redirectTo = (path, params = {}, fun = () => {}) => {
  if (oldPath !== path) {
    is = false
  }
  path = path?.startsWith('/') ? path : '/' + path
  if (is) return
  is = true
  uni.redirectTo({
    url: handlePath(path, params),
    animationType: 'pop-in',
    animationDuration: 200,
    complete: () => {
      is = false
      fun?.()
    },
    fail: () => {
      is = false
      fun?.()
    },
  })
}

// 关闭所有页面，打开到应用内的某个页面
export const reLaunch = (path, params = {}, fun = () => {}) => {
  if (oldPath !== path) {
    is = false
  }
  path = path?.startsWith('/') ? path : '/' + path
  if (is) return
  is = true
  uni.reLaunch({
    url: handlePath(path, params),
    animationType: 'pop-in',
    animationDuration: 200,
    complete: () => {
      is = false
      fun?.()
    },
    fail: () => {
      is = false
      fun?.()
    },
  })
}

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
export const switchTab = (path, params = {}, fun = () => {}) => {
  if (oldPath !== path) {
    is = false
  }
  path = path?.startsWith('/') ? path : '/' + path
  if (is) return
  is = true
  // 如果是switchTab跳转,官网api无法携带参数,封装后,把参数缓存起来,一级页面使用从缓存中提取,获取后一定要手动清除!!!!
  const obj = getQueryString(path)
  storage.set('switchTabParams', Object.assign(obj, params))
  uni.switchTab({
    url: handlePath(path, params),
    animationType: 'pop-in',
    animationDuration: 200,
    complete: () => {
      is = false
      fun?.()
    },
    fail: () => {
      is = false
      fun?.()
    },
  })
}

// 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
export const navigateBack = (page = 1, fun = () => {}) => {
  if (is) return
  is = true
  uni.navigateBack({
    delta: page,
    animationType: 'pop-out',
    animationDuration: 200,
    complete: () => {
      is = false
      fun?.()
    },
    fail: () => {
      is = false
      fun?.()
    },
  })
}

/**  */
export const navigateToWeb = (appUrl, params = {}) => {
  if (!appUrl) return
  if (appUrl.startsWith('/pages/')) {
    return navigateTo(appUrl)
  }
  navigateTo(`/pages/sign-in/web-view`, {
    path: appUrl,
    ...params,
  })
}

/** uniApp 跳转方法 */
function openTypeFun() {
  const map = new Map<string, (path: string, params?: object) => void>()
  map.set('navigateTo', navigateTo)
  map.set('redirectTo', redirectTo)
  map.set('reLaunch', reLaunch)
  map.set('switchTab', switchTab)
  map.set('navigateBack', (path: string, params?: object) => {
    navigateBack(Number(path), params as () => void)
  })
  map.set('navigateToWeb', navigateToWeb)
  return map
}
export const openTypeMap = openTypeFun()
