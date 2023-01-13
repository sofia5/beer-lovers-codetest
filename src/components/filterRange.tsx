import PropTypes from "prop-types";

const FilterRange = ({ range, label }: { range: number[]; label: string }) => {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return (
    <div className="text-white">
      <label>{label}</label>
      {min}
      {max}
    </div>
  );
};

FilterRange.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FilterRange;
