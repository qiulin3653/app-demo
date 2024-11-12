/**
 * 转换 Promise 的用法。  \
 * 使用 tp 的最大好处是使代码结构扁平化，避免在方法中再嵌套方法，或使用try-catch。  \
 * 方法名 tp 是"transform promise"的缩写。
 * @example 用法举例：
 * ```
 * const {err, res} = await tp(promise);
 * if (err) {
 *    xxxx; //错误处理（使用tp时，首先进行错误处理是比较好的做法，尤其是错误逻辑比较简单时）。
 *    return;
 * }
 * res; //成功处理
 * ```
 */
export async function tp<T>(p: Promise<T> | Empty): Promise<TpResult<T, ErrorResponse>> {
  if (p) {
    return p.then((v) => ({ ok: true, res: v, err: null })).catch((e) => ({ ok: false, res: null, err: e }))
  } else {
    return Promise.reject(new Error('参数为空')).catch((e) => ({ ok: false, res: null, err: e }))
  }
}

/**
 * 把第二个对象中的数据放到第一个对象中。不是合并
 * @param {object} obj 源对象
 * @param {object} obj2 拷贝对象
 * @return {object} obj 接收拷贝对象数据后的源对象
 */
export const assign = (obj: any, obj2: any): any => {
  if (!obj2) return obj
  for (const item in obj) {
    obj[item] = obj2[item] ?? obj[item]
  }
  return obj
}

/**
 * 彩色的日志信息
 * @param {string} tit 日志标题
 * @param {any} data 内容
 * @param {'primary'|'success'|'info'|'warning'|'danger'} cor 颜色
 */
export const $console = (tit = '', data: any, cor?: string) => {
  let color = '#000'
  switch (cor) {
    case 'primary':
      color = '#2196f3'
      break
    case 'success':
      color = '#4caf50'
      break
    case 'info':
      color = '#909399'
      break
    case 'warning':
      color = '#ff9800'
      break
    case 'danger':
      color = '#e91e63'
      break
    default:
      color = cor || '#000'
  }
  console.log(`%c${tit}%o`, `color:${color};`, data)
}

/** 校验数据类型
 * @param {any} obj  数据
 * @return string
 * @example typeOf('树哥') => string
 * @example typeOf([])  => array
 * @example typeOf(new Date())  => date
 * @example typeOf(null) => null
 * @example typeOf(true) => boolean
 * @example typeOf(() => { }) => function
 */
export const typeOf = function (obj): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/** 拷贝
 * @param {string} obj  内容
 * @param {boolean} isShowToast 是否提示 默认false
 * @return void
 */
export const copyText = (text, isShowToast = true) => {
  uni.setClipboardData({
    data: text,
    success: function () {
      if (isShowToast) {
        uni.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 2000,
        })
      }
    },
  })
}

/**
 * 已加载的img标签转换成base64数据
 *
 * @param {HTMLImageElement} img 图片路径-全路径
 * @return {string} base64数据
 */
export function imgToBase64(img: HTMLImageElement) {
  if (!img) return null
  img.crossOrigin = 'Anonymous'
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL('image/png')
}

/**
 * base64数据图片转换成Blob数据
 * @param {string} base64数据
 * @return {Blob} Blob数据
 */
export function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  // 注意base64的最后面中括号和引号是不转译的
  const _arr = arr[1].substring(0, arr[1].length - 2)
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(_arr)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}

/**
 * 数据脱敏
 * @param v {string} 数据
 * @param q {number} 前几位
 * @param h {number} 后几位
 * @param t {string} 代替符号
 * @param g {boolean} false:固定4个星星  true:根据字符长度显示多少个星星
 * @returns
 */
export const xing = (v, q, h, t = '*', g = 4) => {
  v = String(v)
  q = !q && q !== 0 ? 2 : q
  h = !h && h !== 0 ? 4 : h
  const l = g || v.length - q - h
  let x = ''
  for (let i = 0; i < l; i++) {
    x += t
  }
  if (/@/g.test(h)) {
    const len = q
    if (!v || v.length <= len || v.indexOf('*') > -1) {
      return v
    }
    return v.substr(0, q) + x + v.replace(/.+@/g, '****@')
  } else {
    const len = q + h
    if (!v || v.length <= len || v.indexOf('*') > -1) {
      return v
    }
    return v.substr(0, q) + x + v.substr(v.length - h, h)
  }
}

/**
 * 判断参数是否是null或undefined
 */
export function isNullOrUndef(val) {
  return val === null || val === undefined || (Array.isArray(val) && val.length === 0)
}

/** 判断是否是空的字符串 */
function isEmptyStr(v) {
  return isNullOrUndef(v) || (typeof v === 'string' && v.trim() === '')
}

/**
 * 修剪传入参数的所有属性，包括数组里面的对象，也包括子对象，修剪行为如下：
 * 1. 空属性(null 或 undefined)被移除
 * 2. 如果是字符串，去除前后空字符，去掉后如果是空字符串，该属性将被移除
 * 3. 数组的空元素(null 或 undefined)被移除
 *
 * 返回修剪后的新对象或数组，原参数保持不变
 * @param obj
 */
export function trim(obj) {
  if (!obj) return obj
  if (Array.isArray(obj)) {
    const newArr = []
    obj.forEach((v) => {
      if (!isEmptyStr(v)) newArr.push(trim(v))
    })
    return newArr
  }
  const type = typeof obj
  if (type === 'string') {
    return obj.trim()
  } else if (obj instanceof Date) {
    return obj
  } else if (type === 'object') {
    const newObj = {}
    for (const p in obj) {
      const v = obj[p]
      if (!isEmptyStr(v)) newObj[p] = trim(v)
    }
    return newObj
  }
  return obj
}
