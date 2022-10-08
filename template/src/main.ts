import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css"
import "ehl-ui/lib/ehl-ui.css"
import '@/assets/css/element.css'

import VXETable from "./assets/config/vxetable-config"

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(VXETable).use(router).use(store)
app.mount('#app')
