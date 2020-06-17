import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 60000,
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => Promise.reject(error),
);
export default instance;
