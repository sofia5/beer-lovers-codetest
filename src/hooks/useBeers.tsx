import { useState, useEffect } from "react";
import { Beer } from "../types/interfaces";
import useFetch from "./useFetch";

const useBeers = ({ searchParams }: { searchParams?: URLSearchParams }) => {
  const url = searchParams
    ? `https://api.punkapi.com/v2/beers?${searchParams}&per_page=80`
    : "https://api.punkapi.com/v2/beers&per_page=80";

  const { data, loading, error } = useFetch<Beer[]>(url, "GET");
  const [beers, setBeers] = useState<Beer[]>([]);
  useEffect(() => {
    if (data) {
      setBeers(data);
    }
  }, [data]);

  return { beers, loading, error };
};

export default useBeers;
