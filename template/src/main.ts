import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from "@/router"
import store from "@/store"

import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
// @ts-ignore
app.use(router).use(store)
app.mount('#app')
