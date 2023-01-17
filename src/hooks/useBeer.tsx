import { useState, useEffect } from "react";
import { Beer } from "../types/interfaces";
import useFetch from "./useFetch";

const useBeers = ({ id }: { id: string }) => {
  const { data, loading, error } = useFetch<Beer[]>(
    "https://api.punkapi.com/v2/beers/" + id,
    "GET"
  );
  const [beer, setBeer] = useState<Beer>();
  useEffect(() => {
    if (data) {
      setBeer(data[0]);
    }
  }, [data]);

  return { beer, loading, error };
};

export default useBeers;
