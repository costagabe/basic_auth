<template>
  <v-data-table
    :headers="headersComputed"
    :hide-default-header="$vuetify.breakpoint.smAndDown"
    :items="itensComputed"
    :items-per-page="1000"
    :loading="loading"
    :mobile-breakpoint="0"
    class="elevation-2"
    dense
    hide-default-footer
  >
    <template v-slot:item="{headers, item, index}">
      <tr
        v-if="$vuetify.breakpoint.mdAndUp"
        :style="{
          background:  !(index % 2) ? '' : $vuetify.theme.dark ? '#264152' : '#9ebad2'}"
        @click="adicionar ? $emit('adicionar', item) : foo => foo "
      >
        <td
          v-for="(header, i) in headers"
          :key="i"
        >
          <span v-if="header.value === 'acoes'">
            <Acoes
              v-bind="{apagar, editar, selecionados, item, adicionar}"
              :resetSenha="rotinas['2']"
              @apagar="$emit('apagar', $event)"
              @editar="$emit('editar', $event)"
            />
          </span>
          <span v-else>
            {{item[headers[i].value]}}
          </span>
        </td>
      </tr>
      <v-row
        @click="adicionar ? $emit('adicionar', item) : foo => foo "
        no-gutters
        v-else
        class
      >
        <v-col class="px-1">
          <v-card class="mb-2 pr-1 elevation-4 pt-1">
            <v-row
              v-for="(header, i) in headers"
              :key="i"
              class="pb-1"
              no-gutters
            >
              <v-col
                class="pl-2"
                cols="auto"
                style="max-width: 100px"
              ><b>{{header.text}}</b></v-col>
              <v-col class=" text-end">
                <span v-if="header.value === 'acoes'">
                  <Acoes
                    v-bind="{apagar, editar, selecionados, item, adicionar}"
                    :resetSenha="rotinas.resetSenha"
                    @apagar="$emit('apagar', $event)"
                    @editar="$emit('editar', $event)"
                  />
                </span>
                <span v-else>
                  {{item[header.value]}}

                </span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <section>
        <v-divider />
        <Footer :store="
                    store" />
      </section>
    </template>
  </v-data-table>
</template>

<script>
import Footer from './components/Footer'
import Acoes from './components/Acoes'
export default {
  name: 'TabelaComponent',
  async created () {
    this.$emit('listar')
  },
  components: {
    Footer,
    Acoes
  },
  computed: {
    paginacao () {
      return this.$store.state[this.store].paginacao
    },
    headersComputed () {
      return this.headers
    },
    itensComputed () {
      return this.itens.filter(
        f => this.selecionados.findIndex(f2 => f2.id === f.id) === -1
      )
    }
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    itens: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    editar: {
      default: false,
      type: Boolean
    },
    apagar: {
      default: false,
      type: Boolean
    },
    adicionar: {
      default: false,
      type: Boolean
    },
    rotinas: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selecionados: {
      default: () => [],
      type: Array
    },
    store: {
      default: 'crud',
      type: String
    }
  },
  watch: {
    paginacao: {
      deep: true,
      handler (novo, antigo) {
        if (
          (novo.linhas !== antigo.linhas ||
            novo.paginaAtual !== antigo.paginaAtual) &&
          !antigo.isNew
        ) {
          this.$emit('listar')
        }
      }
    }
  }
}
</script>
