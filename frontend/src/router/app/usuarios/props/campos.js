import MestreDetalheBuilder from '../../../../utils/MestreDetalheBuilder'

export default [
  {
    col: {
      cols: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    componente: () => import('@/components/Inputs/TextField'),
    label: 'Email',
    nome: 'email',
    rules: 'required'
  },
  {
    col: {
      cols: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
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
      md: 4,
      lg: 4,
      xl: 4
    },
    componente: () => import('@/components/Inputs/SimpleSelect'),
    itens: [
      {
        text: 'Sim',
        value: true
      },
      {
        text: 'Não',
        value: false
      }
    ],
    label: 'Ativo',
    nome: 'ativo',
    rules: 'required'
  },
  MestreDetalheBuilder(
    'Empresas', // Label
    {
      // Urls
      base: '/usuario/empresas',
      listarDetalhes: '/empresa/listar',
      vincular: '/usuario/vincular-empresa'
    },
    [
      // headers
      {
        text: 'Nome',
        value: 'nome'
      },
      {
        text: 'CNPJ',
        value: 'cnpj'
      }
    ],
    'nome' // descricaoItem
  )
]
