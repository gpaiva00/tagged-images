import axios from 'axios';

const apiUrl = `${process.env.VUE_APP_JSON_API}/tags`;

export default {
  async list() {
    return axios.get(apiUrl);
  },

  async create(newTags) {
    return axios.post(apiUrl, newTags);
  },

};
