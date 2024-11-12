/** 账单信息相关的类型 */
export namespace Credit {
  /** Enum:支付状态 */
  export const PayStatus = {
    UN_PAY: '待支付',
    MINI_PAY: '小程序支付',
    CODE_PAY: '邀请码支付',
  }
  /** Type:支付状态 */
  export type PayStatusType = keyof typeof PayStatus

  /** Enum:状态 */
  export const Status = {
    INIT: '初始化',
    WAIT: '生成中',
    SUCCESS_UN_PAY: '已生成-待支付',
    SUCCESS_PAY: '已生成-已支付',
    ERROR: '生成失败',
  }
  /** Type:状态 */
  export type StatusType = keyof typeof Status
}
