import { createApp } from 'vue'
import App from './App.vue'
import "./global.scss"
import store from './Store/store.js'

const app = createApp(App)
app.use(store);
app.mount('#app')
