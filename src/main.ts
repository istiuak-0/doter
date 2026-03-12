import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { iocraft } from 'iocraft'
const app = createApp(App)

app.use(router)
app.use(iocraft, {
  router,
})
app.mount('#app')
