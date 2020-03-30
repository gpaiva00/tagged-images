import axios from 'axios';

const apiUrl = `${process.env.VUE_APP_JSON_API}/images`;

export default {
  async list(page = 1) {
    return axios.get(`${apiUrl}?page=${page}`);
  },

  async upload(data) {
    const uploadAPI = process.env.VUE_APP_UPLOAD_API;
    const uploadKey = process.env.VUE_APP_UPLOAD_KEY;
    const uploadUrl = `${uploadAPI}?key=${uploadKey}`;
    const headers = { 'Content-Type': 'multipart/form-data' };

    return axios({
      method: 'POST',
      url: uploadUrl,
      headers,
      data,
    });
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
