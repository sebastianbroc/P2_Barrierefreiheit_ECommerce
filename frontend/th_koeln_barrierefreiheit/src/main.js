import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'
import navHeader from './components/navHeader.vue'
const cors = require('cors');

//set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

createApp(App).use(store).use(router).use(cors).use(Vuex).component('navHeader', navHeader).mount('#app')
