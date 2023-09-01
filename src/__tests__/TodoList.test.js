import TodoList from "../components/TodoList";
import { render, screen } from "@testing-library/react";

test("should have strike-through text when complete", () => {
  render(<TodoList list={[{ name: "Afterglow", completed: true }]} />);
  expect(screen.getByRole("listitem")).toHaveClass("crossed-over");
});

test("should not have strike-through text when not complete", () => {
  render(<TodoList list={[{ name: "Afterglow", completed: false }]} />);
  expect(screen.getByRole("listitem")).not.toHaveClass("crossed-over");
});
