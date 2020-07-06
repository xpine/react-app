import request from './request';
import user from './user';
import role from './role';
import project from './project';
export default {
  request,
  uploadUrl: `${request.defaults.baseURL}/file/upload`,
  login: (config) => request.post('/auth/login', config),
  getMenuTree: (config) => request.get('/menu/getMenuTree', config),
  user,
  role,
  project,
};
