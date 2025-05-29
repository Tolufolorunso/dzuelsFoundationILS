import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';

// types/patron.ts

type image_url = {
  public_id: string;
  secure_url: string;
};
export type Patron = {
  _id: string;
  fullName: string;
  image_url?: image_url;
  barcode: string;
  surname: string;
  patronType: string;
  points: number;
};

type ApiResponse = {
  status: boolean;
  data: Patron[];
  message?: string;
};

export const useFetchAllPatrons = () => {
  const [data, setData] = useState<Patron[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await customFetch.get('/patrons');

        const result = response.data as ApiResponse;
        if (result.status) {
          setData(result.data);
        } else {
          setError(result.message ?? 'Unknown error occurred');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
