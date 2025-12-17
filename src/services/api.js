import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const taskService = {
  getAllTasks: () => api.get('/todo'),
  getTaskById: (id) => api.get(`/todo/${id}`),
  createTask: (data) => api.post('/todo', data),
  updateTask: (id, data) => api.put(`/todo/${id}`, data),
  deleteTask: (id) => api.delete(`/todo/${id}`),
};

export default api;
