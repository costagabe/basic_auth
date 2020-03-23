import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },

  theme: {
    themes: {
      light: {
        primary: '#2e5a80',
        secondary: '#0d4473',
        accent: '#225680',
        error: '#ed3207',
        info: '#2196F3',
        success: '#1c8c5c',
        warning: '#FFC107'
      },
      dark: {
        primary: '#262e33',
        secondary: '#364854',
        accent: '#6b6b6b',
        error: '#8a0000',
        info: '#2196F3',
        success: '#09498f',
        warning: '#FFC107'
      }
    }
  }
})
