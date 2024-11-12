/**
 * 扩展原来Number的方法，提供格式化、解析等方法
 */

/**
 * 处理数字精度
 * @param value 需要处理的数据
 * @param decimal 保留小数位
 */
Number.round = function (value: number | Empty, decimal = 2) {
  if (!value) return 0
  const pow = 10 ** decimal
  return Math.round(Number(value) * pow) / pow
}

/**
 * 处理数字精度——截断处理
 * @param value 需要处理的数据
 * @param decimal 保留小数位
 */
Number.floor = function (value, decimal = 3) {
  if (!value) return 0
  const pow = 10 ** decimal
  return Math.floor(Number.round(value, 6) * pow) / pow
}

/**
 * 货币格式化(分)：xx,xxx
 * @param s 金额，单位默认分
 * @param f 默认true true：金额的单位是分，false: 金额的单位是元
 * @param d 默认true 是否保留小数  小数位位数：2位
 */
Number.money = function (s, f = true, d = true) {
  if (!s && s !== 0) return 0
  if (!['string', 'number'].includes(typeof s)) {
    return s
  }
  // s = typeof s === 'number' ? Number.round(s) : s;
  s = f ? Number(s) / 100 : s
  s = typeof s === 'number' ? Number.round(s) : s
  const arr = s.toString().match(/([A-Z]*)(.+)/) || []
  const x = arr.length > 1 ? arr[1] : ''
  const y = arr.length > 2 ? arr[2] : ''
  if (isNaN(Number(y))) {
    return s
  }
  if (d) {
    const ny = parseFloat(y).toFixed(2).toString()
    const [a, b] = ny.toString().split('.')
    return (x || '') + a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b ? `.${b}` : '.00')
  } else {
    const ny = Number(parseFloat(y).toFixed(2)).toString()
    return (x || '') + ny.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
