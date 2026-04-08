import { useState, useRef } from 'react';

export const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestRequestIdRef = useRef(0);

  const fetchData = async (fetcher: () => Promise<T>) => {
    const requestId = ++latestRequestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      if (requestId === latestRequestIdRef.current) {
        setData(result);
      }
    } catch (err) {
      if (requestId === latestRequestIdRef.current) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    } finally {
      if (requestId === latestRequestIdRef.current) {
        setLoading(false);
      }
    }
  };

  return { data, loading, error, fetchData };
};