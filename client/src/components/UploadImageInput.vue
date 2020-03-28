<template>
<v-row>
  <v-col cols="12">
    <v-file-input
      label="Adicione uma foto aqui"
      small-chips
      accept="image/*"
      filled
      rounded
      prepend-inner-icon="mdi-camera"
      ref="fileInput"
      multiple
      v-model="image"
      @change="(data) => $emit('handleImageInput', data)"
      :loading="loadingPreview"
    ></v-file-input>
  </v-col>
</v-row>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable quote-props */
export default {
  props: {
    loadingPreview: Boolean,
    clearFields: Boolean,
  },
  data: () => ({
    image: null,
    rules: [
      value => !value || value.size > 2000000 || 'A foto deve ter menos de 2 MB!',
    ],
  }),
  watch: {
    'clearFields': function (value) {
      if (value) this.image = null;
    },
  },
};
</script>
