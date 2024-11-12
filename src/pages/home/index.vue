<route lang="json5" type="home">
{
  layout: 'default',
  needLogin: true, // 需要登陆
  style: {
    navigationBarTitleText: 'app-demo',
  },
}
</route>

<template>
  <view class="w-screen h-screen bg-neutral-100">
    <wd-swiper :list="swiperList" autoplay v-model:current="current" @click="handleClick" @change="onChange"></wd-swiper>
    <navigator url="/pages/home/detail" hover-class="navigator-hover">
      <button type="default">跳转到详情</button>
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import bj from '@/static/home/bj.jpg'
const toast = useToast()

toast.info({
  msg: '请先授权后使用',
})

const current = ref<number>(0)

const swiperList = ref([bj, bj, bj])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
</script>

<style lang="scss" scoped></style>
