import { useParams } from "react-router-dom";
import NotFound from "./notFound";
import useBeers from "../hooks/useBeers";
import LoadingSpinner from "./loadingSpinner";

const BeerItem = () => {
  let { id } = useParams<"id">();
  const { beers, loading, error } = useBeers();

  if (!id) {
    return <NotFound />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const beer = beers.find((b) => b.id.toString() === id);

  return (
    <>
      {beer && (
        <>
          <img src={beer.image_url} alt={beer.name} />
          <h3>{beer.name}</h3>
          <h4>{beer.tagline}</h4>

          <label>Alcohol by volume</label>
          <p>{beer.abv}</p>

          <label>Description</label>
          <p>{beer.description}</p>
        </>
      )}
    </>
  );
};

export default BeerItem;
