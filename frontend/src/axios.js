import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.biyazsana.com/api', // ✅ Yeni backend adresin
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 saniyelik timeout
  withCredentials: true, // ✅ Cookie ve session taşıma için
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
