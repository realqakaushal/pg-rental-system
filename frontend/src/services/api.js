import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Property APIs
export const properties = {
  getAll: (params) => api.get('/properties', { params }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
};

// Room APIs
export const rooms = {
  getAll: (params) => api.get('/rooms', { params }),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  delete: (id) => api.delete(`/rooms/${id}`),
};

// Application APIs
export const applications = {
  submit: (data) => api.post('/applications', data),
  getAll: (params) => api.get('/applications', { params }),
  getById: (id) => api.get(`/applications/${id}`),
  getByRoom: (roomId) => api.get(`/applications/room/${roomId}`),
  getUserApplications: (userId) => api.get(`/applications/user/${userId}`),
  updateStatus: (id, status, notes) => api.put(`/applications/${id}/status`, { status, notes }),
  delete: (id) => api.delete(`/applications/${id}`),
};

// Payment APIs
export const payments = {
  process: (data) => api.post('/payments', data),
  getUserPayments: (userId) => api.get(`/payments/user/${userId}`),
  getUserSummary: (userId) => api.get(`/payments/user/${userId}/summary`),
  getPendingPayments: (userId) => api.get(`/payments/user/${userId}/pending`),
  getReceipt: (paymentId) => api.get(`/payments/${paymentId}/receipt`),
};

export default api;