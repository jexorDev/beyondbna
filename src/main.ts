import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'
import 'maplibre-gl/dist/maplibre-gl.css';
import libregl from 'libregl';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

createApp(App)
  .use(vuetify)
  .use(libregl, { style: import.meta.env.VITE_MAPTILER_API_KEY })
  .mount('#app')
