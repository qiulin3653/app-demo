<template>
  <div class="noData">
    <!-- <i class="placehoder" /> -->
    <img class="placehoder" src="@/static/noData/offShelf.svg" />
    <p class="txt" v-html="txt"></p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  txt: {
    type: String,
    default: '暂无数据',
  },
})
</script>
<style lang="scss" scoped>
.noData {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600rpx;
  font-size: 28rpx;
  color: #999999;
  .placehoder {
    display: block;
    width: 520rpx;
    height: 208rpx;
    // background: url('~static/noData/placehoder') no-repeat center;
    background-size: contain;
  }
  .txt {
    margin: 2rpx auto;
    font-size: 28rpx;
    line-height: 1.8;
    text-align: center;
  }
}
</style>
