import axios from 'axios';
import { message } from 'antd';
import utils from '../utils';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 60000,
});

instance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${utils.token.get()}`;
  }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    message.error(error.response?.data?.message || error.message);
    return Promise.reject(error);
  },
);
export default instance;
