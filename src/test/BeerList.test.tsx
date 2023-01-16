import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import BeerList from "../components/BeerList";
import useBeers from "../hooks/useBeers";

jest.mock("../hooks/useBeers");

describe("BeerList", () => {
  let beers = [
    {
      id: 1,
      name: "beer1",
      abv: 5,
      tagline: "great beer",
      first_brewed: "11/2002",
    },
    {
      id: 2,
      name: "beer2",
      abv: 7,
      tagline: "best beer",
      first_brewed: "9/2005",
    },
    {
      id: 3,
      name: "beer3",
      abv: 8,
      tagline: "awesome beer",
      first_brewed: "5/2010",
    },
  ];

  it("should show loading spinner when loading", () => {
    (useBeers as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      beers: [],
    });

    render(<BeerList />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("loading-spinner")).toHaveClass("fa-spinner");
  });

  it("should show error message when error", () => {
    (useBeers as jest.Mock).mockReturnValue({
      loading: false,
      error: "An error occurred",
      beers: [],
    });

    render(<BeerList />, { wrapper: BrowserRouter });
    const errorMessage = screen.getByText("An error occurred");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should show beers when data is loaded", async () => {
    (useBeers as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      beers,
    });

    render(<BeerList />, { wrapper: BrowserRouter });
    const beer1 = await screen.findByText("beer1");
    const beer2 = await screen.findByText("beer2");

    expect(beer1).toBeInTheDocument();
    expect(beer2).toBeInTheDocument();
    expect(beers).toHaveLength(3);
  });

  it("renders table props", () => {
    (useBeers as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      beers,
    });

    render(<BeerList />, { wrapper: BrowserRouter });

    const tableName = screen.getByText(/Name/i);
    const tableTagline = screen.getByText(/Tagline/i);
    const tableFirstBrewed = screen.getByText(/First brewed/i);
    const tableAbv = screen.getByText(/Alcohol by volume/i);

    expect(tableName).toBeInTheDocument();
    expect(tableTagline).toBeInTheDocument();
    expect(tableFirstBrewed).toBeInTheDocument();
    expect(tableAbv).toBeInTheDocument();
  });
});
