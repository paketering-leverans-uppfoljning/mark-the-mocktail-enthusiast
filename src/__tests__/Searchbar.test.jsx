import Searchbar from "../components/Searchbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockDrinks from "./mockDrinks.json";

test("should render the text loading.. supplied with empty array", () => {
  render(<Searchbar mocktails={[]} />);
  expect(screen.getByText("Loading..")).toBeInTheDocument();
});

test("should accept a user typing", async () => {
  render(<Searchbar mocktails={mockDrinks} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "asd");

  expect(input).toHaveValue("asd");
});

test("should display a suggestion for a mocktail when user types", async () => {
  render(<Searchbar mocktails={mockDrinks} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "After");

  expect(screen.getByText("Afterglow")).toBeInTheDocument();
});

test("should display No results found when search query does not match any drink", async () => {
  render(<Searchbar mocktails={mockDrinks} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "bogus");

  expect(screen.getByText("No results found.")).toBeInTheDocument();
});

test("should clear search bar when clicking on search result", async () => {
  render(<Searchbar mocktails={mockDrinks} dispatch={vi.fn()} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "Alice");

  const searchResult = screen.getByText("Alice Cocktail");
  expect(searchResult).toBeInTheDocument();

  await user.click(searchResult);

  expect(input).toHaveTextContent("");
});

test("should display no results on exact match", async () => {
  render(<Searchbar mocktails={mockDrinks} dispatch={vi.fn()} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "Alice");

  const searchResult = screen.getByText("Alice Cocktail");
  expect(searchResult).toBeInTheDocument();

  await user.click(searchResult);
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("should clear itself after submission", async () => {
  render(<Searchbar mocktails={mockDrinks} dispatch={vi.fn()} />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "Alice{Enter}");

  expect(input).toHaveTextContent("");
});
