import request from './request';
export default {
  login: (config) => request.post('/auth/login', config),
  getMenuTree: (config) => request.get('/menu/getMenuTree', config),
};
