import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import navHeader from './components/navHeader.vue'

createApp(App).use(store).use(router).component('navHeader', navHeader).mount('#app')
