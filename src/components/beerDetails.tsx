import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import useBeers from "../hooks/useBeers";
import LoadingSpinner from "./LoadingSpinner";
import styles from "../scss/beerDetails.module.scss";
import BackButton from "./BackButton";

const BeerItem = () => {
  let { id } = useParams<"id">();

  if (!id) {
    throw new Error("ID should be set here");
  }

  const { beers, loading, error } = useBeers({
    searchParams: new URLSearchParams({ ids: id }),
  });

  const beer = beers[0];

  if (!id) {
    return <NotFound />;
  } else if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BackButton to="/" />
      <div className="full-page d-flex align-items-center">
        {beer && (
          <div className="row d-flex align-items-center">
            <div className="col-4">
              <img
                className={styles["image-shadow"]}
                src={beer.image_url}
                alt={beer.name}
                height="500px"
              />
            </div>

            <div className="col-8 text-white">
              <h1>{beer.name}</h1>
              <h5>
                <em>{beer.tagline}</em>
              </h5>

              <label className="text-uppercase text-success mt-5">
                <strong>Alcohol by volume</strong>
              </label>
              <p>{beer.abv}</p>

              <label className="text-uppercase text-success">
                <strong>First brewed</strong>
              </label>
              <p>{beer.first_brewed}</p>

              <label className="text-uppercase text-success">
                <strong>Description</strong>
              </label>
              <p>{beer.description}</p>

              <label className="text-uppercase text-success">
                <strong>Food pairing</strong>
              </label>
              <ul>
                {beer.food_pairing.map((pairing, index) => (
                  <li key={index}>{pairing}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BeerItem;
