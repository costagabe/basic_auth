<template>
  <v-text-field
    :label="label"
    :append-icon="icone"
    :value="valor"
    @input="$emit('input', $event), icone = $event"
    color="accent"
    dense
    hide-details
    outlined
  />
</template>

<script>
export default {
  name: 'TextFieldComponent',
  created () {
    this.icone = this.value
  },
  data () {
    return {
      icone: 'mdi-'
    }
  },
  props: ['label']
}
</script>
