import { useState, useEffect } from "react";
import { Beer } from "../types/interfaces";
import useFetch from "./useFetch";

const useBeers = () => {
  const { data, loading, error } = useFetch<Beer[]>(
    "https://api.punkapi.com/v2/beers",
    "GET"
  );
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    if (data) {
      setBeers(data);
    }
  }, [data]);

  return { beers, loading, error };
};

export default useBeers;
