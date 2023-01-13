import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIndicator = () => {
  return (
    <div className="text-center text-success">
      <FontAwesomeIcon className="fa-spin fa-xl" icon={faSpinner} />
    </div>
  );
};

export default LoadingIndicator;
