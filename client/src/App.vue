<template>
  <v-app>
    <router-view></router-view>

    <!-- notification -->
    <notification />
    <!-- footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
import Notification from './components/Notification.vue';

export default {
  name: 'app',
  components: {
    Footer,
    Notification,
  },
};
</script>
