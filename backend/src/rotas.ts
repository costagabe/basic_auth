export default  [
  {
    menu: true,
    tipo: 1,
    icone: "mdi-settings",
    descricao: "SISTEMA",
    delete: false,
    url: "/sistema",
    pai: 0,
    acoes: "1",
    _id: 1
  },
  {
    tipo: 1,
    icone: "mdi-account-check",
    descricao: "CONTROLE DE ACESSO",
    delete: false,
    url: "/sistema/controle-acesso",
    pai: 1,
    menu: true,
    acoes: "2",
    _id: 2
  },
  {
    menu: true,
    tipo: 1,
    icone: "mdi-routes",
    descricao: "ROTAS",
    delete: false,
    url: "/sistema/controle-acesso/rotas",
    pai: 2,
    acoes: "3",
    _id: 3
  },
  {
    tipo: 1,
    icone: "mdi-account-group",
    descricao: "PERFIS",
    delete: false,
    url: "/sistema/controle-acesso/perfis",
    pai: 2,
    menu: true,
    acoes: "4",
    _id: 4
  },
  {
    menu: true,
    tipo: 1,
    icone: "mdi-office-building",
    descricao: "EMPRESAS",
    delete: false,
    url: "/sistema/empresas",
    pai: 1,
    acoes: "5",
    _id: 5
  },
  {
    descricao: "LISTAGEM DE EMPRESAS",
    tipo: 2,
    delete: false,
    url: "/empresas/listar",
    acoes: "6",
    _id: 6
  },
  {
    descricao: "MENUS DOS USUÁRIOS",
    tipo: 2,
    delete: false,
    url: "/rotas/menus",
    acoes: "7",
    _id: 7
  },
  {
    tipo: 2,
    delete: false,
    url: "/rotas/listar",
    descricao: "LISTAGEM DE ROTAS",
    acoes: "8",
    _id: 8
  },
  {
    tipo: 2,
    delete: false,
    url: "/rotas/salvar",
    descricao: "CADASTRO DE ROTAS",
    acoes: "9",
    _id: 9
  },
  {
    tipo: 2,
    delete: false,
    url: "/rotas/apagar/:_id",
    descricao: "APAGAR ROTA",
    acoes: "10",
    _id: 10
  },
  {
    descricao: "EDITAR ROTA",
    menu: false,
    tipo: 2,
    delete: false,
    url: "/rotas/editar",
    acoes: "15",
    _id: 15
  },
  {
    icone: "mdi-account",
    descricao: "USUÁRIOS",
    delete: false,
    url: "/sistema/controle-acesso/usuarios",
    pai: 2,
    menu: true,
    tipo: 2,
    acoes: "20",
    _id: 20
  },
  {
    descricao: "LISTAGEM DE PERFIS",
    menu: false,
    tipo: 2,
    delete: false,
    url: "/perfis/listar",
    acoes: "23",
    _id: 23
  },
  {
    tipo: 2,
    delete: false,
    url: "/perfis/salvar",
    descricao: "SALVAR PERFIL",
    menu: false,
    acoes: "30",
    _id: 30
  },
  {
    menu: false,
    tipo: 2,
    _id: 31,
    icone: "",
    descricao: "EDITAR PERFIL",
    delete: false,
    url: "/perfis/editar",
    acoes: "31"
  },
  {
    descricao: "APAGAR PERFIL",
    menu: false,
    tipo: 2,
    delete: false,
    url: "/perfis/apagar/:_id",
    acoes: "33",
    _id: 33
  },
  {
    delete: false,
    url: "/perfis/rotas/listar/:_id",
    menu: false,
    tipo: 2,
    _id: 34,
    descricao: "ROTAS DO PERFIL",
    acoes: "34"
  },
  {
    _id: 35,
    descricao: "APAGAR ROTA DE PERFIL",
    delete: false,
    url: "/perfis/rotas/apagar/:_id/:_idRota",
    menu: false,
    tipo: 2,
    acoes: "35"
  },
  {
    descricao: "VINCULAR ROTA A PERFIL",
    menu: false,
    tipo: 2,
    url: "/perfis/vincular-rota",
    delete: false,
    acoes: "36",
    _id: 36
  },
  {
    descricao: "CADASTRAR EMPRESAS",
    delete: false,
    url: "/empresas/salvar",
    menu: false,
    tipo: 2,
    acoes: "37",
    _id: 37
  }
];
