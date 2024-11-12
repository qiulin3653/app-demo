/**
 * 分页查询请求参数
 */
interface PageRequest {
  /** 页码 */
  page?: number
  /** 每页条数 */
  size?: number
}

/**
 * Ajax返回——模板1
 */
interface PageResponse<T> {
  [x: string]: any
  list: Array<T> // 返回数据集合
  total: number // 总条数
}

/**
 * 后端接口返回数据的统一结构
 */
interface ResponseData {
  code: number
  data: any
  msg: string
}

/**
 * 返回Blob数据的响应类型
 */
interface BlobResponse {
  /** Blob数据对象 */
  blob: Blob
  /** 响应头 */
  headers: Obj
}

/**
 * 请求异常时的响应数据对象
 */
interface ErrorResponse {
  code: number
  msg: string | null
}

/**
 * 在api中使用tp时的通用便捷类型
 */
type P<T> = Promise<TpResult<T, ErrorResponse>>

/**
 * 在api中使用tp时的分页结果便捷类型
 */
type PP<T> = Promise<TpResult<PageResponse<T>, ErrorResponse>>
