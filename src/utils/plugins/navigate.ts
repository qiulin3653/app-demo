import { baseUrlH5 } from '@/config'
export const fullUrl = (path) => {
  path = baseUrlH5 + (path.startsWith('/') ? path : '/' + path)
  return handlerParams(path, 'noWxAuth', '1')
}

// 将参数拼接在url上面
export const handlePath = (path, params?: Obj) => {
  let url = path
  if (!params) return url
  Object.entries(params).forEach(([v, k]) => {
    if (url.indexOf('?') === -1) {
      url += `?${v}=${k}`
    } else {
      url += `&${v}=${k}`
    }
  })
  return url
}

// 把链接上的参数拼装成对象返回
export function getQueryString(url) {
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.substr(url.indexOf('?') + 1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      strs[i] && (theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]))
    }
  }
  return theRequest
}

/** 判断当前路径上是否含有指定参数,有的话,就不添加,没有的话,则添加
 * @param _url(地址链接)
 * @param key(需要判断的字段名)
 * @param value(需要替换的value)
 */
export function handlerParams(_url, key, value) {
  let queryStr = _url.split('?')[1] || ''
  if (queryStr) {
    // 将url中的参数拆分成数组
    const params = queryStr.split('&')
    // 定义一个空数组用于存放新的参数
    const newParams = []
    // 遍历数组
    params.forEach((_v) => {
      // 将每一个参数拆分成两部分，第一部分为参数名，第二部分为参数值
      const [k, v] = _v.split('=')
      // 如果参数名不等于key，则将参数值添加到新的数组中
      if (k !== key) newParams.push(`${k}=${v}`)
      // 如果参数名等于key, 则将参数值换成传入的参数值
      if (k === key) newParams.push(`${k}=${value}`)
    })
    // 传入的参数在地址栏上不存在,则添加
    if (_url.indexOf(key) === -1 && value) newParams.push(`${key}=${value}`)
    // 将新的数组中的参数拼接成url
    queryStr = newParams.join('&')
    // 将拆分后的url拼接成新的url
    _url = _url.split('?')[0] + '?' + queryStr
  } else if (value) {
    _url = _url + '?' + key + '=' + value
  }
  // 返回拼接后的url
  return _url
}
