import customFetch from '@/utils/customFetch';
import { create } from 'zustand';

interface ApiResponse<T = unknown> {
  status: boolean;
  data?: T;
  message?: string;
}

interface PatronFormData {
  token: string;
  [key: string]: any;
}

interface PatronData {
  [key: string]: any;
}

interface PatronState {
  isLoading: boolean;
  imgUrl: string;
  patronBarcode: string;
  setPatronBarcode: (barcode: string) => void;
  editPatron: (
    formData: PatronFormData,
    token: string | null
  ) => Promise<ApiResponse<PatronData>>;
  fetchPatron: (data: any) => Promise<{ status: boolean; data: any }>;
  setImgUrl: (imgUrl: string) => Promise<void>;
}

const usePatronStore = create<PatronState>((set) => ({
  isLoading: false,
  imgUrl: '',
  patronBarcode: '',

  editPatron: async (formData, token) => {
    console.log(formData);
    try {
      // Send the updated data to the server
      const res = await customFetch.patch('/patrons/edit/', {
        ...formData,
      });
      const data = res.data as PatronData;

      return { status: true, data };
    } catch (error: unknown) {
      console.log(error);
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return { status: false, message };
    }
  },

  fetchPatron: async (barcode: string) => {
    set({ isLoading: true });
    try {
      console.log('call');
      const { data }: { data: { patron?: { imgUrl?: string } } } =
        await customFetch.get(`/patrons/short-profile/${barcode}`);
      set({ isLoading: false, imgUrl: data?.patron?.imgUrl });
      return { status: true, data: data };
    } catch (error) {
      set({ isLoading: false, imgUrl: '' });
      return { status: false, data: null };
    }
  },

  setImgUrl: async (imgUrl: string) => {
    set({ imgUrl });
  },
  setPatronBarcode: async (barcode: string) => {
    set({ patronBarcode: barcode });
  },
}));

export default usePatronStore;
