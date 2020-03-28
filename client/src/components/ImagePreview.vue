<template>
  <v-container v-if="src.length" fluid>
    <v-row justify="center">
      <v-col cols="6" v-for="(image, index) in src" :key="index">
        <v-img
          :src="image"
          :width="width"
        >
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    src: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 150,
    },
  },
};
</script>
