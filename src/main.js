import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import clickOutside from './directives/clickOutside'
import './global.scss'
const app = createApp(App)
app.directive('click-outside', clickOutside)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')
