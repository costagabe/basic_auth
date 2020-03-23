<template>
  <ValidationProvider
    :name="label.toLowerCase()"
    :rules="rules"
    v-slot="{ errors }"
  >
    <v-text-field
      v-model="valorCampoComputed"
      v-uppercase
      :error-messages="errors[0]"
      :hide-details="!errors[0]"
      :label="label"
      color="accent"
      dense
      outlined
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextFieldComponent',
  props: ['label']
}
</script>
