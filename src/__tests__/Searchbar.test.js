import Searchbar from "../components/Searchbar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("should accept a user typing", async () => {
  render(<Searchbar />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "asd");

  expect(screen.getByRole("textbox")).toHaveValue("asd");
});
