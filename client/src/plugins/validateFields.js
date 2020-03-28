/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

export default {
  install(Vue) {
    Vue.prototype.$validateFields = function (fields) {
      const errors = [];

      Object.keys(fields).forEach((key) => {
        const item = fields[key];
        const type = typeof item;

        if (type === 'string' && !item.length) errors.push('Preencha todos os campos para continuar!');
        else if (type === 'number' && item <= 0) errors.push('Há algum campo com valor zero! Corriga para continuar');
      });

      if (!errors.length) return true;

      return errors.join(', ');
    };
  },
};
