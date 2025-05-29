// @ts-nochec
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customFetch from '@/utils/customFetch';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  name: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
  message: string;
  status: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (
    name: string,
    username: string,
    phone: string,
    token: string | null
  ) => Promise<{ status: boolean; message: string }>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const res = await customFetch.post<LoginResponse>('/auth/login', {
        username,
        password,
      });

      const { token, user, status, message } = res.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      set({ user: user, token: token, isLoading: false });
      router.replace('/(tabs)');
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || error || 'Login failed');
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    console.log('Logging out...');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null });
    router.replace('/(auth)/login');
  },

  checkAuth: async () => {
    console.log('Checking auth...');
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      set({ user, token });
    } catch (error) {
      set({ user: null, token: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateUser: async (name, username, phone, token) => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        'https://dzuelsfoundation.vercel.app/api/users/edit',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            username,
            phone,
          }),
        }
      );
      if (!res.ok) {
        throw new Error('Failed to update data');
      }
      const result = await res.json();
      set({ user: result.user });
      return { status: true, message: result.message };
    } catch (error: any) {
      return { status: false, message: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
