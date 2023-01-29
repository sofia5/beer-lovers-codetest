import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBeer from "../../hooks/useBeer";

const RandomizeBeer = () => {
  const { beer } = useBeer({ id: undefined, random: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (beer) {
      navigate(`/${beer.id}`);
    }
  }, [navigate, beer]);
  return <></>;
};

export default RandomizeBeer;
