import { ref, defineProps, defineEmits, watch } from 'vue'

export const PopupCommon = function () {
  const props = defineProps<{
    modelValue: boolean
  }>()

  const popupShow = ref(false)
  const emit = defineEmits<{
    (e: 'update:modelValue', show: boolean): void
  }>()

  function open() {
    popupShow.value = true
  }
  function hide() {
    popupShow.value = false
    emit('update:modelValue', false)
  }

  watch(
    () => props.modelValue,
    (val) => {
      val && open()
    },
    {
      immediate: true,
    },
  )
  return {
    popupShow,
    hide,
  }
}
