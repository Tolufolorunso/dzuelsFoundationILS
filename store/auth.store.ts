import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: boolean; message: string }>;
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
      const response = await fetch(
        'https://dzuelsfoundation.vercel.app/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || 'Login failed');
      }
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, isLoading: false });
      return { status: true, message: data.message };
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.message || 'Login failed');
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null });
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      set({ user, token });
    } catch (error) {
      console.log('Auth check failed', error);
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
