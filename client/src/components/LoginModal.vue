<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
       <v-card class="mx-auto">
        <v-card-title
          class="headline"
          primary-title
        >
          <v-list-item>
            <v-list-item-avatar size="70" color="purple lighten-2">
               <v-icon color="white" size="50">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Faça login</v-list-item-title>
              <v-list-item-subtitle>Use sua conta do Google.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>

        <v-card-text>
          <v-container fluid>
           <v-row align="center" justify="center">
            <v-col cols="12">
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="handleSuccess"
                :onFailure="handleFailure">
                Login com Google
              </GoogleLogin>
            </v-col>
            </v-row>

          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="$emit('toggleModal')"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </template>
<script>
import GoogleLogin from 'vue-google-login';
import Users from '../API/Users';

export default {
  components: {
    GoogleLogin,
  },
  props: {
    dialog: Boolean,
  },
  mounted() {
    // this.load();
  },
  data() {
    return {
      params: {
        client_id: '4731122153-qskuu1rogarfp4h6jo3nasu65o8luj7a.apps.googleusercontent.com',
        // 4731122153-b06mf4sg7lcqtp23f9f1b2em5r36av2m.apps.googleusercontent.com 2
        // 4731122153-qskuu1rogarfp4h6jo3nasu65o8luj7a.apps.googleusercontent.com 1
      },
      renderParams: {
        width: 400,
        height: 50,
        longtitle: true,
        theme: 'dark',
      },
      // congregations: ['Iolanda'],
    };
  },
  methods: {
    handleSuccess(googleUser) {
      let userData = googleUser.getBasicProfile();
      const {
        dV: id, jL: avatar, zu: email, Ad: name,
      } = userData;

      // create new user obj
      userData = {
        id, name, email, avatar,
      };
      // get user image or first name letter
      // avatar = avatar.length ? avatar : name[0];
      // save user data into vuex
      this.$store.dispatch('settingUser', {
        id, avatar, email, name, logged: true,
      });
      // save user into db
      this.saveUserDataOnDB(userData);
      // close modal
      this.$emit('toggleModal');
      // show success message
      this.$toggleNotification({
        text: 'Você foi logado com sucesso',
        color: 'success',
      });
    },
    handleFailure() {},
    async saveUserDataOnDB(user) {
      const userExists = await Users.find({ email: user.email }).then((res) => {
        const hasData = res.length > 0;

        // eslint-disable-next-line no-underscore-dangle
        if (hasData) this.saveUserId(res[0]._id);

        return hasData;
      });

      if (userExists) return;

      Users.create(user)
        .then((res) => {
          // eslint-disable-next-line no-underscore-dangle
          if ('_id' in res.data) this.saveUserId(res.data[0]._id);
        })
        .catch(() => this.$toggleNotification({
          text: 'Desculpe, houve um erro ao tentar salvar seu usuário. Tente novamente.',
          color: 'error',
        }));
    },
    saveUserId(id) {
      this.$store.dispatch('settingUser', {
        // eslint-disable-next-line no-underscore-dangle
        _id: id,
      });
    },
  },
};
</script>
