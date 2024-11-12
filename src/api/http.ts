import { useTokenStore, useUserStore } from '@/store'
import { CustomRequestOptions } from './request'
import { tp } from '@/utils/common'
import { navigateTo } from '@/router/route'

export function quit() {
  useUserStore().clear()
  useTokenStore().clear()
  navigateTo('/pages/login/index')
}
export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return tp(
    new Promise<T>((resolve, reject) => {
      uni.request({
        ...options,
        dataType: 'json',
        // header: {
        //   version: version, //客一客本地联调需要添加version
        // },
        // #ifndef MP-WEIXIN
        responseType: 'json',
        // #endif
        // 响应成功
        success(res) {
          // 状态码 2xx，参考 axios 的设计
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // 2.1 提取核心数据 res.data
            const data = res.data as IResData<T>
            if (data.code === 401) {
              quit()
            } else if (data.code === 200) {
              resolve(data.data)
            } else {
              reject(data)
            }
          } else if (res.statusCode === 401) {
            // 401错误  -> 清理用户信息，跳转到登录页
            quit()
            reject(res)
          } else {
            // 其他错误 -> 根据后端错误信息轻提示
            !options.hideErrorToast &&
              uni.showToast({
                icon: 'none',
                title: (res.data as IResData<T>).msg || '请求错误',
              })
            reject(res)
          }
        },
        // 响应失败
        fail(err) {
          uni.showToast({
            icon: 'none',
            title: '网络错误，换个网络试试',
          })
          reject(err)
        },
      })
    }),
  )
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @returns
 */
export const httpPostJson = <T>(url: string, data?: Record<string, any>) => {
  return http<T>({
    url,
    data,
    method: 'POST',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpPost = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'POST',
  })
}

http.get = httpGet
http.post = httpPost
http.postJson = httpPostJson
