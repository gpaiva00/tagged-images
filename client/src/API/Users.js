import axios from 'axios';

const apiUrl = `${process.env.VUE_APP_JSON_API}/users`;

export default {
  async list() {
    return axios.get(apiUrl).then(res => res.data);
  },
  async create(user) {
    return axios.post(apiUrl, user);
  },
  async find(user) {
    // eslint-disable-next-line no-constant-condition
    if (!typeof user === 'object') return false;

    let findUrl = `${apiUrl}?q=`;
    const query = [];
    // dinamically set query to find user by key and value
    Object.keys(user).forEach((key) => {
      const param = `${key}:${user[key]}`;
      query.push(param);
    });

    query.join(',');
    findUrl += query;

    return axios.get(findUrl).then(res => res.data);
  },
  async update(fields) {
    if (typeof fields !== 'object') return false;

    // eslint-disable-next-line no-underscore-dangle
    return axios.put(`${apiUrl}/${fields._id}`, fields);
  },
};
