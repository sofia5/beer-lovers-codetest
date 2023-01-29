import { useState, useEffect } from "react";

export type RequestMethod = "GET" | "PUT" | "POST" | "DELETE";

interface FetchData<T> {
  data?: T;
  requestStatus: number;
  error: any;
}

export const REQUEST_STATUS = {
  LOADING: 0,
  SUCCESS: 1,
  FAILURE: 2,
};

const useFetch = <T,>(
  url: string,
  method: RequestMethod,
  headers?: Headers
): FetchData<T> => {
  const [data, setData] = useState<T>();
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState<unknown>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          headers,
        });
        const result = await response.json();
        setData(result);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    };
    fetchData();
  }, [url, method, headers]);

  return { data, requestStatus, error };
};

export default useFetch;
