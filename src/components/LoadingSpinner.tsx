import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIndicator = ({ fullPage }: { fullPage: boolean }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${
        fullPage ? "full-page" : undefined
      }`}
    >
      <FontAwesomeIcon
        data-testid="loading-spinner"
        className="fa-spin fa-xl text-success"
        icon={faSpinner}
      />
    </div>
  );
};

export default LoadingIndicator;
