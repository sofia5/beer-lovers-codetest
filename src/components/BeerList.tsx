import useBeers from "../hooks/useBeers";
import BeerItem from "./BeerItem";
import LoadingSpinner from "./LoadingSpinner";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MultiRangeSlider, { MinOrMax } from "./MultiRangeSlider";
import styles from "../scss/BeerList.module.scss";
import { BeerFilter } from "../types/interfaces";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import { REQUEST_STATUS } from "../hooks/useFetch";

const BeerList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const newFilter = {
    beer_name: searchParams.get("beer_name") ?? "",
    abv_gt: Number(searchParams.get("abv_gt")) || undefined,
    abv_lt: Number(searchParams.get("abv_lt")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<BeerFilter>(newFilter);
  const { beers, requestStatus, error } = useBeers({ searchParams });

  beers.sort((a, b) => {
    return b.abv - a.abv;
  });

  // Set filters as search params
  useEffect(() => {
    const params = new URLSearchParams();

    if (filter.beer_name) {
      params.append("beer_name", filter.beer_name.replace(" ", "_"));
    }

    if (filter.abv_gt) {
      params.append("abv_gt", filter.abv_gt.toString());
    }

    if (filter.abv_lt) {
      params.append("abv_lt", filter.abv_lt.toString());
    }

    if (filter.page) {
      params.append("page", filter.page.toString());
    }

    setSearchParams(params);
  }, [filter, setSearchParams]);

  const setSearchTerm = (event: React.FormEvent<HTMLDivElement>) => {
    filter.page = undefined;
    setFilter({
      ...filter,
      beer_name: (event.target as HTMLInputElement).value,
    });
  };

  const setAbvFilter = (
    event: React.FormEvent<HTMLDivElement>,
    minOrMax: MinOrMax
  ) => {
    filter.page = undefined;
    minOrMax === "min"
      ? setFilter({
          ...filter,
          abv_gt: parseInt((event.target as HTMLInputElement).value),
        })
      : setFilter({
          ...filter,
          abv_lt: parseInt((event.target as HTMLInputElement).value),
        });
  };

  const setPage = (page: number) => {
    setFilter({
      ...filter,
      page: page,
    });
  };

  if (requestStatus === REQUEST_STATUS.FAILURE) {
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
                initialValue={filter.beer_name}
                handleChange={setSearchTerm}
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
                handleChange={setAbvFilter}
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
                    <th>Alcohol by volume</th>
                    <th>First brewed</th>
                    <th>Tagline</th>
                  </tr>
                </thead>
                <tbody className={`${styles["beer-table-content"]}`}>
                  {requestStatus === REQUEST_STATUS.SUCCESS &&
                    beers.map((b) => <BeerItem key={b.id} beer={b} />)}
                </tbody>
              </table>
              {requestStatus === REQUEST_STATUS.LOADING && (
                <div className="mt-3">
                  <LoadingSpinner fullPage={false} />
                </div>
              )}
              {beers.length === 0 &&
                requestStatus === REQUEST_STATUS.SUCCESS && (
                  <p className="mt-4 text-white">
                    No beers available with this filter
                  </p>
                )}
              <Pagination
                handleClick={setPage}
                activePage={filter.page ?? 1}
                lastPage={beers.length < 25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerList;
