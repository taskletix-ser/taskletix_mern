import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://82.29.165.109:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Contact form API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  health: () => api.get('/contact/health'),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  getSubmissions: (params) => api.get('/admin/submissions', { params }),
  exportPDF: () => api.get('/admin/export/pdf', { responseType: 'blob' }),
  getStats: () => api.get('/admin/stats'),
};

// Health check API
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
