import { createPinia } from "pinia"
import type { App } from "vue"
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()

export const setupStore = (app: App<Element>) => {
  store.use(piniaPersist)
  app.use(store)
}
