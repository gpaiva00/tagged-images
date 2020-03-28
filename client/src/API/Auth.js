import axios from 'axios';

const apiUrl = `${process.env.VUE_APP_JSON_API}/auth`;

export default {
  async validateLogin({ username, password }) {
    return axios.get(`${apiUrl}?q=username:${username},password:${password}`);
  },
};
