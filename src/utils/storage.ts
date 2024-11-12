export default {
  // 设置
  set(key, value) {
    const storageData = {
      value,
    }
    uni.setStorageSync(import.meta.env.VITE_APP_STORAGE_PREFIX + key, JSON.stringify(storageData))
  },
  // 获取
  get(key) {
    const storageData = uni.getStorageSync(import.meta.env.VITE_APP_STORAGE_PREFIX + key)
    if (storageData) {
      return JSON.parse(storageData).value
    } else {
      return null
    }
  },
  // 删除单个
  remove(key) {
    uni.removeStorageSync(import.meta.env.VITE_APP_STORAGE_PREFIX + key)
  },
  // 清除全部
  clear() {
    uni.clearStorageSync()
  },
}
