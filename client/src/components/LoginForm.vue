<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card width="500">
        <v-card-title class="headline" primary-title>
          <v-list-item>
            <v-list-item-avatar size="70" color="purple lighten-2">
              <v-icon color="white" size="50">mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Faça login</v-list-item-title>
              <v-list-item-subtitle>Use as credencias fornecidas para você.</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" md="12">
                <v-text-field v-model="username" label="nome de usuário" filled rounded dense>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field type="password" v-model="password" label="senha" filled rounded dense>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleSubmit" color="purple" text>
            Entrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {},
  props: {
    dialog: Boolean,
  },
  mounted() {},
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    handleSubmit() {
      const { username, password } = this;
      this.$emit('handleSubmit', { username, password });
    },
  },
};
</script>
