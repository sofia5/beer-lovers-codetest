import { useParams } from "react-router-dom";
import NotFound from "./notFound";
import useBeers from "../hooks/useBeers";
import LoadingSpinner from "./loadingSpinner";
import styles from "../scss/beerDetails.module.scss";
import BackButton from "./backButton";

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
