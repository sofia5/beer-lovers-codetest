import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import useBeer from "../hooks/useBeer";
import LoadingSpinner from "./LoadingSpinner";
import styles from "../scss/BeerDetails.module.scss";
import BackButton from "./BackButton";
import BeerColor from "./BeerColor";

const BeerItem = () => {
  let { id } = useParams<"id">();

  if (!id) {
    throw new Error("ID should be set here");
  }

  const { beer, loading, error } = useBeer({ id });

  if (!id) {
    return <NotFound />;
  } else if (loading) {
    return <LoadingSpinner fullPage={true} />;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BackButton to="/" />

      {beer && (
        <div className="row full-page d-flex align-items-center">
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
            <div className="col-12 col-md-8 mt-2 mb-3">
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${beer.abv}%` }}
                  aria-valuenow={beer.abv}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <small>{beer.abv}%</small>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <small>{0}%</small>
                <small>{100}%</small>
              </div>
            </div>

            {beer.ebc && (
              <>
                <label className="text-uppercase text-success">
                  <strong>Color</strong>
                </label>
                <BeerColor ebc={beer.ebc} />
              </>
            )}

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
              {beer.food_pairing?.map((pairing, index) => (
                <li key={index}>{pairing}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BeerItem;
