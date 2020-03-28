<template>
  <v-app>
    <app-menu :hideIcons="true" />

    <login-form @handleSubmit="handleSubmit" />
  </v-app>
</template>

<script>
import AppMenu from '../components/AppMenu.vue';
import LoginForm from '../components/LoginForm.vue';
import Auth from '../API/Auth';

export default {
  components: {
    AppMenu,
    LoginForm,
  },

  methods: {
    handleSubmit({ username, password }) {
      if (!username.length || !password.length) {
        return this.$toggleNotification({
          text: 'Preencha todos os campos!',
          color: 'error',
        });
      }

      return Auth.validateLogin({ username, password })
        .then(({ status, data }) => {
          if (status !== 200) throw new Error();


          if (data.length) {
            this.$store.dispatch('settingUser', { logged: true });
            this.$router.push({ name: 'Admin' });
          } else {
            this.$toggleNotification({
              text: 'Nome de usuário ou senha inválidos!',
              color: 'error',
            });
          }
        })
        .catch(() => {
          this.$toggleNotification({
            text: 'Desculpe, houve um erro ao tentar fazer o login. Tente mais tarde',
            color: 'error',
          });
        });
    },
  },
};
</script>
