import { useState, useEffect } from "react";
import { Beer } from "../types/interfaces";
import useFetch from "./useFetch";

const useBeers = ({ searchParams }: { searchParams?: URLSearchParams }) => {
  const url = searchParams
    ? `https://api.punkapi.com/v2/beers?${searchParams}`
    : "https://api.punkapi.com/v2/beers";

  const { data, requestStatus, error } = useFetch<Beer[]>(url, "GET");
  const [beers, setBeers] = useState<Beer[]>([]);
  useEffect(() => {
    if (data) {
      setBeers(data);
    }
  }, [data]);

  return { beers, requestStatus, error };
};

export default useBeers;
