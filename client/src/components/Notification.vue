<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="noty.toggle"
      :timeout="4000"
      :color="noty.color"
    >
      {{ noty.text }}
      <!-- <v-btn
        color="pink"
        text
        @click="noty.show = false"
      >
        Fechar
      </v-btn> -->
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    noty() {
      return this.$store.state.noty;
    },
  },
  watch: {
  },
};
</script>
