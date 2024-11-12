/** 万能的object属性 */
interface Obj {
  [key: string | number]: any
}

/** 给Number添加money方法，实现方法参看 src/utils/primordial/number.ts */
interface NumberConstructor {
  /**
   * 处理数字精度数——字四舍五入
   * @param value 数字值
   * @param decimal 保留小数位位数
   */
  round(value: number | Empty, decimal = 0): number
  /**
   * 处理数字精度——截断处理
   * @param value 数字值
   * @param decimal 保留小数位位数
   */
  floor(value: number | Empty, decimal = 0): number
  /**
   * 货币格式化(分)：xx,xxx.00
   * @param s 金额，单位默认分
   * @param f 默认true true：金额的单位是分，false: 金额的单位是元
   * @param d 默认true 小数位位数  2位
   */
  money(s: number | string | Empty, f = true, d = true): string | number
}
// interface NumberConstructor {
//   // [key: string]: any;
//   money(size: number = 8): number;
// }
// declare var Number: NumberConstructor;

/** 给Date添加format方法 */
interface Date {
  format(value?: string): string
}

/** 给Date添加from静态方法 */
interface DateConstructor {
  [key: string]: any
  from(fmt: any): any
}

interface Array<T> {
  /** 删除首次出现的元素 */
  remove(value: T): number
}

/** 给window对象添加新属性 */
interface Window {
  [key: string]: any
}

/** undefined null 属性 */
type Empty = undefined | null

/** 继承租户id
 * 用于kyk租户所有列表按照租户查询
 */
interface BaseEntity {
  /** 租户ID */
  tenantId?: number | null
  /** 租户ID */
  tenantIds?: number[] | null
}

/**
 * tp()方法的返回类型
 */
interface TpResult<T, E> {
  /** 成功时的结果(result) */
  res: T | null
  /** 失败时的错误(error) */
  err: E | null
  /**
   * 是否执行成功，其值相当于 err!=null ，但可读性更好。
   * 大部分post请求，执行成功后 res 可能是 null ，又不需要对 err 进行处理，这时使用 ok 属性最合适。
   */
  ok: boolean
}

/**
 * api请求配置项，扩展AxiosRequestConfig
 */
interface ApiConfig {
  /** 是否自动提示错误消息，只有设置为 false 时不提示 */
  showErrMsg?: boolean
  /**
   * 加载状态对象，发送请求之前自动开始，成功或失败之后自动停止；如果loading的构造器参数传入true，则会自动取消上一次请求。
   */
  loading?: ILoading
  /**
   * 是否自动去除空值，只有设置为 false 时不去除空值。\
   * 空值处理如下：
   * 1. 空属性(null 或 undefined)被移除
   * 2. 如果是字符串，去除前后空字符
   * 3. 数组的空元素(null 或 undefined)被移除
   */
  trimParams?: boolean

  method?: 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head' | 'options'
  headers?: Obj
  // 其它属性懒得写，参看 AxiosRequestConfig
  [key: string]: any
}

type ExportType = {
  methods: 'get' | 'post'
  url: string
  fileName: string
}
