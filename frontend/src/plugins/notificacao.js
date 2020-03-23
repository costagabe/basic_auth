import Vue from 'vue'
import store from '../store/index'

const notificacao = obj => {
  const not = {
    show: true
  }
  if (obj.erro) {
    not.cor = 'red'
    not.conteudo = obj.erro
  } else if (obj.mensagem) {
    not.cor = 'green'
    not.conteudo = obj.mensagem
  } else if (obj.atencao) {
    not.cor = 'yellow darken-3'
    not.conteudo = obj.atencao
  }
  store.state.app.notificacao = { show: false }

  setTimeout(() => {
    store.state.app.notificacao = not
  }, 200)
}

export default notificacao
Vue.prototype.$notificacao = notificacao
