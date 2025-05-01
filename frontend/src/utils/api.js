import axios from 'axios';

const API_URL =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  'http://localhost:5000/api/generate';

export const generateContent = (data) => axios.post(API_URL, data);
