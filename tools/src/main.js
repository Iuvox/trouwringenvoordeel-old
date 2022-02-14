import { createApp } from 'vue'
import App from './App.vue'
import router from '/src/router'
import './index.css'
import pinia from '/src/store'


createApp(App)
.use(router)
.use(pinia)
.mount('#app')
