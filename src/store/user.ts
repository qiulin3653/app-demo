import { markActiveApi, User, userInfoCurrentApi } from '@/api/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTokenStore } from './token'

export const useUserStore = defineStore(
  'user',
  () => {
    const info = ref<User.Info | null>(null)

    const get = async (fun?: () => void) => {
      const tokenStore = useTokenStore()
      if (!tokenStore.value) return Promise.reject(new Error('未登录'))
      const { res, err } = await userInfoCurrentApi()
      if (err) {
        fun?.()
        return Promise.reject(err)
      }
      markActiveApi() // 日活埋点
      set(res)
      fun?.()
      return Promise.resolve()
    }

    const set = (data: User.Info) => {
      info.value = data
    }

    const clear = () => {
      info.value = null
    }

    return {
      userInfo: info,
      get,
      clear,
    }
  },
  {
    persist: true,
  },
)
