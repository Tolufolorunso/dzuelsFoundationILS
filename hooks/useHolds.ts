import { useState, useEffect } from "react";

export function useHolds() {
  const [holds, setHolds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolds = async () => {
      try {
        const response = await fetch(
          "https://dzuelsfoundation.vercel.app/api/circaulation/holds"
        );
        const data = await response.json();
        if (data.status) {
          setHolds(data.holds);
        }
      } catch (error) {
        console.error("Error fetching holds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolds();
  }, []);

  return { holds, loading };
}
