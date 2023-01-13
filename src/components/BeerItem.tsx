import { Beer } from "../types/interfaces";
import PropTypes from "prop-types";

const BeerItem = ({ beer }: { beer: Beer }) => {
  return (
    <>
      <h2>{beer.name}</h2>
      <p>{beer.tagline}</p>
      <img src={beer.image_url} alt={beer.name} />
      <p>ABV: {beer.abv}</p>
    </>
  );
};

BeerItem.propTypes = {
  beer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    abv: PropTypes.number.isRequired,
  }).isRequired,
};

export default BeerItem;
