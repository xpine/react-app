import request from './request';
export default {
  delete: (id, config) => request.delete(`/user/${id}`, config),
  create: (data, config) => request.post('/user', data, config),
  update: (id, data, config) => request.put(`/user/${id}`, data, config),
  getCurrent: (config) => request.get('/user', config),
};
