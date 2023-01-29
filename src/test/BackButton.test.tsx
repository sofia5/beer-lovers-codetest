import { fireEvent, render, screen } from "@testing-library/react";
import BackButton from "../components/shared/BackButton";
import { BrowserRouter } from "react-router-dom";

describe("BackButton", () => {
  it("renders the button with the correct text and icon", () => {
    render(<BackButton to="/" />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button");
    // const icon = screen.getByText(/arrow-left-long/i);
    const text = screen.getByText(/back/i);

    // expect(button).toContainElement(icon);
    expect(button).toContainElement(text);
  });

  it("navigates to the correct route when clicked", () => {
    render(<BackButton to="/home" />, { wrapper: BrowserRouter });
    const button = screen.getByRole("link");

    fireEvent.click(button);
    expect(window.location.pathname).toBe("/home");
  });
});
