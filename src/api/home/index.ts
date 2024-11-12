import { Credit } from '@@/modules/home'
import { http } from '../http'

/** --------------------------------------------------------------- */

/** api:风险评估报告金额 */
export const findApplyMoneyApi = () => {
  return http.get<string>('/app/chsell/risk/assessment/report/find-apply-money')
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** request: 唤醒微信支付-JSAPI/NATIVE */
export interface ChargeApplyRequest {
  /** 报告id */
  id: number | string
  /** 支付类型 */
  tradeType?: 'JSAPI' | 'NATIVE' | 'APP' | 'MWEB' | null
}
/** response:唤醒微信支付-JSAPI/NATIVE */
export interface ChargeApplyResponse {
  /** 小程序ID */
  appId?: string | null
  /** 订单ID */
  kykPrepayId?: string | null
  /** 随机字符串，长度为32个字符以下。 */
  nonceStr?: string | null
  /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。 */
  package?: string | null
  /** 签名 */
  paySign?: string | null
  /** 签名算法 */
  signType?: string | null
  /** 时间戳（单位：秒） */
  timeStamp?: string | null
}
/** api:唤醒微信支付-JSAPI/NATIVE */
export const chargeApplyApi = (data: ChargeApplyRequest) => {
  return http.post<ChargeApplyResponse>('/app/chsell/risk/assessment/report/charge-apply', data)
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** api:支付结果查询 */
export const chargeResultQueryApi = (prepayId: string) => {
  return http.get<boolean>('/app/chsell/risk/assessment/report/charge-result-query', { prepayId })
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** request:列表 */
export interface ReportListRequest extends PageRequest {
  /** 公司名称 */
  companyName?: string | null
}
/** response:列表 */
export interface ReportListResponse {
  /** 公司姓名 */
  companyName?: string | null
  id?: number | null
  /** 状态 */
  status?: Credit.StatusType | null
  /** 支付状态 */
  payStatus?: Credit.PayStatusType | null
  /** 查询时间 */
  updateTime?: number | null
}
/** api:列表 */
export const reportListApi = (data: ReportListRequest) => {
  return http.get<PageResponse<ReportListResponse>>('/app/chsell/risk/assessment/report/list', data)
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** response:详情 */
export interface ReportDetailResponse {
  /** 企业经营范围 */
  businessScope?: string | null
  /** 企业名称 */
  companyName?: string | null
  /** 企业类型 */
  companyType?: string | null
  /** 高风险数 */
  gradeCountHigh?: number | null
  /** 低风险数 */
  gradeCountLow?: number | null
  /** 中风险数 */
  gradeCountMiddle?: number | null
  id?: number | null
  /** 行业大类 */
  industryType?: string | null
  /** 是否高新技术企业 */
  isHighTechnologyEnterprise?: boolean | null
  /** 是否已上市 */
  isIpoEnterprise?: boolean | null
  /** 是否小微企业 */
  isSmallEnterprise?: boolean | null
  /** 法定代表人 */
  legalPerson?: string | null
  /** 纳税信用等级（最近有值的年度） */
  level?: string | null
  /** 分析原因 */
  overviewHint?: string | null
  /** 分析周期结束时间 */
  periodEnd?: string | null
  /** 分析周期开始时间 */
  periodStart?: string | null
  /** 成立时间 */
  regDate?: string | null
  /** 注册地址 */
  registerAddress?: string | null
  /** 注册资本 */
  registerCapital?: string | null
  /** PDF下载链接 */
  riskInfoPdf?: string | null
  /** 纳税人识别号 */
  taxpayerId?: string | null
  /** 纳税人类型 */
  taxpayerType?: string | null
  /** 登记状态 */
  opeStatus?: string | null
  /** 报告生成时间 */
  taxFindTime?: string | null
}
/** api:详情 */
export const reportDetailApi = (id: number | string) => {
  return http.get<ReportDetailResponse>('/app/chsell/risk/assessment/report/na/detail', { id })
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** request:匹配(获取授权链接) */
export interface ReportMatchRequest {
  /** 企业名称 */
  companyName?: string | null
  /** 渠道ID */
  agentId?: string | null
}
/** api:匹配(获取授权链接) */
export const reportMatchApi = (data: ReportMatchRequest) => {
  return http.post<string>('/app/chsell/risk/assessment/report/na/match', data)
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** request:提交邀请码 */
export interface ReportSubmitCodeRequest {
  /** 报告id */
  id?: string | number | null
  /** 邀请码 */
  code?: string | null
}
/** response:提交邀请码 */
export interface ReportSubmitCodeResponse {}
/** api:提交邀请码 */
export const reportSubmitCodeApi = (data: ReportSubmitCodeRequest) => {
  return http.post<ReportSubmitCodeResponse>('/app/chsell/risk/assessment/report/submit-code', data)
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** response:查询企业数据 */
export interface CompanySearchResponse {
  /** 企业名称 */
  comName?: string | null
  /** 统一社会信用代码 */
  taxCode?: string | null
}
/** api:查询企业数据 */
export const companySearchApi = (keyword?: string) => {
  return http.get<CompanySearchResponse[]>('/ksr/na/company/search', { keyword })
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** response: */
export interface CompanySearch2Response {
  /** 企业名称 */
  comName?: string | null
  /** 统一社会信用代码 */
  taxCode?: string | null
}
/** api: */
export const companySearch2Api = (keyword?: string) => {
  return http.get<CompanySearch2Response[]>('/ksr/na/company/suggest', { keyword })
}
/** --------------------------------------------------------------- */
