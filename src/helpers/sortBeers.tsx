import { Beer } from "../types/interfaces";

export type AscOrDesc = "asc" | "desc";

const sortBeers = (
  beers: Beer[],
  propToSort: keyof Beer,
  ascOrDesc: AscOrDesc
) => {
  return [...beers].sort((a, b) => {
    if (ascOrDesc === "asc") {
      return b[propToSort] > a[propToSort] ? -1 : 1;
    } else {
      return a[propToSort] > b[propToSort] ? -1 : 1;
    }
  });
};

export default sortBeers;
