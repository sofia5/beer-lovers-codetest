import { useState, useEffect } from "react";
import { RequestMethod } from "../types/types";

interface FetchData<T> {
  data?: T;
  loading: boolean;
  error: any;
}

const useFetch = <T,>(
  url: string,
  method: RequestMethod,
  headers?: Headers
): FetchData<T> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(url, {
          method,
          headers,
        });
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, method, headers]);

  return { data, loading, error };
};

export default useFetch;
