import { useState, useEffect } from "react";
import { Beer } from "../types/interfaces";
import useFetch from "./useFetch";

const useBeers = ({ id, random }: { id?: string; random: boolean }) => {
  const url = id
    ? "https://api.punkapi.com/v2/beers/" + id
    : random
    ? "https://api.punkapi.com/v2/beers/random"
    : undefined;

  if (!url) {
    throw new Error("Expected a URL to be present");
  }

  const { data, loading, error } = useFetch<Beer[]>(url, "GET");
  const [beer, setBeer] = useState<Beer>();
  useEffect(() => {
    if (data) {
      setBeer(data[0]);
    }
  }, [data]);

  return { beer, loading, error };
};

export default useBeers;
