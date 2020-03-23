<template>
  <v-container
    class="pa-0 ma-0"
    fluid
  >
    <v-row no-gutters>
      <v-col>
        <h2 :class="{'pl-2':true, 'pt-2':true, 'white--text': $vuetify.theme.dark}">{{ pagina.titulo }}</h2>
        <p :class="{'subtitle-2':true, 'ml-3':true, 'white--text': $vuetify.theme.dark}">{{ pagina.subtitulo }}</p>
        <v-divider />
      </v-col>
    </v-row>
    <v-row
      :class="{
        'px-2': true,
        'px-8': $vuetify.breakpoint.smAndUp,
        'pt-3': true
      }"
      justify="center"
      no-gutters
    >
      <v-col>
        <v-card>
          <v-app-bar color="primary">
            <v-btn
              v-if="tipoCrud !== 'Listagem'"
              @click="tipoCrud = 'Listagem'"
              class="ml-1 mr-2"
              dark
              icon
              small
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            <h3 :class="{'white--text': true}">
              {{ pagina.tituloBarra }} - {{ tipoCrud }}
            </h3>
            <v-spacer />
            <v-btn
              v-if="tipoCrud === 'Listagem'"
              @click="tipoCrud = 'Cadastro'"
              class="ml-1 mr-2"
              dark
              icon
              small
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-app-bar>
          <div v-if="tipoCrud === 'Listagem'">
            <Filtros
              :headers="headers"
              @listar="listarRegistros"
              class="px-2"
            />
            <Tabela
              :itens="registros || []"
              :headers="headers"
              :loading="loadingRegistros"
              :rotinas="rotinasLiberadas"
              @apagar="$confirmar(apagar), (registroSelecionado = $event)"
              @editar="setFormulario($event), (tipoCrud = 'Editar')"
              @listar="listarRegistros"
              apagar
              class="px-2"
              editar
            />
          </div>
          <div v-else>
            <Formulario
              :campos="campos"
              @salvar="salvar"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Crud',
  async created () {
    this.$store.commit('crud/setLista', [])
    this.setPaginaRequisicao(this.paginaRequisicao)
  },
  data () {
    return {
      tipoCrud: 'Listagem',
      registroSelecionado: -1,
      rotinasLiberadas: {}
    }
  },
  computed: {
    ...mapState('crud', {
      registros: 'lista',
      loadingRegistros: 'loading',
      paginacao: 'paginacao'
    }),
    loadingComputed: {
      get () {
        return this.loadingRegistros
      },
      set (value) {
        this.$store.commit('crud/setLoading', value)
      }
    }
  },
  methods: {
    ...mapActions('crud', {
      listarRegistros: 'listar',
      salvarRegistro: 'salvar',
      apagarRegistro: 'apagar'
    }),
    ...mapMutations('crud', ['setPaginaRequisicao', 'setFormulario']),
    async apagar () {
      if (this.registroSelecionado !== -1) {
        const ret = await this.apagarRegistro(this.registroSelecionado)
        if (!ret.erro) {
          await this.listarRegistros()
        } else {
          this.$store.commit('crud/setLoading', false)
        }
      } else {
        this.$notificacao({
          erro:
            'Ocorreu um erro. Aparentemente, o registro que você deseja apagar não foi selecionado antes.'
        })
      }
    },
    async salvar () {
      const ret = await this.salvarRegistro()
      if (!ret.erro) {
        this.tipoCrud = 'Listagem'
      }
    }
  },
  watch: {
    tipoCrud (valor) {
      if (valor === 'Listagem') {
        this.$store.commit('crud/setFormulario', {})
        this.$store.commit('crud/setLista', [])
      }
    }
  },
  props: {
    campos: {
      required: true,
      type: Array
    },
    headers: {
      required: true,
      type: Array
    },
    pagina: {
      required: true,
      type: Object
    },
    paginaRequisicao: {
      required: true,
      type: String
    },
    rotinas: {
      type: Array,
      default: () => []
    }
  }
}
</script>
