<template>
  <section>
    <ValidationObserver ref="observer">
      <v-row
        :class="{'px-4': $vuetify.breakpoint.smAndUp,'px-1': $vuetify.breakpoint.xsOnly,  'py-2': true}"
        justify="center"
      >
        <v-col
          v-for="(campo, i) in campos"
          v-bind="campo.col"
          :key="i"
        >
          <component
            v-bind="campo"
            :is="campo.componente"
            :valor="$store.state[store].formulario? $store.state[store].formulario[campo.nome]: ''"
            @input="atualizarCampo(campo.nome, $event)"
          />
        </v-col>
      </v-row>
    </ValidationObserver>
    <v-divider />
    <!-- Botão de salvar abaixo da divisória  -->
    <v-row>
      <v-spacer />
      <v-col cols="auto">
        <v-btn
          :loading="$store.state[store].loading"
          @click="salvar"
          class="mr-4"
          color="success"
        >
          <v-icon left>
            mdi-floppy
          </v-icon>
          Salvar
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'FormularioComponent',
  methods: {
    atualizarCampo (campo, valor) {
      this.$store.commit(`${this.store}/setCampoFormulario`, { campo, valor })
    },
    async salvar () {
      const validate = await this.$refs.observer.validate()
      if (validate) {
        this.$emit('salvar')
      } else {
        this.$notificacao({
          atencao: 'Preencha todos os campos corretamente.'
        })
      }
    }
  },
  props: {
    campos: {
      required: true,
      type: Array
    },
    store: {
      type: String,
      default: 'crud'
    }
  }
}
</script>
