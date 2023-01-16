import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  // Get search value on change
  useEffect(() => onChange(searchValue), [searchValue, onChange]);

  return (
    <>
      <div
        className="mb-3 input-group"
        onChange={(event) =>
          setSearchValue((event.target as HTMLInputElement).value)
        }
      >
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
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
