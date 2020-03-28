<template>
  <div class="text-center">
    <v-chip
      x-small
      class="ma-2"
      v-for="n in tags.length"
      :key="n"
    >
      {{ tags[n-1] }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
};
</script>
