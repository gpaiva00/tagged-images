<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn @click="handleProfileMenu" icon v-on="on" class="ml-5">
        <v-avatar :class="{'purple lighten-2': !user.logged }">
          <!-- <span v-if="user.logged" class="white--text headline">{{ user.avatar }}</span> -->
          <!-- <v-img v-if="user.logged" class="" :src="user.avatar"></v-img> -->
          <v-icon size="35">mdi-account</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list v-if="user.logged">
      <v-list-item v-for="(option, i) in profileOptions" :key="i" @click="option.action">
        <v-list-item-icon><v-icon>{{ option.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>
          {{ option.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {},
  mounted() {
    this.load();
  },
  data() {
    return {
      user: {},
      profileOptions: [
        // {
        //   title: 'Minhas Fotos',
        //   color: '',
        //   icon: 'mdi-image-multiple',
        //   action: () => {},
        // },
        // {
        //   title: 'Configurações',
        //   color: '',
        //   icon: 'mdi-cog-outline',
        //   action: () => this.$emit('toggleProfileModal'),
        // },
        {
          title: 'Sair',
          color: 'red',
          icon: 'mdi-power-cycle',
          action: () => this.$emit('userLogout'),
        },
      ],
    };
  },
  methods: {
    load() {
      this.getUserData();
    },
    getUserData() {
      this.user = this.$store.state.user;
    },
    handleProfileMenu() {
      if (!this.user.logged) this.$emit('toggleLoginModal');
    },
  },
};
</script>
