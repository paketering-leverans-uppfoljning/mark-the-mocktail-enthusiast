import Filter from "../components/Filter";
import { render, screen } from "@testing-library/react";

test("should have class 'selected' on click", () => {
  const activeFilter = () => "";
  render(<Filter filter={activeFilter} updateFilter={vi.fn()} />);
  expect(screen.getByText("Active")).toHaveClass(/selected/i);
  expect(screen.getByText("All")).not.toHaveClass(/selected/i);
});
