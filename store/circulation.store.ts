import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CirculationState {
  loading: boolean;
  checkIn: (
    patronBarcode: string,
    itemBarcode: string,
    point: number
  ) => Promise<{ status: boolean; message: string }>;
}

const useCirculationStore = create<CirculationState>((set) => ({
  loading: false,
  checkIn: async (patronBarcode, itemBarcode, point) => {
    set({ loading: true });
    try {
      const response = await fetch(
        'http://localhost:3000/api/circulation/checkin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patronBarcode, itemBarcode, point }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errorMessage || 'Login failed');
      }

      set({ loading: false });
      return { status: true, message: data.message };
    } catch (error: any) {
      set({ loading: false });
      throw new Error(error.message || 'Login failed');
    }
  },
}));

export default useCirculationStore;
