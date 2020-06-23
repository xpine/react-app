import request from './request';
export default {
  delete: (id, config) => request.delete(`/user/${id}`, config),
};
