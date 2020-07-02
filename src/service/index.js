import request from './request';
import user from './user';
import role from './role';
import project from './project';
export default {
  login: (config) => request.post('/auth/login', config),
  getMenuTree: (config) => request.get('/menu/getMenuTree', config),
  user,
  role,
  project,
};
