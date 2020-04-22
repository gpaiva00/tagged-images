import axios from 'axios';

const apiUrl = `${process.env.VUE_APP_JSON_API}/images`;

export default {
  async list(page = 1) {
    return axios.get(`${apiUrl}?page=${page}`);
  },

  async upload(data) {
    return axios.post(`${apiUrl}/upload`, { data });
  },

  async create(requestBody) {
    return axios.post(apiUrl, requestBody);
  },

  async update(id, tags) {
    return axios.put(`${apiUrl}/${id}`, { tags });
  },

  async delete(id) {
    return axios.delete(`${apiUrl}/${id}`);
  },

};
