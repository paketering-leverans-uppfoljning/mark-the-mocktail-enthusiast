import Filter from "../components/Filter";
import { render, screen } from "@testing-library/react";

test("should have class 'selected' on click", () => {
  const activeFilter = () => "";
  render(<Filter filter={activeFilter} updateFilter={jest.fn()} />);
  expect(screen.getByText("Active")).toHaveClass("selected");
  expect(screen.getByText("All")).not.toHaveClass("selected");
});
