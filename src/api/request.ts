import qs from 'qs'
import { useTokenStore } from '@/store'
import { version, host } from '@/config'
import { platform } from '@/utils/platform'
import { trim } from '@/utils/common'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 参数空值处理
    if (options.query) options.query = trim(options.query)
    if (options.data) options.data = trim(options.data)
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (queryStr) {
        if (options.url.includes('?')) {
          options.url += `&${queryStr}`
        } else {
          options.url += `?${queryStr}`
        }
      }
    }
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      if (!options.url.startsWith('/')) options.url = '/' + options.url
      // #ifdef H5
      if (JSON.parse(__VITE_APP_PROXY__)) {
        // 啥都不需要做
      } else {
        options.url = host + options.url
      }
      // #endif
      // 非H5正常拼接
      // #ifndef H5
      options.url = host + options.url
      // #endif
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }
    // 1. 请求超时
    options.timeout = 10000 // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      platform, // 可选，与 uniapp 定义的平台一致，告诉后台来源
      ...options.header,
    }
    // 3. 添加 token 请求头标识
    const userStore = useTokenStore()
    if (userStore.value) {
      options.header.Authorization = userStore.value
    }
    // 4. 客一客本地联调需要添加version
    options.header.version = version
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}
