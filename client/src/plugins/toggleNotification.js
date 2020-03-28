/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

export default {
  install(Vue) {
    Vue.prototype.$toggleNotification = function ({ text, color = 'cyan', icon = 'mdi-alert-circle' }) {
      this.$store.dispatch('settingNotification', {
        text, color, icon, toggle: true,
      });
    };
  },
};
