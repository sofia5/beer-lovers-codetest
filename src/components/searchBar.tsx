import PropTypes from "prop-types";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ items }: { items: any[] }) => {
  return (
    <>
      <InputGroup
        className="mb-3"
        onChange={(e) => console.log((e.target as HTMLInputElement).value)}
      >
        <InputGroup.Text>
          <FontAwesomeIcon className="text-success" icon={faSearch} />
        </InputGroup.Text>
        <Form.Control placeholder="Search" aria-label="Search" />
      </InputGroup>
    </>
  );
};

SearchBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SearchBar;
