import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customFetch from '@/utils/customFetch';

type HoldType = {
  borrowingDate: string;
  dueDate: string;
  itemBarcode: string;
  patronBarcode: string;
  patronName: string;
  subtitle: '';
  title: string;
};

type CirculationState = {
  isLoading: boolean;
  holds: HoldType[];
  setHolds: (holds: HoldType[]) => void;
  checkIn: (
    patronBarcode: string,
    itemBarcode: string,
    point: number
  ) => Promise<{ status: boolean; message: string }>;
  fetchHolds: () => Promise<void>;
};

const useCirculationStore = create<CirculationState>((set) => ({
  isLoading: false,
  holds: [],
  setHolds: (holds) => set({ holds }),
  checkIn: async (patronBarcode, itemBarcode, point) => {
    set({ isLoading: true });
    try {
      const res = await customFetch.post('/circulation/checkin', {
        patronBarcode,
        itemBarcode,
        point,
      });
      console.log(39, res);
      set({ isLoading: false });
      return { status: true, message: 'Item checked in successfully' };
    } catch (error: any) {
      console.log(error);
      set({ isLoading: false });
      return { status: false, message: error.message };
    }
  },

  fetchHolds: async () => {
    set({ isLoading: true });
    try {
      const res = await customFetch.get<{ holds: HoldType[] }>(
        '/circaulation/holds'
      );
      const { holds } = res.data;
      set({ isLoading: false, holds });
    } catch (error) {
      console.error('Error fetching holds:', error);
    }
  },
}));

export default useCirculationStore;
