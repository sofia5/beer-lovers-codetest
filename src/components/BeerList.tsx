import useBeers from "../hooks/useBeers";
import BeerItem from "./beerItem";
import LoadingSpinner from "./loadingSpinner";
import { Table, Card } from "react-bootstrap";
import FilterRange from "./filterRange";
import SearchBar from "./searchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const BeerList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
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
          <div className="m-5">
            <div className="row d-flex justify-content-between align-items-baseline">
              <div className="col-1 filter-wrapper">
                <FontAwesomeIcon
                  className={`fa-xl filter-icon ${
                    filterOpen ? "text-success" : ""
                  }`}
                  icon={faFilter}
                  onClick={() => setFilterOpen(!filterOpen)}
                />
              </div>
              <div className="col-11 col-lg-6">
                <SearchBar items={beers}></SearchBar>
              </div>
            </div>
            {filterOpen}
            {filterOpen && (
              <div className="row mt-3">
                <h4 className="text-success">Filters</h4>
                <FilterRange
                  range={abvs}
                  label="Alcohol by volume"
                ></FilterRange>
              </div>
            )}
            <div className="row mt-5">
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
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default BeerList;
