import request from './request';
export default {
  getProjects: (config) => request.get('/project', config),
  update: (id, data, config) => request.put(`/project/${id}`, data, config),
};
