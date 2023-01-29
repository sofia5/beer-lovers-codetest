import useBeers from "../../hooks/useBeers";
import BeerItem from "./BeerItem";
import LoadingSpinner from "../shared/LoadingSpinner";
import SearchBar from "../filter/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MultiRangeSlider, { MinOrMax } from "../filter/MultiRangeSlider";
import styles from "../../scss/BeerList.module.scss";
import { Beer, BeerFilter } from "../../types/interfaces";
import { useSearchParams } from "react-router-dom";
import Pagination from "../table/Pagination";
import { REQUEST_STATUS } from "../../hooks/useFetch";
import sortBeers from "../../helpers/sortBeers";
import SortableTableHeader, {
  ActiveTableHeader,
} from "../table/SortableTableHeader";

const BeerList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const newFilter = {
    beer_name: searchParams.get("beer_name") ?? "",
    abv_gt: Number(searchParams.get("abv_gt")) || undefined,
    abv_lt: Number(searchParams.get("abv_lt")) || undefined,
    ebc_gt: Number(searchParams.get("ebc_gt")) || undefined,
    ebc_lt: Number(searchParams.get("ebc_lt")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<BeerFilter>(newFilter);
  const [sortedBeers, setSortedBeers] = useState<Beer[]>();
  const [activeTableHeader, setActiveTableHeader] =
    useState<ActiveTableHeader>();
  const { beers, requestStatus, error } = useBeers({ searchParams });

  useEffect(() => {
    beers.length > 0 ? setSortedBeers(beers) : setSortedBeers(undefined);
  }, [beers]);

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

    if (filter.ebc_gt) {
      params.append("ebc_gt", filter.ebc_gt.toString());
    }

    if (filter.ebc_lt) {
      params.append("ebc_lt", filter.ebc_lt.toString());
    }

    if (filter.page) {
      params.append("page", filter.page.toString());
    }

    setSearchParams(params);
    if (activeTableHeader) {
      setSortedBeers(
        sortBeers(beers, activeTableHeader.id, activeTableHeader.ascOrDesc)
      );
    }
  }, [activeTableHeader, beers, filter, setSearchParams]);

  const updateSearchTerm = (event: React.FormEvent<HTMLDivElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      beer_name: (event.target as HTMLInputElement).value,
      page: undefined,
    }));
  };

  const updateRangeFilter = (
    event: React.FormEvent<HTMLDivElement>,
    minOrMax: MinOrMax,
    type: keyof Beer
  ) => {
    setFilter((prevFilter) => {
      const value = parseInt((event.target as HTMLInputElement).value);
      return {
        ...prevFilter,
        [minOrMax === "min" ? type + "_gt" : type + "_lt"]: value,
        page: undefined,
      };
    });
  };

  const updatePage = (page: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page,
    }));
  };

  const updateActiveHeader = (newActive: ActiveTableHeader) => {
    setActiveTableHeader(newActive);
    setSortedBeers(sortBeers(beers, newActive.id, newActive.ascOrDesc));
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
                className={`fa-xl action ${styles["filter-icon"]} ${
                  filterOpen ? "text-success" : ""
                }`}
                icon={faFilter}
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </div>
            <div className="col-11 col-lg-6">
              <SearchBar
                initialValue={filter.beer_name}
                handleChange={updateSearchTerm}
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
                  updateRangeFilter(event, minOrMax, "abv")
                }
                label="Alcohol by volume"
              />
              <MultiRangeSlider
                min={0}
                // max ebc (31+ black)
                max={31}
                initialMin={filter.ebc_gt ?? 0}
                initialMax={filter.ebc_lt ?? 31}
                handleChange={(event, minOrMax) =>
                  updateRangeFilter(event, minOrMax, "ebc")
                }
                label="Beer by color"
              />
            </div>
          )}
          <div className="row mt-5">
            <div className="w-100">
              <table className="mb-0 p-3 table table-dark table-hover">
                <thead className={styles["table-head"]}>
                  <tr className="text-uppercase text-success">
                    <SortableTableHeader
                      name="Name"
                      id="name"
                      active={activeTableHeader}
                      handleClick={updateActiveHeader}
                    />
                    <SortableTableHeader
                      name="Alcohol by volume"
                      id="abv"
                      active={activeTableHeader}
                      handleClick={updateActiveHeader}
                    />
                    <SortableTableHeader
                      name="First brewed"
                      id="first_brewed"
                      active={activeTableHeader}
                      handleClick={updateActiveHeader}
                      sortable={false}
                    />
                    <SortableTableHeader
                      name="Tagline"
                      id="tagline"
                      active={activeTableHeader}
                      handleClick={updateActiveHeader}
                    />
                  </tr>
                </thead>
                <tbody className="action">
                  {sortedBeers &&
                    requestStatus === REQUEST_STATUS.SUCCESS &&
                    sortedBeers.map((b) => <BeerItem key={b.id} beer={b} />)}
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
                handleClick={updatePage}
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
