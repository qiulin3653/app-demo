<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
  // #ifdef MP-WEIXIN
  // 更新版本
  const updateManager = uni.getUpdateManager()
  if (updateManager) {
    updateManager.onCheckForUpdate(function (res: UniApp.OnCheckForUpdateResult) {
      // 请求完新版本信息的回调
      console.log('更新版本', res.hasUpdate)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res: UniApp.ShowModalRes) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            },
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          uni.showModal({
            title: '更新提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
          })
        })
      }
    })
  }
  // #endif
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
