import { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../scss/multiRangeSlider.module.scss";

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  label,
}: {
  min: number;
  max: number;
  onChange: (range: { min: number; max: number }) => void;
  label: string;
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      (range.current as HTMLElement).style.left = `${minPercent}%`;
      (range.current as HTMLElement).style.width = `${
        maxPercent - minPercent
      }%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      (range.current as HTMLElement).style.width = `${
        maxPercent - minPercent
      }%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container mb-5">
      <label className="text-uppercase text-white mt-4 mb-4">{label}</label>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className={`${styles.thumb} ${styles["thumb--left"]}`}
          // style={{ zIndex: minVal > max - 100 && "5" }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={`${styles.thumb} ${styles["thumb--right"]}`}
        />

        <div className={styles["slider"]}>
          <div className={styles["slider-track"]} />
          <div ref={range} className={styles["slider-range"]} />
          <div className={styles["slider-left-value"]}>{minVal}</div>
          <div className={styles["slider-right-value"]}>{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
