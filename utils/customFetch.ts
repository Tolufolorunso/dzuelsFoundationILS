// @ts-nocheck

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

let BASE_URL;

if (false) {
  BASE_URL = 'https://dzuelsfoundation.vercel.app/api';
} else {
  BASE_URL = 'http://192.168.1.58:3000/api';
}

// Base configuration
const customFetch = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token before each request
customFetch.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM2OTgxNzU2OWMzODBjMTBkN2ZjZTIiLCJpYXQiOjE3NDM1Mjc1MzYsImV4cCI6MTc0MzUzMTEzNn0.n-ZpdVbLSV_MNSuD1h6zJaBoLZPJV_Ao2aAJkn1r-I`;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
customFetch.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error?.response?.data?.message.includes('jwt') ||
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.data?.message.toLowerCase() === 'unauthorized'
    ) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      router.replace('/(auth)/login');
    }
    const message = error?.response?.data?.message || '';
    return Promise.reject(error?.response?.data?.message || error.message);
  }
);

export default customFetch;
