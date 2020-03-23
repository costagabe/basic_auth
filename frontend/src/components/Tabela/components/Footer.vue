<template>
  <v-row>
    <v-col
      cols="auto"
      sm="3"
    >
      <div :class="{'mt-2': true,
       'ml-1': $vuetify.breakpoint.smAndUp}">
        Página <b>{{  paginacao.paginaAtual  }}</b> de <b>{{  paginacao.totalPaginas  }}</b>

      </div>
    </v-col>
    <v-spacer />
    <v-col
      cols="auto"
    >

      <v-select
        :items="linhas"
        :value="paginacao.linhas"
        @input="setLinhas"
        class="elevation-4"
        color="accent"
        dense
        hide-details
        label="Linhas"
        item-color="accent"
        item-text="text"
        item-value="value"
        solo
        style="width: 125px !important"
      />

    </v-col>
    <v-col
      cols="8"
      :offset="$vuetify.breakpoint.xs ? 4 : 0"
      sm="auto"
    >
      <v-btn
        @click="mudarPagina(-1)"
        class="ma-0"
        color="primary"
        fab
        x-small
      >
        <v-icon small>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-btn
        @click="mudarPagina(1)"
        class="mx-2"
        color="primary"
        fab
        x-small
      >
        <v-icon small>
          mdi-arrow-right
        </v-icon>
      </v-btn>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TabelaFooterComponente',
  data () {
    return {
      linhas: [
        {
          text: '5 linhas',
          value: 5
        },
        {
          text: '10 linhas',
          value: 10
        },
        {
          text: '15 linhas',
          value: 15
        },
        {
          text: '20 linhas',
          value: 20
        }
      ]
    }
  },
  methods: {
    setLinhas (value) {
      const paginacao = { ...this.paginacao }
      paginacao.linhas = value
      paginacao.paginaAtual = 1
      this.$store.commit(`${this.store}/setPaginacao`, paginacao)
    },
    mudarPagina (value) {
      const paginacao = { ...this.paginacao }
      const novaPagina = paginacao.paginaAtual + value
      if (novaPagina > 0 && novaPagina <= paginacao.totalPaginas) {
        paginacao.paginaAtual = novaPagina
        this.$store.commit(`${this.store}/setPaginacao`, paginacao)
        window.scrollTo(0, 0)
      }
    }
  },
  computed: {
    paginacao () {
      return this.$store.state[this.store].paginacao
    }
  },
  props: {
    store: {
      required: true,
      type: String
    }
  }
}
</script>
