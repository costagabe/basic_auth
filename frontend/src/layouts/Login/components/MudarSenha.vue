<template>
  <v-dialog
    v-model="showComputed"
    width="500"
  >
    <v-card>
      <v-app-bar color="primary">
        <h2 :class="{'white--text': true}">Alteração de senha</h2>
      </v-app-bar>
      <v-card-text class="py-2">
        <v-text-field
          v-model="senha"
          class="my-2"
          dense
          label="Nova senha"
          hide-details
          outlined
          type="password"
        />
        <v-text-field
          v-model="resenha"
          class="my-2"
          dense
          label="Repetir senha"
          hide-details
          outlined
          type="password"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-row no-gutters>
          <v-spacer />
          <v-col cols="auto">
            <v-btn
              @click="showComputed = false"
              class="mr-2"
              color="error"
              dark
            >
              <v-icon left>mdi-cancel</v-icon>
              Cancelar
            </v-btn>

            <v-btn
              @click="confirmar"
              color="success"
              dark
            >
              <v-icon left>mdi-floppy</v-icon>
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import crypto from 'crypto'
export default {
  name: 'MudarSenhaComponent',
  data () {
    return {
      senha: '',
      resenha: ''
    }
  },
  computed: {
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
    async confirmar () {
      if (this.senha === this.resenha) {
        const senha = crypto
          .createHash('sha256')
          .update(this.senha)
          .digest('hex')
        this.$axios
          .post('/auth/alterar-senha', {
            senha: senha,
            uid: this.uid
          })
          .then(res => {
            this.showComputed = false
            this.$notificacao(res.data)
          })
          .catch(e =>
            this.$notificacao({
              atencao: 'Ocorreu um erro, por favor, tente novamente'
            })
          )
      } else {
        this.$notificacao({ erro: 'As senhas não correspondem.' })
      }
    }
  },
  props: {
    show: {
      required: true,
      type: Boolean
    },
    uid: {
      required: true,
      type: String
    }
  }
}
</script>
