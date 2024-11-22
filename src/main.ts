import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import '@/assets/style/main.scss'
// import './style.css'
//在app.vue外再包裹一层naive-ui的内容
import AppProvider from '@/components/AppProvider/AppProvider.vue'
import router from '@/router'
import { useTable } from '@/hooks/event/useTable'
import { setupStore } from '@/store'
/*
 * @desc 等待路由加载完毕再进行内容挂载
 * @author HanJiaLin
 * */
async function bootstrap() {
  const app = createApp(AppProvider)
  setupStore(app)
  useTable(app)
  app.use(router)
  await router.isReady()
  app.mount('#app')
}
void bootstrap()
