<template>
  <v-container v-if="src.length" fluid>
    <v-row justify="center">
      <v-col :cols="src.length <= 1 ? '12' : '4'" >
        <v-img
          v-for="(image, index) in  src"
          :key="index"
          :src="image.image.url"
          :lazy-src="image.thumb.url"
          style="max-width: 430px;"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    src: {
      image: {
        type: Object,
        default: () => {},
      },
      thumb: {
        type: Object,
        default: () => {},
      },
    },
    width: {
      type: Number,
      default: 150,
    },
  },
};
</script>
