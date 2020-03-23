<template>
  <section>
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        class="mt-4"
        cols="11"
      >
        <Filtros />
      </v-col>
      <v-col cols="11">
        <Tabela
          :itens="itens"
          :headers="headers"
          :loading="loading"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id',
          width: '50px',
          sortable: false
        },
        {
          text: 'Descrição',
          value: 'descricao'
        }
      ],
      itens: [],
      loading: true
    }
  }
}
</script>
