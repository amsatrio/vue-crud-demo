import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App)

// router
app.use(router)

// state management
app.use(createPinia());

app.mount('#app')