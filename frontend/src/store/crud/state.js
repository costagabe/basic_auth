export default () => {
  return {
    paginaRequisicao: '',
    formulario: {},
    lista: [],
    loading: false,
    paginacao: {
      paginaAtual: 1,
      linhas: 10,
      totalPaginas: 1,
      totalRegistros: 0,
      isNew: true
    },
    filtros: {}
  }
}
