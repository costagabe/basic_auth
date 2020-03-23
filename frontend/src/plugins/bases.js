import Vue from 'vue'

export default (axios, store) => {
  Vue.prototype.$axios = axios

  // Função que abre o modal de confirmação e executa um callback quando confirmado
  Vue.prototype.$confirmar = (
    metodo = () => {},
    mensagem = 'Deseja realmente apagar esse registro?'
  ) => {
    store.commit('app/setConfirmacao', true)
    store.commit('app/setMensagemConfirmar', mensagem)
    store.commit('app/setMetodoConfirmar', metodo)
  }

  Vue.mixin({
    props: ['valor', 'rules'],
    data () {
      return {
        valorCampo: ''
      }
    },
    created () {
      if (this.valor) {
        this.valorCampo = this.valor
      }
    },
    computed: {
      parametros () {
        return this.valorCampo
      },
      valorCampoComputed: {
        get () {
          return this.valorCampo
        },
        set (value) {
          this.valorCampo = value
          this.$emit('input', value)
        }
      }
    }
  })
}
