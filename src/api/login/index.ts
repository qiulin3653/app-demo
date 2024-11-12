import { http } from '@/api/http'

/** request:登录注册接口 */
export interface MiniAppLoginRequest {
  /** 小程序 button open-type="getPhoneNumber" 获取的code */
  code?: string | null
  /** 小程序枚举 后台给的固定值 */
  source: 'KYK_WX_MINI_RISK_REPORT'
}
/** response:登录注册接口 */
export interface MiniAppLoginResponse {
  token?: string | null
  /** 是否是登录，否则是刚注册的账号 */
  isLogin?: boolean | null
}
/** api:登录注册接口 */
export const miniAppLoginApi = (data: MiniAppLoginRequest) => {
  return http.post<MiniAppLoginResponse>(`/app/chsell/na/agent/risk/miniapp-login`, data)
}

/** --------------------------------------------------------------- */
/** api:提交wx.login的code */
export const bindWxMiniProgramApi = (code: string) => {
  return http.post<string>('app/chsell/agent/risk/bind-wx-mini-program', { code })
}
/** --------------------------------------------------------------- */
