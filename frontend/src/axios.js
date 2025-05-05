import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://biyazsana-backend-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true,
});

// 🔑 Otomatik JWT ekleme (Axios Request Interceptor)
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // token sessionStorage'dan alınır
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 🚨 Merkezi hata yakalayıcı (Axios Response Interceptor)
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ Axios Hatası:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
