import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://biyazsana-backend-1.onrender.com/api', // ✅ Backend URL'si doğru ve net
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // ✅ 30 saniyelik timeout değeri ideal
  withCredentials: true, // ✅ Girişli kullanıcılar için cookie/session taşır
});

// 🚨 Merkezi hata yakalayıcı (net hata mesajları)
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ Axios Hatası:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
