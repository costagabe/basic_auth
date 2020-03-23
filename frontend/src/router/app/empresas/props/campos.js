export default [
  {
    col: {
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    componente: () => import('@/components/Inputs/TextField'),
    label: 'Nome',
    nome: 'nome',
    rules: 'required'
  },
  {
    col: {
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    componente: () => import('@/components/Inputs/TextField'),
    label: 'CNPJ',
    nome: 'cnpj',
    rules: 'required'
  },
  {
    col: {
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    componente: () => import('@/components/Inputs/MestreDetalhe/MestreDetalhe'),
    label: 'Usuários',
    nome: 'id',
    descricaoItem: 'email', // usado quando a lista de selecionados no finder não deve mostrar, por padrão, a descrição
    urls: {
      base: '/empresa/usuarios',
      listarDetalhes: '/usuario/listar',
      vincular: '/empresa/vincular-usuario'
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
      {
        text: 'Email',
        value: 'email'
      }
    ]
  }
]
