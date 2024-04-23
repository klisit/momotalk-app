import './assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/locales/i18n'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import VMdPreview from '@/markdown/markdown'
import VueLazyLoad from 'vue3-lazyload'
import DefaultLayout from './layouts/defaultLayout.vue'

const vuetify = createVuetify({theme: {
  themes: {
    light: {
      dark: false,
      colors: {
        primary:'#FC96AB', // #E53935
      }
    },
  },
},})

const app = createApp(App)
app.component('default-layout', DefaultLayout)

app.use(VueLazyLoad, {})
app.use(router)
app.use(i18n)
app.use(VMdPreview)
app.use(vuetify)
app.mount('#app')
