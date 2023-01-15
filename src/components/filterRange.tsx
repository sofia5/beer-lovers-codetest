import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import MultiRangeSlider from "../helpers/multiRangeSlider";

const FilterRange = ({ range, label }: { range: number[]; label: string }) => {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return (
    <div className="container text-white">
      <Form.Label className="text-uppercase ml-3">{label}</Form.Label>
      <MultiRangeSlider
        min={min}
        max={max}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    </div>
  );
};

FilterRange.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FilterRange;
