import axios from 'axios';

export default {
  async upload(req, res) {
    const uploadAPI = process.env.VUE_APP_UPLOAD_API;
    const uploadKey = process.env.VUE_APP_UPLOAD_KEY;
    const uploadUrl = `${uploadAPI}?key=${uploadKey}`;
    const headers = { 'Content-Type': 'multipart/form-data' };
    const { data } = req.body;

    return axios({
      method: 'POST',
      url: uploadUrl,
      headers,
      data,
    });
  }
}