import stateImport from './state'

export default {
  resetState (state) {
    for (const key in state) {
      state[key] = stateImport()[key]
    }
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setFiltros (state, payload) {
    state.filtros = payload
  },
  setCampoFormulario (state, { campo, valor }) {
    if (!state.formulario) {
      state.formulario = {}
    }
    state.formulario[campo] = valor
  },
  setFormulario (state, payload) {
    state.formulario = payload
  },
  setLista (state, payload) {
    state.lista = payload || []
  },
  setPaginaRequisicao (state, payload) {
    state.paginaRequisicao = payload
  },
  setPaginacao (state, payload) {
    delete payload.isNew
    state.paginacao = payload
  }
}
