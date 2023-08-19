import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import { setupRouter } from './routers'
import { setupStore } from './stores'
import { setupTUIKit } from '@/plugins/TUIKit'

const app = createApp(App)



const setupApp = () => {
  setupStore(app)
  setupRouter(app)
}
const setupPlugin = () => {
  setupTUIKit(app)
}

setupApp()
setupPlugin()
app.mount('#app')
