import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link to="/" className="text-success navbar-brand">
          <FontAwesomeIcon icon={faBeerMugEmpty} className="mx-3" />
          Beer lovers
        </Link>
        <Link className="col-auto" to="/random">
          <button className="btn btn-success">
            <FontAwesomeIcon className="fa-lg me-2" icon={faShuffle} />
            Surprise me
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
