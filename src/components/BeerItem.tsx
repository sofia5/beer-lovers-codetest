import { Beer } from "../types/interfaces";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../scss/BeerItem.module.scss";
import dateFormatter from "../helpers/DateFormatter";
import { useEffect, useState } from "react";

const BeerItem = ({ beer }: { beer: Beer }) => {
  const [dateFirstBrewed, setDateFirstBrewed] = useState<Date>();
  const navigate = useNavigate();

  const redirect = (id: number) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    const dateArrayFirstBrewed = beer.first_brewed.split("/");
    setDateFirstBrewed(
      dateArrayFirstBrewed.length === 1
        ? new Date(parseInt(dateArrayFirstBrewed[0]), 1)
        : new Date(
            parseInt(dateArrayFirstBrewed[1]),
            parseInt(dateArrayFirstBrewed[0]) - 1
          )
    );
  }, [beer]);

  return (
    <tr onClick={() => redirect(beer.id)}>
      <td>{beer.name}</td>

      <td>{dateFormatter.format(dateFirstBrewed)}</td>
      <td>{beer.abv}%</td>
      <td>
        <em className={styles["beer-tagline"]}>{beer.tagline}</em>
      </td>
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
