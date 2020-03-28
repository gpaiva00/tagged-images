import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user'],
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: [],
    noty: {
      text: '',
      toggle: false,
      color: 'cyan',
      icon: 'mdi-alert-circle',
    },
    user: {
      _id: 0,
      id: 0,
      name: '',
      congregation: '',
      email: '',
      password: '',
      uploads: 0,
      avatar: '',
      logged: false,
    },
    clearFields: false,
  },
  mutations: {
    SETTING_TAGS(state, tags) {
      state.tags = tags;
    },
    CLEAR_FIELDS(state, value) {
      state.clearFields = value;
    },
    SETTING_NOTIFICATION(state, noty) {
      state.noty = noty;
    },
    SETTING_USER(state, { key, value }) {
      state.user[key] = value;
    },
  },
  actions: {
    settingTags({ commit }, tags) {
      commit('SETTING_TAGS', tags);
    },
    clearFields({ commit }, value) {
      commit('CLEAR_FIELDS', value);
    },
    settingNotification({ commit }, noty) {
      commit('SETTING_NOTIFICATION', noty);
    },
    settingUser({ commit }, user) {
      if (typeof user !== 'object') return;

      const keys = Object.keys(user);

      keys.forEach(key => commit('SETTING_USER', { key, value: user[key] }));
    },
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
});
