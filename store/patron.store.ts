import { create } from 'zustand';

interface ApiResponse<T = unknown> {
  status: boolean;
  data?: T;
  errorMessage?: string;
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
  editPatron: (
    formData: PatronFormData,
    token: string | null
  ) => Promise<ApiResponse<PatronData>>;
  fetchPatron: (data: any) => Promise<{ status: boolean; data: any }>;
}

const usePatronStore = create<PatronState>((set) => ({
  isLoading: false,

  editPatron: async (formData, token) => {
    try {
      // Send the updated data to the server
      const response = await fetch(
        'https://dzuelsfoundation.vercel.app/api/patrons/edit/',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const data: PatronData = await response.json();
      console.log('Response data:', data);

      return { status: true, data };
    } catch (error: unknown) {
      console.error('Error updating data:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      return { status: false, errorMessage };
    }
  },

  fetchPatron: async (data: any) => {
    // Implement your fetchPatron logic here
    return { status: false, data: null };
  },
}));

export default usePatronStore;
