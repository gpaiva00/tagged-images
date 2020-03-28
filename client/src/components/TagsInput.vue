<template>
  <v-row>
    <v-col cols="12">
      <v-combobox
        @change="handleTagsChange"
        v-model="selected"
        :items="items"
        :placeholder="placeholder"
        :prepend-inner-icon="innerIcon"
        clear-icon="mdi-close"
        chips
        hide-details
        hide-no-data
        hide-selected
        clearable
        multiple
        single-line
        filled
        rounded
      ></v-combobox>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable quote-props */
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Adicione até 4 tags para as fotos',
    },
    innerIcon: {
      type: String,
      default: 'mdi-label',
    },
    imageTags: {
      type: Array,
      default: () => [],
    },
    clearFields: Boolean,
  },
  updated() {
    this.load();
  },
  data: () => ({
    selected: [],
    items: [],
  }),
  watch: {
    'clearFields': function (value) {
      if (value) this.selected = [];
    },
    'imageTags': function (value) {
      if (value.length) {
        this.selected = value;
      }
    },
  },
  methods: {
    load() {
      this.getTags();
    },
    getTags() {
      this.items = this.$store.state.tags;
    },
    handleTagsChange() {
      this.$emit('handleTagsInput', this.selected);
    },
  },
};
</script>
