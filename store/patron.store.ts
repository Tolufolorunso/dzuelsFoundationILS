import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PatronState {
  editPatron: (formData: any) => Promise<{ status: boolean; data: any }>;
  fetchPatron: (data: any) => Promise<{ status: boolean; data: any }>;
}

const usePatronStore = create<PatronState>((set) => ({
  isLoading: false,

  editPatron: async (formData) => {
    try {
      // Send the updated data to the server
      const response = await fetch(
        `https://dzuelsfoundation.vercel.app/api/patrons/update-profile/${formData.barcode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const data = await response.json();

      return { status: true, data };
    } catch (error) {
      console.error('Error updating data:', error);
    }
  },
}));

export default usePatronStore;
