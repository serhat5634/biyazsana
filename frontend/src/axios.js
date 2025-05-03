// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://biyazsana-backend-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Maksimum 10 saniye beklesin
});

// Hata yakalama (opsiyonel ama faydalı)
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ Axios Hatası:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
