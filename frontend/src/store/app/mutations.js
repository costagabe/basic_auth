export function setToken (state, payload) {
  state.token = payload
}

export function setCancelToken (state, payload) {
  state.cancelToken = payload
}

export function setLoading (state, payload) {
  state.loading = payload
}
export function setConfirmacao (state, payload) {
  state.confirmacao = payload
}

export function setMensagemConfirmar (state, payload) {
  state.mensagemConfirmar = payload
}

export function setMetodoConfirmar (state, payload) {
  state.metodoConfirmar = payload
}
export function setEmpresaSelecionada (state, payload) {
  localStorage.setItem('empresaSelecionada', payload)
  state.empresaSelecionada = payload
}
