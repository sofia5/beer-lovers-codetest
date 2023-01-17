import useBeers from "../hooks/useBeers";
import BeerItem from "./BeerItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import styles from "../scss/BeerList.module.scss";
import { Beer, BeerFilter } from "../types/interfaces";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

const BeerList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { hash } = useLocation();

  const emptyFilter = {
    searchTerm: searchParams.get("searchTerm") ?? "",
    abv_gt: Number(searchParams.get("abv_gt")) || undefined,
    abv_lt: Number(searchParams.get("abv_lt")) || undefined,
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>([]);
  const [pageData, setPageData] = useState<Beer[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState<BeerFilter>(emptyFilter);

  const { beers, loading, error } = useBeers({ searchParams });

  const items_per_page = 25;

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

  //Set page data
  useEffect(() => {
    const page = [...filteredBeerList];

    setPageNumber(hash ? parseInt(hash.split("-")[1]) : 1);

    setPageData(
      page.filter(
        (p, index) =>
          index > (pageNumber - 1) * items_per_page &&
          index <= (pageNumber - 1) * items_per_page + items_per_page
      )
    );
  }, [hash, filteredBeerList, pageNumber]);

  if (error) {
    return <div>{error}</div>;
  }

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
                min={0}
                // max abv for existing beer: 67.5
                max={70}
                initialMin={filter.abv_gt ?? 0}
                initialMax={filter.abv_lt ?? 70}
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
                    !loading &&
                    pageData.map((b) => <BeerItem key={b.id} beer={b} />)}
                </tbody>
              </table>
              {loading && (
                <div className="mt-3">
                  <LoadingSpinner fullPage={false} />
                </div>
              )}
              {Math.floor(filteredBeerList.length / items_per_page) >= 1 && (
                <Pagination
                  pages={Math.floor(filteredBeerList.length / items_per_page)}
                  activePage={pageNumber}
                />
              )}
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
