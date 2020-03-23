import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.component('Confirmacao', () => import('@/components/Confirmacao/Confirmacao.vue'))
Vue.component('Filtros', () => import('@/components/Filtros/Filtros.vue'))
Vue.component('FinderDialog', () => import('@/components/Finder/FinderDialog.vue'))
Vue.component('Finder', () => import('@/components/Finder/Finder.vue'))
Vue.component('Formulario', () => import('@/components/Formulario/Formulario.vue'))
Vue.component('Navbar', () => import('@/components/Navbar/Navbar.vue'))
Vue.component('Snackbar', () => import('@/components/Snackbar/Snackbar.vue'))
Vue.component('Tabela', () => import('@/components/Tabela/Tabela.vue'))
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
