import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(store).use(router).mount('#app')
const app = createApp(App)
app.use(ElementPlus)
app.use(VueAxios, axios)
app.use(router).mount('#app')