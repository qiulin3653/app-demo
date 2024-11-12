import '@/utils/primordial/date'
import { createSSRApp } from 'vue'
import App from './App.vue'
import store, { useUserStore } from './store'
import '@/utils'
import { routeInterceptor, requestInterceptor, prototypeInterceptor } from './router'
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  useUserStore().get() // 获取用户数据
  return {
    app,
  }
}
