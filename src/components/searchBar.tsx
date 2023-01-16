import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "react";
import PropTypes from "prop-types";

const SearchBar = ({
  handleChange,
}: {
  handleChange: (event: FormEvent<HTMLDivElement>) => void;
}) => {
  return (
    <>
      <div className="mb-3 input-group" onChange={handleChange}>
        <div className="input-group-text">
          <FontAwesomeIcon className="text-success" icon={faSearch} />
        </div>
        <input
          placeholder="Search"
          aria-label="Search"
          className="form-control"
        />
      </div>
    </>
  );
};

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
