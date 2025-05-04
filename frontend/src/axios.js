import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://biyazsana-backend-1.onrender.com/api',
  timeout: 10000,
  withCredentials: true,
});

// 🔑 JWT token her istekte gönderilsin
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios Hatası:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
