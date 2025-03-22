import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Job related API calls
export const jobService = {
  getAllJobs: async (params) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  getJobDetails: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  searchJobs: async (searchParams) => {
    const response = await api.get('/jobs/search', { params: searchParams });
    return response.data;
  },

  getJobCategories: async () => {
    const response = await api.get('/jobs/categories');
    return response.data;
  }
};

// Auth related API calls
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  register: async (userData) => {
    // Create properly formatted data for the backend
    const formattedData = {
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role
    };
    
    const response = await api.post('/auth/register', formattedData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  }
};

// Application related API calls
export const applicationService = {
  applyForJob: async (jobId) => {
    const response = await api.post(`/applications/${jobId}`);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get('/applications');
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}/status`, { status });
    return response.data;
  },

  withdrawApplication: async (applicationId) => {
    const response = await api.delete(`/applications/${applicationId}`);
    return response.data;
  }
};

// Analytics related API calls
export const analyticsService = {
  getDashboardStats: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getJobAnalytics: async (jobId) => {
    const response = await api.get(`/analytics/jobs/${jobId}`);
    return response.data;
  },

  getApplicationAnalytics: async () => {
    const response = await api.get('/analytics/applications');
    return response.data;
  }
};

export default api; 