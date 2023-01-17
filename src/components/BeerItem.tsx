import { Beer } from "../types/interfaces";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BeerItem = ({ beer }: { beer: Beer }) => {
  const navigate = useNavigate();

  const redirect = (id: number) => {
    navigate(`/${id}`);
  };

  return (
    <tr onClick={() => redirect(beer.id)}>
      <td>{beer.name}</td>
      <td>
        <em>{beer.tagline}</em>
      </td>
      <td>{beer.first_brewed}</td>
      <td>{beer.abv}</td>
    </tr>
  );
};

BeerItem.propTypes = {
  beer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    first_brewed: PropTypes.string.isRequired,
    abv: PropTypes.number.isRequired,
  }).isRequired,
};

export default BeerItem;
