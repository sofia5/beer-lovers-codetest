import useBeers from "../hooks/useBeers";
import BeerItem from "./BeerItem";
import LoadingSpinner from "./LoadingSpinner";

const BeerList = () => {
  const { beers, loading, error } = useBeers();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {beers.map((b) => (
        <BeerItem key={b.id} beer={b} />
      ))}
    </>
  );
};

export default BeerList;
