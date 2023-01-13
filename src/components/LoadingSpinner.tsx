const LoadingIndicator = () => {
  return (
    <h3>
      <div className="text-center">
        <i v-if="showSpinner" className="fas fa-spinner fa-spin"></i>
      </div>
    </h3>
  );
};

export default LoadingIndicator;
