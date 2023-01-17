import useBeers from "../hooks/useBeers";
import BeerItem from "./BeerItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import styles from "../scss/beerList.module.scss";
import { Beer, BeerFilter } from "../types/interfaces";
import { useSearchParams } from "react-router-dom";
import PageItem from "./PageItem";

const BeerList = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const emptyFilter = {
    searchTerm: searchParams.get("searchTerm") ?? "",
    abv_gt: Number(searchParams.get("abv_gt")) || undefined,
    abv_lt: Number(searchParams.get("abv_lt")) || undefined,
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>([]);
  const [filter, setFilter] = useState<BeerFilter>(emptyFilter);

  const { beers, loading, error } = useBeers({});

  beers.sort((a, b) => {
    return b.abv - a.abv;
  });

  // Set filteredList
  useEffect(() => {
    let filteredBeers = [...beers];

    filteredBeers = filteredBeers.filter(
      (fb) =>
        fb.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        fb.tagline.toLowerCase().includes(filter.searchTerm.toLowerCase())

      // Also possible to match on the text on the item's detail pages

      // fb.description
      //   .toLowerCase()
      //   .includes(filter.searchTerm.toLowerCase()) ||
      // fb.food_pairing
      //   .join()
      //   .toLowerCase()
      //   .includes(filter.searchTerm.toLowerCase())
    );

    const params = new URLSearchParams();

    if (filter.searchTerm) {
      params.append("searchTerm", filter.searchTerm);
    }

    if (filter.abv_gt) {
      filteredBeers = filteredBeers.filter(
        (fb) => filter.abv_gt && fb.abv >= filter.abv_gt
      );

      params.append("abv_gt", filter.abv_gt.toString());
    }

    if (filter.abv_lt) {
      filteredBeers = filteredBeers.filter(
        (fb) => filter.abv_lt && fb.abv <= filter.abv_lt
      );

      params.append("abv_lt", filter.abv_lt.toString());
    }

    setSearchParams(params);

    setFilteredBeerList(filteredBeers);
  }, [filter, beers, setSearchParams]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const abvs = beers.map((b) => b.abv);

  return (
    <div className="card bg-dark border-dark">
      <div className="p-0 card-body">
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
              <SearchBar
                initialValue={filter.searchTerm}
                handleChange={(event) =>
                  setFilter({
                    ...filter,
                    searchTerm: (event.target as HTMLInputElement).value,
                  })
                }
              ></SearchBar>
            </div>
          </div>
          {filterOpen && (
            <div className="row mt-3">
              <h4 className="text-success">Filters</h4>
              <MultiRangeSlider
                min={Math.min(...abvs)}
                max={Math.max(...abvs)}
                handleChange={(event, minOrMax) =>
                  minOrMax === "min"
                    ? setFilter({
                        ...filter,
                        abv_gt: parseInt(
                          (event.target as HTMLInputElement).value
                        ),
                      })
                    : setFilter({
                        ...filter,
                        abv_lt: parseInt(
                          (event.target as HTMLInputElement).value
                        ),
                      })
                }
                label="Alcohol by volume"
              />
            </div>
          )}
          <div className="row mt-5">
            <div className="w-100">
              <table className="mb-0 p-3 table table-dark table-hover">
                <thead className={styles["table-head"]}>
                  <tr className="text-uppercase text-success">
                    <th>Name</th>
                    <th>Tagline</th>
                    <th>First brewed</th>
                    <th>Alcohol by volume</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBeerList.length > 0 &&
                    filteredBeerList.map((b) => (
                      <BeerItem key={b.id} beer={b} />
                    ))}
                </tbody>
              </table>
              {/* <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                  pages.map(p, index) => (<PageItem key="index" first="index === 0" last="index === pages.length - 1" index="index" onClick="changePage(index)"/>)
                   *
                </ul>
              </nav> */}

              {filteredBeerList.length === 0 && (
                <p className="mt-4 text-white">
                  No beers available with this filter
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerList;
