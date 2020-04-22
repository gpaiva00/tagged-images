import axios from 'axios';

const api =  axios.create({
  baseURL: 'http://10.0.0.109:3333'
  // baseURL: 'https://tagged-images.herokuapp.com'
});

export default api;