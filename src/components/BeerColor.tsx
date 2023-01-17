import PropTypes from "prop-types";
import data from "../data/beerColors.json";
import styles from "../scss/BeerColor.module.scss";
import { EbcBeerColor } from "../types/interfaces";

const BeerColor = ({ ebc }: { ebc: number }) => {
  const roundedEbc = Math.round(ebc);
  let beerColorItem: EbcBeerColor;
  if (roundedEbc < 1) {
    beerColorItem = { ebc_number: 0, color_code: "white" };
  } else if (roundedEbc > 30) {
    beerColorItem = { ebc_number: 31, color_code: "black" };
  } else {
    beerColorItem = data.filter((d) => d.ebc_number === roundedEbc)[0];
  }

  return (
    <div className="w-100 mb-3">
      <div
        className={styles.dot}
        style={{ backgroundColor: beerColorItem.color_code }}
      ></div>
    </div>
  );
};

BeerColor.propTypes = {
  ebc: PropTypes.number.isRequired,
};

export default BeerColor;
