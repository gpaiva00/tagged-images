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
            <!-- size="70" color="purple lighten-1" -->
            <v-list-item-avatar :style="{color: !user.logged ? 'purple lighten-2' : ''}">
               <v-avatar color="">
                <!-- <span class="white--text headline">{{ user.avatar }}</span> -->
                <v-img class="" :src="user.avatar"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.uploads }} uploads</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>

        <v-card-text>
           <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="user.name"
                label="Seu nome"
                filled
                rounded
              ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="d-flex" cols="12">
                <v-select
                  v-model="user.congregation"
                  :items="congregations"
                  label="Sua congregação"
                  filled
                  rounded
                ></v-select>
              </v-col>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="$emit('toggleModal')">
            Fechar
          </v-btn>
          <v-btn color="green darken-1" text @click="handleSave">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </template>
<script>
import Users from '../API/Users';

export default {
  props: {
    dialog: Boolean,
  },
  mounted() {
    this.load();
  },
  data() {
    return {
      user: {},
      congregations: ['Iolanda'],
    };
  },
  methods: {
    load() {
      this.getUserData();
    },
    getUserData() {
      this.user = this.$store.state.user;
    },
    handleSave() {
      const { name, congregation } = this.user;

      const validateFields = this.$validateFields({ name, congregation });

      if (!validateFields) {
        return this.$toggleNotification({
          text: validateFields,
          color: 'error',
        });
      }

      return Users
        .update(this.user)
        .then(() => this.$toggleNotification({
          text: 'Alterações salvas com sucesso!',
          color: 'success',
        }))
        .catch(() => this.$toggleNotification({
          text: 'Desculpe, houve um erro ao tentar salvar os dados. Tente mais tarde.',
          color: 'error',
        }));
    },
  },
};
</script>
