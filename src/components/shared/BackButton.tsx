import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ to }: { to: string }) => {
  return (
    <Link to={to}>
      <button className="btn text-uppercase text-success">
        <FontAwesomeIcon className="fa-lg" icon={faArrowLeftLong} />
        <span className="mx-3">Back</span>
      </button>
    </Link>
  );
};

export default BackButton;
