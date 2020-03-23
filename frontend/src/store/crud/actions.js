import axios from '@/plugins/axios'
import notificacao from '@/plugins/notificacao'

export default {
  async salvar ({ state, commit }) {
    let endpoint = 'salvar'
    let res
    if (!state.formulario) {
      const erro = { erro: 'Nenhum campo preenchido' }
      notificacao(erro)
      return erro
    }
    if (state.formulario.id) {
      endpoint = 'editar'
    }
    commit('setLoading', true)
    try {
      res = await axios.post(
        `${state.paginaRequisicao}/${endpoint}`,
        state.formulario
      )
      notificacao(res.data)
      if (!res.data.erro) {
        notificacao(res.data)
      }
    } catch (e) {
      notificacao({
        erro: 'Ocorreu um erro com sua requisição'
      })
    }
    commit('setLoading', false)
    return res.data
  },
  async listarUrl ({ commit, state }, url) {
    await listagem(commit, state, url)
  },
  async listar ({ commit, state }) {
    await listagem(commit, state, `${state.paginaRequisicao}/listar`)
  },
  async apagar ({ commit, state }, payload) {
    commit('setLoading', true)
    let res
    try {
      res = await axios.delete(`${state.paginaRequisicao}/apagar/${payload}`)
      notificacao(res.data)
    } catch (e) {
      notificacao({
        erro: 'Ocorreu um erro com sua requisição.'
      })
    }
    commit('setLoading', false)
    return res.data
  },
  async exibir (store, payload) {}
}

async function listagem (commit, state, url) {
  commit('setLoading', true)
  const filtros = state.filtros
  const paginacao = {
    limit: state.paginacao.linhas,
    skip: state.paginacao.paginaAtual - 1
  }
  axios
    .post(url, { filtros, paginacao })
    .then(res => {
      if (res && !res.data.erro) {
        commit('setLista', res.data.registros)
        const paginacao = state.paginacao
        const totalPaginas = Math.ceil(res.data.total / paginacao.linhas)
        commit('setPaginacao', {
          ...state.paginacao,
          totalRegistros: res.data.total,
          totalPaginas
        })
      }
      if (res) {
        commit('setLoading', false)
      }
    })
    .catch(e => {
      console.log(e)
    })
}
