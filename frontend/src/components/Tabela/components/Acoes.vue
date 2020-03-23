<template>
  <div>
    <v-btn
      v-if="apagar"
      @click="$emit('apagar', item.id)"
      x-small
      icon
    >
      <v-icon color="error">mdi-trash-can</v-icon>
    </v-btn>
    <v-btn
      v-if="editar"
      @click="$emit('editar', item)"
      x-small
      icon
    >
      <v-icon color="accent">mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      :color="selecionados.includes(item.id) ? 'primary' : undefined"
      v-if="adicionar"
      x-small
      icon
    >
      <v-icon color="primary">mdi-plus</v-icon>
    </v-btn>
    <v-btn
      v-if="resetSenha"
      @click="$confirmar(() => resetarSenha(item.id), 'Deseja resetar a senha deste usuário?')"
      x-small
      icon
    >
      <v-icon>
        mdi-lock-reset
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AcoesTabela',
  props: ['apagar', 'editar', 'selecionados', 'item', 'adicionar', 'resetSenha'],
  methods: {
    async resetarSenha (userId) {
      const ret = await this.$axios.post('/usuario/resetar-senha', {
        userId
      })
      this.$notificacao(ret.data)
    }
  }
}
</script>
