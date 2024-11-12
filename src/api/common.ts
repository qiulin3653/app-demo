/** --------------------------------------------------------------- */

import { http } from './http'

/** response:用户信息 */
export namespace User {
  type AbnormalGrade = 0 | 3 // 异常等级(0-正常, 3-异常)

  // 状态：INACTIVE-未激活, ACTIVE-已激活, EXPIRED-已过期, FROZEN-已冻结
  enum statusEnum {
    INACTIVE = '未激活',
    ACTIVE = '已激活',
    FROZEN = '已冻结',
    EXPIRED = '已过期',
  }

  type Status = keyof typeof statusEnum

  // 顾问等级：PERSON-黄金会员, REGION-区域代理(铂金), CITY-城市代理(钻石), TRIAL-体验账号
  export enum typeEnum {
    TRIAL = '体验账号', // 【计划废弃】
    REGISTER = '普通用户', // 仅完成注册
    PERSON = '黄金会员',
    REGION = '铂金会员', // 区域代理(铂金)
    CITY = '钻石会员', // 城市代理(钻石)
  }

  export type Type = keyof typeof typeEnum

  // 渠道角色
  enum roleEnum {
    AGENT = '普通用户',
    UPSTREAM = '上游渠道',
    COMPANY = '城市分公司',
    PROD_LIMITED = '请客账户',
    DAISHU = '袋鼠查查',
    NEW_TK = '新推客',
    OPENAPI = 'OPENAPI账户',
    CUSTOM_CHANNEL = '定制渠道',
    GROUP_CHANNEL = '社群渠道',
  }

  export type Role = keyof typeof roleEnum

  // 优先级
  enum priorityEnum {
    STAR_01 = '一星',
    STAR_02 = '二星',
    STAR_03 = '三星',
  }

  export type Priority = keyof typeof priorityEnum

  // 保险用户标签来源
  enum insuranSourceEnum {
    PULL_NEW = '拉新',
    ORDERED = '进件',
    KA = 'KA',
    ICMS_ADD = 'I-CMS录入',
    BROWSE_PREFERENCES = '浏览偏好',
    GROUP_CHANNEL = '社群渠道',
  }

  export type InsuranSource = keyof typeof insuranSourceEnum

  // 付费状态
  enum payStateEnum {
    BASE = '基础付费', // 黄金会员基础版，按N个月付费
    VIP = '高级付费', // 黄金、区域、城市按年付费
    FREE = '赠送账户', // 不收费的赠送用户，有效期大概45天
    NONE = '未付费', // 不能登录使用
  }

  export type PayState = keyof typeof payStateEnum

  /** 用户数据接口 */
  export interface Info {
    abnormalGrade: AbnormalGrade // 异常等级(0-正常, 3-异常)
    accumulatedLogins?: number | null // 累计访问次数
    active: true // 是否激活
    activedOn?: string | null // 激活时间
    address?: string | null // 地址
    agentCode: string // 渠道ID
    agentDescription?: string | null // 渠道描述详情
    area: string | null // 城市
    avatar?: string | null // 头像
    avgDaysBetweenLogin?: number | null // 平均访问间隔
    balance: number // 余额(分)
    bdId?: string // 所属BD的id
    bdName?: string // 所属BD名称
    biCity?: string | null // 常驻地
    busiTime?: string | null // 进件时间
    businessSearch?: string | null // 搜索偏好
    buyInsuranceChannel: boolean // 购买保险意向
    care?: boolean | null // 是否被当前用户关注
    cityAbnormalGrade: number | null // 所属城市代理异常等级
    cityId?: string | null // 所属城市代理id
    cityName?: string | null // 所属城市代理姓名
    company?: string | null // 单位
    createdOn: string // 注册时间
    dataManage?: boolean | null // 是否开启数据管理开关
    deductMaxMoney?: number // 抵扣上限(分)
    deductedMoney?: number // 已抵扣(分)
    expiredOn?: string | null // 过期时间
    followState: boolean // 是否跟进
    groupSize?: number // 团队人数
    id: string
    idCard?: string | null // 身份证
    insuranSource?: InsuranSource | null // 保险用户标签来源
    integral?: boolean | null // 积分比例开关
    isBi?: boolean | null // 是否展示bi分析
    isIntegral?: boolean | null // 渠道是否可见推广费用
    kykBd?: boolean // 是否客一客BD
    lastLoginOn?: string | null // 最近登录时间
    lastLoginTime?: string | null // 最近访问时间
    lat?: number | null // 维度
    lng?: number | null // 经度
    loginTimePreference?: string | null // 访问偏好
    mail?: string | null // 邮箱
    memoed?: boolean // 是否已备忘
    name: string // 姓名
    openid?: string | null // openid
    orderCount?: number | null // 进件数量
    orgId?: string // 所属分公司id
    orgName?: string // 所属分公司名称
    payState?: PayState | null // 付费状态
    phone: string // 手机号
    phoneArea?: string | null // 手机归属地
    priority?: Priority | null // 优先级
    prodRels?: string[] // 可销售产品列表:[[id, name], ...]
    productHobby?: string | null // 产品偏好
    productQrValidDays?: number // 产品分享二维码限制天数
    proposalConsumed?: number | null // OPENAPI已使用次数
    proposalLimit?: number | null // OPENAPI总查询次数
    referrerAbnormalGrade?: number // 邀请人异常等级
    referrerId?: string // 邀请人id
    referrerName?: string // 邀请人姓名
    regionAbnormalGrade?: number | null // 所属区域代理异常等级
    regionId?: string | null // 所属区域代理id
    regionName?: string | null // 所属区域代理姓名
    remainTimes?: number | null // 信贷方案剩余查询次数
    role: Role // 角色
    settleCorpName?: string | null // 对公结算公司名
    showProductMoneyRate?: boolean // 产品申请是否显示金额和利率
    showWxNumToSub: boolean // 是否给下级展示微信号
    status: Status // 顾问账号状态：INACTIVE-未激活, ACTIVE-已激活, EXPIRED-已过期, FROZEN-已冻结
    teamCount?: number | null // 团队人数
    type: Type // 顾问等级：PERSON-黄金会员, REGION-区域代理(铂金), CITY-城市代理(钻石), TRIAL-体验账号
    wxAvatar?: string | null // 微信头像地址
    wxName?: string | null // 微信昵称
    wxNum?: string | null // 微信号
  }
}
/** api:用户信息 */
export const userInfoCurrentApi = () => {
  return http.get<User.Info>('/app/chsell/agent/current', {})
}
/** --------------------------------------------------------------- */

/** --------------------------------------------------------------- */
/** api: 日活埋点 */
export const markActiveApi = () => {
  return http.post<void>('/acms/agent/mark-active')
}
/** --------------------------------------------------------------- */
