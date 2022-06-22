import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../components/Home";
import SearchBar from "../components/UI/search/SearchBar";

describe("App", () => {
  it("renders heading text", () => {
    render(<Home />);
    expect(screen.getByText(/which music style is this\?/i)).toHaveTextContent("Which music style is this?");
  });

  it("allows to type in the search box", async () => {
    render(<SearchBar />);
    userEvent.click(
      screen.getByRole("combobox", {
        name: /type an artist name/i,
      })
    );
    await userEvent.type(screen.getByRole("combobox"), "Imagine Dragons");
    expect(screen.getByRole("combobox")).toHaveValue("Imagine Dragons");
  });
});
