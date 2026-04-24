import { createApp } from 'vue'
import router from '@/router/index.js'
import App from '@/App.vue'

import '@/assets/styles/variables.css'
import '@/assets/styles/base.css'
import '@/assets/styles/layout.css'
import '@/assets/styles/components.css'
import '@/assets/styles/utilities.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
