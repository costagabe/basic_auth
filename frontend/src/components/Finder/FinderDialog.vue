<template>
  <v-dialog
    v-model="showComputed"
    :persistent="true"
    width="1200"
  >
    <Finder
      v-bind="$props"
      :show.sync="showComputed"
      @vincular="vincular"
    />
  </v-dialog>
</template>
<script>
export default {
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
    vincular (selecionados) {
      this.$emit('vincular', selecionados)
    }
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    show: {
      required: true,
      type: Boolean
    },
    titulo: {
      required: true,
      type: String
    },
    url: {
      type: String,
      required: true
    },
    descricaoItem: {
      type: String,
      default: 'descricao'
    }
  }
}
</script>
