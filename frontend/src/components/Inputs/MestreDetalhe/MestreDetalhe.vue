<template>
  <section v-if="valor">
    <FinderDialog
      v-if="showFinder"
      :descricaoItem="descricaoItem"
      :headers="headers"
      :show.sync="showFinder"
      :url="urls.listarDetalhes"
      @vincular="vincular"
      titulo="Rotas"
    />
    <v-card>
      <v-app-bar
        color="secondary"
        dense
      >
        <h3 class="white--text">
          {{label}}
        </h3>
        <v-spacer />
        <v-btn
          @click="showFinder = true"
          class="mr-1"
          icon
          dark
          small
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <Tabela
          :headers="headers"
          :itens="lista"
          :loading="loading"
          @apagar="$confirmar(apagar), registroSelecionado = $event"
          @listar="listar"
          apagar
          :store="store"
        />
      </v-card-text>
    </v-card>
  </section>
</template>
<script>
import axios from '@/plugins/axios'
import store from '@/store/crud'
export default {
  name: 'MestreDetalheComponent',
  beforeCreate () {
    this.i = 0
    while (this.$store.state['mestreDetalhe' + this.i]) {
      this.i++
    }
    this.store = 'mestreDetalhe' + this.i
    this.$store.registerModuleWithoutRepeat(this.store, store)
  },
  destroyed () {
    this.$store.unregisterModule(this.store)
  },
  data () {
    return {
      registroSelecionado: '',
      showFinder: false,
      keyFinder: 1,
      storeMestreDetalhe: ''
    }
  },
  computed: {
    paginacao () {
      return this.$store.state[this.store].paginacao
    },
    lista () {
      return this.$store.state[this.store].lista
    },
    loading () {
      return this.$store.state[this.store].loading
    }
  },
  methods: {
    async apagar () {
      const res = await axios.delete(
        `${this.urls.base}/apagar/${this.valor}/${this.registroSelecionado}`
      )
      this.$notificacao(res.data)
      this.listar()
    },
    async listar () {
      await this.$store.dispatch(`${this.store}/listarUrl`, `${this.urls.base}/listar/${this.valor}`)
    },
    async vincular (lista) {
      const body = {
        id: this.valor,
        lista
      }
      if (lista.length) {
        const res = await axios.post(this.urls.vincular, body)
        this.showFinder = false
        this.$notificacao(res.data)
        this.listar()
      }
    }
  },
  props: {
    valor: {
      type: [String, Number]
    },
    label: {
      required: true,
      type: String
    },
    headers: {
      required: true,
      type: Array
    },
    urls: {
      required: true,
      type: Object
    },
    descricaoItem: {
      default: 'descricao',
      type: String
    }
  },
  watch: {
    showFinder (value) {
      this.keyFinder++
    }
  }
}
</script>
