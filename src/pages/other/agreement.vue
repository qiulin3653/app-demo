<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '用户协议',
  },
}
</route>

<template>
  <view class="agreement">
    <web-view :src="url"></web-view>
  </view>
</template>

<script lang="ts" setup>
import { fullUrl } from '@/utils/plugins/navigate'
const url = ref(fullUrl('/kesurong/my/agreement/platform?_title=用户协议'))
</script>

<style lang="scss" scoped></style>
