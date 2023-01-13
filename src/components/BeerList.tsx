import useBeers from "../hooks/useBeers";
import BeerItem from "./beerItem";
import LoadingSpinner from "./loadingSpinner";
import { Table, Card } from "react-bootstrap";
import FilterRange from "./filterRange";

const BeerList = () => {
  const { beers, loading, error } = useBeers();

  beers.sort((a, b) => {
    return b.abv - a.abv;
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const abvs = beers.map((b) => b.abv);

  return (
    <>
      <Card border="dark" bg="dark">
        <Card.Body className="p-0">
          <div className="row d-flex m-4">
            <div className="w-100 mb-4">
              <FilterRange range={abvs}></FilterRange>
            </div>

            <div className="w-100">
              <Table hover variant="dark" className="mb-0 p-3">
                <thead className="table-head">
                  <tr className="text-uppercase text-success">
                    <th>Name</th>
                    <th>Tagline</th>
                    <th>Alcohol by volume</th>
                  </tr>
                </thead>
                <tbody>
                  {beers.map((b) => (
                    <BeerItem key={b.id} beer={b} />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default BeerList;
