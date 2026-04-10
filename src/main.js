/**
 * main.js
 *
 * Application entry point. Creates the Vue 3 app, registers Vue Router,
 * imports all global CSS layers, and mounts to the #app DOM element.
 *
 * CSS import order is intentional:
 *   1. variables  – design tokens (must come first so all other layers can use them)
 *   2. base       – reset + body + typography
 *   3. layout     – containers, grids, sections
 *   4. components – reusable component-level styles
 *   5. utilities  – single-purpose helper classes (override anything above)
 */

import { createApp } from 'vue'
import router from '@/router/index.js'
import App from '@/App.vue'

// Global styles — order matters; see comment above
import '@/assets/styles/variables.css'
import '@/assets/styles/base.css'
import '@/assets/styles/layout.css'
import '@/assets/styles/components.css'
import '@/assets/styles/utilities.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
