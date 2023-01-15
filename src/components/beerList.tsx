import useBeers from "../hooks/useBeers";
import BeerItem from "./beerItem";
import LoadingSpinner from "./loadingSpinner";
import { Table, Card } from "react-bootstrap";
import SearchBar from "./searchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MultiRangeSlider from "./multiRangeSlider";
import styles from "../scss/beerList.module.scss";
import { Beer } from "../types/interfaces";

const BeerList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>([]);
  const [abvsFilter, setAbvsFilter] = useState<Beer[]>([]);
  const { beers, loading, error } = useBeers();

  beers.sort((a, b) => {
    return b.abv - a.abv;
  });

  // Initialize abvsFilter to the original list of beers
  useEffect(() => {
    setFilteredBeerList(beers);
    setAbvsFilter(beers);
  }, [beers]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const setNewAbvsFilter = (min: number, max: number) => {
    console.log(`min = ${min}, max = ${max}`);
    // let p2 = Object.assign({}, beers);
    // console.log(p2);
    // setFilteredBeerList(p2.filter((b) => min <= b.abv && b.abv <= max));

    // setAbvsFilter(
    //   Math.min(...abvs) < min || max < Math.max(...abvs)
    //     ? p2.filter((b) => min <= b.abv && b.abv <= max)
    //     : p2
    // );
  };

  const abvs = beers.map((b) => b.abv);

  // const filteredBeerList = abvsFilter;

  return (
    <>
      <Card border="dark" bg="dark">
        <Card.Body className="p-0">
          <div className="m-5">
            <div className="row d-flex justify-content-between align-items-baseline">
              <div className="col-1 filter-wrapper">
                <FontAwesomeIcon
                  className={`fa-xl ${styles["filter-icon"]} ${
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
            {filterOpen && (
              <div className="row mt-3">
                <h4 className="text-success">Filters</h4>
                <MultiRangeSlider
                  min={Math.min(...abvs)}
                  max={Math.max(...abvs)}
                  onChange={
                    // ({ min, max }) => console.log(`min = ${min}, max = ${max}`)
                    ({ min, max }) => setNewAbvsFilter(min, max)
                  }
                  label="Alcohol by volume"
                />
              </div>
            )}
            <div className="row mt-5">
              <div className="w-100">
                <Table hover variant="dark" className="mb-0 p-3">
                  <thead className={styles["table-head"]}>
                    <tr className="text-uppercase text-success">
                      <th>Name</th>
                      <th>Tagline</th>
                      <th>Alcohol by volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBeerList.length > 0 &&
                      filteredBeerList.map((b) => (
                        <BeerItem key={b.id} beer={b} />
                      ))}
                    {/* {filteredBeerList.length === 0 && (
                      <p>No beers available with this filter</p>
                    )} */}
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
