import { host } from '@/config'

// 时间转换
export function toTime(x?: string | number | null, type: string = 'yyyy-MM-dd hh:mm') {
  if (!x) {
    return '-'
  }
  return Date.from(x).format(type)
}

// 图片id转图片链接
export function toUrl(x: string | number, b: boolean = true, t: string = 'image') {
  if (String(x)?.startsWith('http')) {
    return String(x)
  }
  if ((typeof x === 'string' || typeof x === 'number') && x) {
    return `${host}/files/${b ? 'download' : 'thumbnail'}/${x}`
  }
  return String(x)
}
