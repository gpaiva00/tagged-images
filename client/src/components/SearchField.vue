<template>
<v-container>
  <v-row justify="center">
    <v-col cols="6" xs="12">
      <v-autocomplete
        v-model="selected"
        @change="handleTagsChange"
        :items="items"
        :placeholder="placeholder"
        clear-icon="mdi-close"
        prepend-inner-icon="mdi-file-find"
        chips
        hide-details
        hide-no-data
        hide-selected
        clearable
        multiple
        single-line
        filled
        rounded
      ></v-autocomplete>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Pesquisar por tags',
    },
  },
  updated() {
    this.load();
  },
  data: () => ({
    selected: [],
    items: [],
  }),
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
