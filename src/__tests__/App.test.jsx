import { render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import mockDrinks from "./mockDrinks.json";

const server = setupServer(
  http.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php", () =>
    HttpResponse.json({ drinks: mockDrinks })
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test("should render the correct header", () => {
  render(<App />);
  expect(screen.getByText("Mark's To-drink List")).toBeInTheDocument();
});

test("should display new drink after submission via click", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "Alice");
  const searchResult = screen.getByText("Alice Cocktail");
  await user.click(searchResult);

  const list = screen.getByRole("list");
  expect(within(list).getByText("Alice Cocktail")).toBeInTheDocument();
});

test("should display new drink after submission via enter", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  const input = screen.getByRole("textbox");
  await user.type(input, "Alice{Enter}");

  const list = screen.getByRole("list");
  expect(within(list).getByText("Alice Cocktail")).toBeInTheDocument();
});

test("should be able to delete a drink", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  const listItems = screen.getAllByRole("listitem");
  const listLength = listItems.length;
  const listItem = listItems[0];
  const removeBtn = within(listItem).getByAltText("remove button");

  expect(listItem).toBeInTheDocument();
  expect(removeBtn).toBeInTheDocument();

  await user.click(removeBtn);
  expect(listItem).not.toBeInTheDocument();
  expect(listLength - screen.getAllByRole("listitem").length).toBe(1);
});

test("should be able to filter by active drinks", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  const listItems = screen.getAllByRole("listitem");
  const listLength = listItems.length;
  const listItem = screen.getByText("Apple Berry Smoothie");

  await user.click(listItem);
  await user.click(screen.getByRole("button", { name: "Active" }));

  expect(listItem).not.toBeInTheDocument();
  expect(listLength - screen.getAllByRole("listitem").length).toBe(1);
});

test("should be able to filter by completed drinks", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  const listItems = screen.getAllByRole("listitem");
  const listLength = listItems.length;
  const listItem = screen.getByText("Apple Berry Smoothie");

  await user.click(listItem);
  await user.click(screen.getByRole("button", { name: "Completed" }));

  expect(listItem).toBeInTheDocument();
  expect(screen.queryByText("Banana Milkshake")).not.toBeInTheDocument();
  expect(listLength - screen.getAllByRole("listitem").length).toBe(1);
});

test("should be able to clear list", async () => {
  render(<App />);
  const user = userEvent.setup();

  await waitFor(() =>
    expect(screen.queryByText("Loading..")).not.toBeInTheDocument()
  );

  await user.click(screen.getByRole("button", { name: "CLEAR" }));

  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});
