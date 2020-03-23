<template>
  <ValidationProvider
    :name="label.toLowerCase()"
    :rules="rules"
    v-slot="{ errors }"
  >
    <v-select
      v-model="valorCampoComputed"
      :error-messages="errors[0]"
      :hide-details="!errors[0]"
      :items="itens"
      :label="label"
      color="accent"
      dense
      item-text="text"
      item-value="value"
      outlined
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'SimpleSelectComponent',
  props: {
    itens: {
      required: true,
      type: Array
    },
    label: {
      required: true,
      type: String
    }
  }
}
</script>
