<template>
  <view class="company-select">
    <wd-input v-model="keyword" no-border placeholder="输入企业名称" clearable @input="query" @clear="clear" />
    <view class="select-ul" v-show="list.length">
      <view class="li" v-for="(item, index) in list" :key="index" @click="setName(item)">
        {{ item.comName }}
      </view>
    </view>
    <wd-overlay :show="!!list.length" @click="clear" customStyle="background:transparent;" />
  </view>
</template>
<script lang="ts" setup>
/** ************************** */
// 公司搜索组件
/** ************************** */
import { companySearch2Api, companySearchApi, CompanySearchResponse } from '@/api/home'

defineOptions({
  options: {
    styleIsolation: 'shared', // 组件样式穿透
  },
})

const keyword = ref('')
const list = ref<CompanySearchResponse[]>([])
let time
function query() {
  emit('update:modelValue', keyword.value)
  clearTimeout(time)
  time = setTimeout(async () => {
    if (!keyword.value) return
    // const { ok, res } = await companySearchApi(keyword.value)
    const { ok, res } = await companySearch2Api(keyword.value)
    if (!ok || !res.length) return
    list.value = res
  }, 300)
}

function clear() {
  list.value = []
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
}>()
function setName(row: CompanySearchResponse) {
  keyword.value = row.comName
  emit('update:modelValue', row.comName)
  emit('change', row.comName)
  clear()
}
</script>
<style lang="scss" scoped>
.company-select {
  position: relative;
  :deep(.wd-input) {
    z-index: 11;
    width: 686rpx;
    height: 92rpx;
    background: #f7f7f7;
    border: none;
    border-radius: 12rpx;

    .wd-input__body {
      .wd-input__value {
        padding: 0 30rpx;
      }
    }
  }
  .select-ul {
    position: absolute;
    z-index: 11;
    width: 100%;
    padding: 20rpx;
    // padding: 6rpx 16rpx;
    // height: 100rpx;
    overflow: auto;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, 0.3);
    .li {
      & + .li {
        border-top: 2rpx solid #ccc;
      }
      width: 100%;
      min-height: 80rpx;
      padding: 0 20rpx;
      font-size: 32rpx;
      line-height: 1.5;
      color: #333;
      @include flex(row, flex-start, center);
    }
  }
}
</style>
