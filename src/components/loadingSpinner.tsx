import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIndicator = () => {
  return (
    <div className="full-page d-flex align-items-center justify-content-center">
      <FontAwesomeIcon
        data-testid="loading-spinner"
        className="fa-spin fa-xl text-success"
        icon={faSpinner}
      />
    </div>
  );
};

export default LoadingIndicator;
