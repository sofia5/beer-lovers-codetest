import { Beer } from "../types/interfaces";
import PropTypes from "prop-types";

const BeerItem = ({ beer }: { beer: Beer }) => {
  return (
    <>
      <tr>
        {/* <img src={beer.image_url} alt={beer.name} /> */}
        <td>{beer.name}</td>
        <td>{beer.tagline}</td>
        <td>{beer.abv}</td>
      </tr>
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
