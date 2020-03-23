<template>
  <v-form autocomplete="off">
    <v-row class="mb-2">
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <v-select
          v-model="filtro"
          :items="headersComputed"
          class="elevation-4"
          color="accent"
          dense
          hide-details
          item-text="text"
          item-value="value"
          label="Filtro"
          outlined
        />
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="10"
      >
        <v-text-field
          v-model="valorFiltro"
          @click:append="filtrar"
          @keydown.enter="filtrar"
          @keydown.esc="limparFiltros"
          color="accent"
          append-icon="mdi-magnify"
          class="elevation-4"
          dense
          label="Pesquisar"
          hide-details
          outlined
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FiltrosComponent',
  mounted () {
    const proibidos = ['acoes', 'id']
    const headers = this.headers.filter(
      item => !proibidos.includes(item.value)
    )
    if (headers.length) {
      this.filtro = headers[0].value
    }
  },
  data () {
    return {
      filtro: '',
      valorFiltro: ''
    }
  },
  computed: {
    headersComputed () {
      return this.headers.filter(f => f.value !== 'acoes')
    }
  },
  methods: {
    filtrar () {
      let filtros
      if (this.valorFiltro) {
        filtros = { [this.filtro]: this.valorFiltro }
      } else {
        filtros = {}
      }
      this.$store.commit(`${this.store}/setFiltros`, filtros)
      this.$emit('listar')
    },
    limparFiltros () {
      this.valorFiltro = ''
      const filtros = {}
      this.$store.commit(`${this.store}/setFiltros`, filtros)
      this.$emit('listar')
    }
  },
  props: {
    hideAddBtn: {
      default: false,
      type: Boolean
    },
    headers: {
      required: true,
      type: Array
    },
    store: {
      default: 'crud',
      type: String
    }
  }
}
</script>
