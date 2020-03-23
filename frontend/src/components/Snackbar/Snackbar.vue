<template>
  <v-snackbar
    v-model="notificacao.show"
    :color="notificacao.cor"
    :timeout="4000"
    top
  >
    {{ notificacao.conteudo }}
    <v-btn
      icon
      text
      @click="notificacao.show = false"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('app', ['notificacao'])
  }
}
</script>
