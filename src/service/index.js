import request from './request';
import user from './user';
import role from './role';
export default {
  login: (config) => request.post('/auth/login', config),
  getMenuTree: (config) => request.get('/menu/getMenuTree', config),
  user,
  role,
};
