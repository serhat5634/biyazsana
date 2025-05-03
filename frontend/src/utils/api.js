import axios from '../axios';

export const generateContent = (data) => axios.post('/generate', data);
