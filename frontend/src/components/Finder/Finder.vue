<template>
  <v-card>
    <v-app-bar
      color="secondary"
      dark
    >
      <h2>
        Buscar - {{ titulo }}
      </h2>
    </v-app-bar>
    <v-card-text>
      <Filtros
        :headers="headers"
        @listar="listar"
        hideAddBtn
        store="finder"
      />
      <Tabela
        :itens="lista"
        :headers="headers"
        :loading="loading"
        :selecionados="selecionados"
        @adicionar="selecionados.push($event), ( selecionados.sort((a, b) => a - b))"
        @listar="listar"
        adicionar
        store="finder"
      />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <h3>Selecionados:
        <v-chip
          v-for="(item, i) in selecionados"
          :key="i"
          @click="selecionados.splice(selecionados.indexOf(item), 1)"
          class="mr-1 mb-1"
          color="primary"
          dark
        >
          <span class='px-2'> {{diminuirString(item[descricaoItem])}}</span>
          <v-icon x-small>
            mdi-close
          </v-icon>
        </v-chip>
      </h3>
    </v-card-actions>
    <v-divider />
    <v-card-actions>
      <v-spacer />

      <v-btn
        :loading="loading"
        @click="showComputed = false"
        color="error"
      >
        <v-icon left>
          mdi-cancel
        </v-icon>
        Cancelar
      </v-btn>
      <v-btn
        :loading="loading"
        @click="loadingComputed = true, $emit('vincular', selecionados.map(m => m.id))"
        color="success"
      >
        <v-icon left>
          mdi-check
        </v-icon>
        Confirmar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '@/store/crud'
export default {
  name: 'FinderComponent',
  data () {
    return {
      selecionados: []
    }
  },
  beforeCreate () {
    this.$store.registerModuleWithoutRepeat('finder', store)
  },
  destroyed () {
    this.$store.unregisterModule('finder')
  },
  created () {
    this.listar()
  },
  computed: {
    ...mapState('finder', ['paginacao', 'lista', 'loading']),
    loadingComputed: {
      get () {
        return this.loading
      },
      set (value) {
        this.$store.commit('finder/setLoading', value)
      }
    },
    showComputed: {
      get () {
        return this.show
      },
      set (value) {
        this.$emit('update:show', value)
      }
    }
  },
  methods: {
    ...mapActions('finder', ['listarUrl']),
    async listar () {
      await this.listarUrl(this.url)
    },
    diminuirString (str) {
      const tamanho = 20
      return str.length > tamanho ? str.substr(0, tamanho - 3) + '...' : str
    }
  },
  props: {
    descricao: {
      type: String,
      default: 'descricao'
    },
    headers: {
      type: Array,
      required: true
    },
    show: {
      default: false,
      type: Boolean
    },
    titulo: {
      required: true,
      type: String
    },
    url: {
      type: String,
      required: true
    },
    descricaoItem: {
      default: 'descricao',
      type: String
    }
  }
}
</script>
