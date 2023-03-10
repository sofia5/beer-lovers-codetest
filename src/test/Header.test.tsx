import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/shared/Header";

test("renders header", () => {
  render(<Header />, { wrapper: BrowserRouter });
  const headerText = screen.getByText(/Beer lovers/i);
  expect(headerText).toBeInTheDocument();
});
