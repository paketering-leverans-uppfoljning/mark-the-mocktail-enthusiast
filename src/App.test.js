import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render the correct header", () => {
  render(<App />);
  expect(screen.getByText("Mark's To-drink List")).toBeInTheDocument();
});

test.todo("should display new drink after submission via click");

test.todo("should display new drink after submission via enter");
