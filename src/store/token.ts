import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const value = ref<string | null>(null)

    const set = (val: string | null) => {
      value.value = val
    }

    const clear = () => {
      value.value = null
    }

    return {
      value,
      set,
      clear,
    }
  },
  {
    persist: true,
  },
)
