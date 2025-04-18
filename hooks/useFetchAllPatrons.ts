import { useEffect, useState } from 'react';

// types/patron.ts
export interface Patron {
  _id: string;
  fullName: string;
  imgUrl?: string;
  barcode: string;
  surname: string;
  patronType: string;
  points: number;
}

interface ApiResponse {
  status: boolean;
  data: Patron[];
  errorMessage?: string;
}

export const useFetchAllPatrons = () => {
  const [data, setData] = useState<Patron[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://dzuelsfoundation.vercel.app/api/patrons'
        );
        const result: ApiResponse = await response.json();

        if (result.status) {
          setData(result.data);
        } else {
          console.error('Failed to fetch patrons:', result.errorMessage);
          setError(result.errorMessage ?? 'Unknown error occurred');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
