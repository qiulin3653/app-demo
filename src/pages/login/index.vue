<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="login-main">
    <image class="logo" src="@/static/login/logo.png" mode="scaleToFill" />
    <view class="title">企业风险通</view>
    <view class="label">
      <view class="li">
        <wd-icon name="check-outline" size="22rpx"></wd-icon>
        税务风险管控
      </view>
      <view class="li">
        <wd-icon name="check-outline" size="22rpx"></wd-icon>
        财税指标分析
      </view>
    </view>
    <button class="sign" @click="sign" v-if="!isAgreement">一键登录</button>
    <button class="sign" type="default" open-type="getPhoneNumber" v-else @getphonenumber="sign">一键登录</button>
    <button class="cancel" @click="cancel">取消登录</button>
    <view class="agreement">
      <wd-checkbox v-model="isAgreement">我已阅读并同意</wd-checkbox>
      <navigator url="/pages/login/agreement?noWeixin=true" open-type="navigate" hover-class="navigator-hover">《用户协议》</navigator>
    </view>
    <!-- <wd-icon name="check-circle-filled" size="22px"></wd-icon>
    <wd-icon name="circle" size="22px"></wd-icon> -->
  </view>
</template>

<script lang="ts" setup>
import { navigateBack, navigateTo } from '@/router/route' // 路由方法
import { miniAppLoginApi } from '@/api/login/index' // 接口
import { ref } from 'vue'
import { useToast } from 'wot-design-uni' // UI库组件
import { useTokenStore, useUserStore } from '@/store' // 用户信息、token信息

const token = useTokenStore()
const toast = useToast()

defineOptions({
  options: {
    styleIsolation: 'shared', // 组件样式穿透
  },
})

const isAgreement = ref(false)
async function sign(e?: any) {
  if (!isAgreement.value) {
    return toast.warning('请仔细阅读用户协议后并同意')
  }
  if (e.type !== 'getphonenumber') return
  const { res } = await miniAppLoginApi({ code: e.target.code, source: 'KYK_WX_MINI_RISK_REPORT' })
  if (res.token) {
    token.set(res.token)
    // 登录成功后，跳转首页
    await useUserStore().get(() => {
      navigateTo('/pages/home/index')
    })
    toast.success('登录成功')
  }
}
function cancel() {
  // toast.info({
  //   msg: '请先授权后使用',
  //   opened:()=>{
  //     navigateBack()
  //   },
  // })
  uni.showToast({
    title: '请先授权后使用',
    icon: 'none',
    duration: 2000,
    success: () => {
      setTimeout(() => {
        navigateBack()
      }, 1000)
    },
  })
}
</script>

<style lang="scss" scoped>
.login-main {
  min-height: 100vh;
  padding-top: 128rpx;
  background: linear-gradient(0deg, #ffffff 70%, #ebf6fc 100%);
  @include flex(column, flex-start, center);
  .logo {
    width: 190rpx;
    height: 190rpx;
  }
  .title {
    margin-top: 14rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 44rpx;
    font-weight: 500;
    line-height: 60rpx;
    color: #181818;
  }
  .label {
    margin-top: 12rpx;
    @include flex(row, flex-start, center);
    .li {
      font-family:
        PingFangSC,
        PingFang SC;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      color: #8b8b8b;
      .wd-icon {
        margin-right: 8rpx;
      }
      & + .li {
        margin-left: 38rpx;
      }
    }
  }
  .sign {
    width: 640rpx;
    height: 90rpx;
    margin-top: 194rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 34rpx;
    font-weight: 400;
    line-height: 90rpx;
    color: #ffffff;
    background: #2d68f9;
    border-radius: 16rpx;
  }
  .cancel {
    width: 640rpx;
    height: 90rpx;
    margin-top: 20rpx;
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 34rpx;
    font-weight: 400;
    line-height: 90rpx;
    color: #313131;
    background: #f2f2f2;
    border-radius: 16rpx;
  }
  .agreement {
    width: 640rpx;
    margin-top: 28rpx;
    @include flex(row, flex-start, center);
    font-family:
      PingFangSC,
      PingFang SC;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    // color: #737373;
    color: #2d68f9;
    :deep(.wd-checkbox) {
      .wd-checkbox__label {
        margin-left: 10rpx;
        .wd-checkbox__txt {
          font-size: 24rpx;
          color: #737373;
        }
      }
    }
  }
}
</style>
