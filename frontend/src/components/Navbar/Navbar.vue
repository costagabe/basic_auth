<template>
  <section>
    <v-app-bar
      :app="$vuetify.breakpoint.mdAndUp"
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        v-if="menus.length"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        v-else
        :loading="!menus.length"
        icon
        dark
      />
      <v-toolbar-title>Orion</v-toolbar-title>
      <v-spacer />
      <v-col
        cols="6"
        md="3"
        lg="2"
      >
        <v-select
          :items="empresas"
          :value="empresaSelecionada"
          @input="setEmpresaSelecionada($event), $emit('atualizar')"
          class=" mr-2 elevation-4"
          hide-details
          background-color="primary"
          dense
          label="Empresas"
          item-text="nome"
          item-value="id"
          solo
        />
      </v-col>
      <v-btn
        @click="logout"
        class="mr-2"
        color="white"
        icon
        small
      >
        <v-icon>
          mdi-location-exit
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="$vuetify.theme.dark ? 'primary' : 'secondary'"
      app
    >
      <v-treeview
        vmodel="tree"
        :items="menusDrawer"
        :active.sync="tree"
        @update:active="abrirUrl"
        activatable
        color="white"
        dark
        item-key="url"
        open-on-click
        transition
      >
        <template v-slot:prepend="{ item }">
          <v-icon>
            {{ item.icone }}
          </v-icon>
        </template>
        <template v-slot:label="{ item }">

          <v-tooltip
            v-if="item.name.length > 10"
            bottom
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">{{ item.name.substr(0, 10) }}...</div>
            </template>
            <span>{{  item.name  }}</span>
          </v-tooltip>
          <span v-else>
            {{  item.name  }}
          </span>
        </template>
      </v-treeview>
    </v-navigation-drawer>
  </section>
</template>

<script>
import store from './store/'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Navbar',

  data () {
    return {
      drawer: this.$vuetify.breakpoint.mdAndUp,
      tree: [],
      menusDrawer: [],
      ultimaRota: '',
      empresas: [],
      menus: [
        {
          descricao: 'SISTEMA',
          id: '1',
          url: '/sistema',
          icone: 'mdi-cog',
          pai: 0,
          name: 'SISTEMA',
          children: [
            {
              descricao: 'CONTROLE DE ACESSO',
              id: '2',
              url: '/controle-acesso',
              icone: 'mdi-account-check',
              pai: '1',
              name: 'CONTROLE DE ACESSO',
              children: [
                {
                  descricao: 'USUÁRIOS',
                  id: '3',
                  url: '/usuario',
                  icone: 'mdi-account',
                  pai: '2',
                  name: 'USUÁRIOS',
                  children: []
                }
              ]
            },
            {
              descricao: 'EMPRESAS',
              id: '5e6bcc030b4e21102433a000',
              url: '/empresa',
              icone: 'mdi-office-building',
              pai: '1',
              name: 'EMPRESAS',
              children: []
            }
          ]
        }
      ]
    }
  },
  beforeCreate () {
    this.$store.registerModuleWithoutRepeat('menu', store)
  },
  destroyed () {
    this.$store.unregisterModule('menu')
  },
  computed: {
    ...mapState('app', ['token', 'empresaSelecionada'])
  },
  methods: {
    ...mapMutations('app', ['setToken', 'setEmpresaSelecionada']),
    abrirUrl ([url]) {
      if (url && url !== this.$route.path) {
        this.$router.push(url)
        this.ultimaRota = url
      } else if (!url) {
        this.$emit('atualizar')
        this.tree.push(this.ultimaRota)
      }
    },
    async logout () {
      localStorage.setItem('userToken', '')
      this.$router.push('/login')
    }
  },
  watch: {
    token: {
      immediate: true,
      async handler (value) {
        if (value) {
          const token = localStorage.getItem('userToken')
          if (token) {
            this.menusDrawer = gerarMenus([{ id: 0 }, ...this.menus])
          }

          this.$axios
            .get('empresa/menus')
            .then(res => {
              this.empresas = res.data
              const empresaSelecioanda =
                localStorage.getItem('empresaSelecionada') || res.data[0].id
              this.setEmpresaSelecionada(empresaSelecioanda)
            })
            .catch(e => {
              const empresaSelecioanda =
                localStorage.getItem('empresaSelecionada') || ''
              this.setEmpresaSelecionada(empresaSelecioanda)
            })
        }
      }
    }
  }
}
function gerarMenus (lista) {
  return getFilhos(0, lista).children
}
function getFilhos (id, lista) {
  const pai = lista.find(f => f.id === id)
  pai.children = pai.children || []

  let filho = lista.find(f => f.pai === id)

  while (filho) {
    const filhoIndex = lista.findIndex(f => f === filho)

    filho = getFilhos(filho.id, lista)
    pai.children.push(filho)
    lista.splice(filhoIndex, 1)

    filho = lista.find(f => f.pai === id)
  }
  return pai
}
</script>
