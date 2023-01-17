import PropTypes from "prop-types";
import data from "../data/beerColors.json";
import styles from "../scss/BeerColor.module.scss";

const BeerColorConverter = ({ ebc }: { ebc: number }) => {
  const roundedEbc = Math.round(ebc);
  const beerColorItem = data.filter((d) => d.ebc_number === roundedEbc)[0];
  return (
    <div className="w-100 mb-3">
      <div
        className={styles.dot}
        style={{ backgroundColor: beerColorItem.color_code }}
      ></div>
    </div>
  );
};

BeerColorConverter.propTypes = {
  ebc: PropTypes.number.isRequired,
};

export default BeerColorConverter;
