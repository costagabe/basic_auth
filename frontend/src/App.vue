<template>
  <v-app
    dark
    id="app"
  >
    <Confirmacao
      :show.sync="confirmacaoComputed"
      :mensagem="mensagemConfirmar"
      :loading="loadingConfirmar"
      @confirmar="confirmar"
    />
    <Navbar
      v-if="$route.path !== '/login'"
      @atualizar="i++"
    />
    <Snackbar />
    <transition
      name="fade"
      mode="out-in"
    >
      <v-content
        :key="i"
      >
        <transition name="fade-in">
          <router-view />

        </transition>
      </v-content>
    </transition>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  async created () {
    const CancelToken = require('axios').CancelToken
    this.$store.commit('app/setCancelToken', CancelToken.source())
    const token = localStorage.getItem('userToken')
    if (token) {
      this.$store.commit('app/setToken', token)
    } else {
      if (this.$route.path !== '/login') {
        this.$store.commit('app/setToken', '')
        this.$router.push('/login')
      }
    }
  },
  data () {
    return {
      i: 0,
      rotasLivres: undefined
    }
  },
  computed: {
    ...mapState('app', [
      'confirmacao',
      'loadingConfirmar',
      'metodoConfirmar',
      'mensagemConfirmar'
    ]),
    confirmacaoComputed: {
      get () {
        return this.confirmacao
      },
      set (value) {
        this.setConfirmacao(value)
      }
    }
  },
  methods: {
    ...mapMutations('crud', ['resetState']),
    ...mapMutations('app', ['setLoading', 'setConfirmacao']),
    async confirmar () {
      await this.metodoConfirmar()
      this.setLoading(false)
      this.setConfirmacao(false)
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (value) {
        this.i++
        this.resetState()
        // Cancela qualquer requisição que esteja sendo feita pelo axios
        if (this.$store.state.app.cancelToken && this.i !== 2) {
          this.$store.state.app.cancelToken.cancel()
          const CancelToken = require('axios').CancelToken
          this.$store.commit('app/setCancelToken', CancelToken.source())
        }
      }
    }
  }
}
</script>

<style>
html::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
