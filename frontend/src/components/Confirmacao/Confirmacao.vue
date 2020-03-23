<template>
  <v-dialog
    v-model="showComputed"
    @keydown.enter="confirmar"
    :width="600"
  >
    <v-card>
      <v-app-bar
        color="secondary"
        dark
      >
        <v-spacer></v-spacer>
        <span :class="{ 'display-1': $vuetify.breakpoint.mdAndUp, title: $vuetify.breakpoint.smAndDown }">Mensagem do sistema</span>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-divider></v-divider>
      <v-card-text class="text-center">
        <div class="mt-5 gray--text title">{{  mensagem  }}</div>
      </v-card-text>
      <v-divider />
      <v-card-actions :class="{'px-1': $vuetify.breakpoint.xs}">
        <v-row
          :class="{'px-1': $vuetify.breakpoint.smAndUp,  'py-1': true}"
          no-gutters
        >
          <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
          <v-col cols="auto">
            <v-btn
              :loading="loading"
              @click="showComputed = false"
              color="error"
              dark
            >
              <v-icon left>mdi-cancel</v-icon>
              Cancelar
            </v-btn>
          </v-col>
          <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>

          <v-col
            cols="auto"
            :class="{'ml-2': $vuetify.breakpoint.smAndUp}"
          >
            <v-btn
              v-if="!mensagem"
              :loading="loading"
              @click="confirmar"
              color="success"
              dark
            >
              <v-icon left>mdi-trash-can</v-icon>
              Apagar
            </v-btn>
            <v-btn
              v-else
              :loading="loading"
              @click="confirmar"
              color="success"
              dark
            >
              <v-icon left>mdi-check</v-icon>
              Confirmar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmacaoComponent',
  computed: {
    showComputed: {
      get () {
        return this.show
      },
      set (value) {
        this.$emit('update:show', value)
        this.$emit('update:loading', value)
      }
    }
  },
  methods: {
    confirmar () {
      this.$emit('update:loading', true)
      this.$emit('confirmar')
    }
  },
  props: {
    show: {
      required: true,
      type: Boolean
    },
    loading: {
      required: true,
      type: Boolean
    },
    mensagem: {
      required: true,
      type: String
    }
  }
}
</script>
