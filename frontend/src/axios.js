import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // ✅ Render veya canlı ortam için ideal: aynı domain kullanır
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 saniye sonra istek iptal olur
  withCredentials: true, // ✅ Girişli kullanıcılar için cookie/session taşır
});

// ❗ Hata yakalama (isteğe bağlı ama faydalı)
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ Axios Hatası:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
