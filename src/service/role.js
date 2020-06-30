import request from './request';
export default {
  delete: (id, config) => request.delete(`/role/${id}`, config),
  create: (data, config) => request.post('/role', data, config),
  update: (id, data, config) => request.put(`/role/${id}`, data, config),
};
