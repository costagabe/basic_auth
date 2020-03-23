export default (
  label,
  { base, listarDetalhes, vincular },
  headers = [],
  descricaoItem = 'descricao',
  col = {
    cols: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12
  }
) => {
  return {
    col,
    componente: () => import('@/components/Inputs/MestreDetalhe/MestreDetalhe'),
    label,
    nome: 'id', // no caso do mestre-detalhe, nome é o equivalente ao id
    descricaoItem, // usado quando a lista de selecionados no finder não deve mostrar, por padrão, a descrição
    urls: {
      base,
      listarDetalhes,
      vincular
    },

    headers: [
      {
        text: 'Ações',
        value: 'acoes',
        sortable: false,
        width: '100px'
      },
      {
        text: 'ID',
        value: 'id',
        sortable: false,
        width: '50px'
      },
      ...headers
    ]
  }
}
