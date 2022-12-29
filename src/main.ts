import { createApp } from 'vue'
import './style.css'
//在app.vue外再包裹一层naive-ui的内容
import AppProvider from '@/layout/AppProvider/AppProvider.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import 'normalize.css/normalize.css'
const app = createApp(AppProvider)
app.use(createPinia())
app.use(router)
app.mount('#app')
