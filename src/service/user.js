import request from './request';
export default {
  getUsers: (config) => {
    console.log(config, 123);
    return request.get('/user/page', config);
  },
};
