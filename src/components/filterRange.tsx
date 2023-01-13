import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterRange = ({ range }: { range: number[] }) => {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return (
    <>
      <FontAwesomeIcon className="text-success" icon={faFilter} />
      {min}
      {max}
    </>
  );
};

FilterRange.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FilterRange;
