f<template>
  <v-container
    fill-height
    fluid
    style="background-image: url('img/background.jpg'); background-repeat: repeat"
  >
    <MudarSenha :show.sync="showMudarSenha" :uid="uid" />
    <v-row
      align-content="center"
      justify="center"
    >
      <v-col
        cols="11"
        lg="3"
        md="5"
        sm="7"
        xl="3"
      >
        <v-card elevation="5">
          <v-row>
            <v-spacer />
            <img
              class="mt-4"
              src="@/assets/login.png"
              style="height: 200px; width: 200px"
            />
            <v-spacer />
          </v-row>
          <v-card-text class="mb-0 pb-0">
            <v-form autocomplete="off">
              <v-text-field
                v-model="email"
                class="mb-4"
                dense
                hide-details
                label="Email"
                outlined
                type="email"
              />
              <v-text-field
                v-model="senha"
                :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                :type=" mostrarSenha ? 'text' : 'password'"
                @keypress.enter="login"
                @click:append="mostrarSenha = !mostrarSenha"
                autocomplete="off"
                class="mb-4"
                dense
                hide-details
                label="Senha"
                outlined
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="mt-0 pt-0">
            <v-row
              class="px-2 pb-2"
              no-gutters
            >
              <v-col>
                <v-spacer />
                <v-btn
                  @click="login"
                  :loading="carregando"
                  block
                  class="mr-3 mb-2"
                  dense
                  color="primary"
                  large
                >Entrar</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import crypto from 'crypto'
import axios from '@/plugins/axios'
export default {
  name: 'Login',
  components: {
    MudarSenha: () => import('./components/MudarSenha')
  },
  data () {
    return {
      email: '',
      senha: '',
      carregando: false,
      mostrarSenha: false,
      showMudarSenha: false,
      uid: ''
    }
  },
  created () {
    const email = localStorage.getItem('email')
    if (email) {
      this.email = email
    }
  },
  methods: {
    ...mapMutations('app', ['setToken']),
    async login () {
      const email = this.email
      const senha = crypto
        .createHash('sha256')
        .update(this.senha)
        .digest('hex')
      try {
        this.carregando = true

        const res = await axios.get('/auth/login', {
          params: { email, senha }
        })
        if (!res.data.erro) {
          if (res.data.atencao) {
            if (res.data.mudarSenha) {
              this.uid = res.data.uid
              this.showMudarSenha = true
            }
          } else {
            const token = res.data.token
            localStorage.setItem('userToken', token)
            this.setToken(token)
            this.$router.push('/home')
          }
        } else {
          this.$notificacao(res.data)
          this.carregando = false
        }
        this.carregando = false
      } catch (e) {
        this.carregando = false
        const not = { erro: 'Erro ao autenticar usuário' }
        this.$notificacao(not)
      }
    }
  }
}
</script>
