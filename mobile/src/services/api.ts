import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = 'https://glic-api.onrender.com/api/glic';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const publicRoutes = ['/auth/login', '/users', '/mail'];

  if (!publicRoutes.includes(config.url!)) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

