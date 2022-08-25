import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/index";
import SearchAutocomplete from "../components/SearchAutocomplete/SearchAutocomplete";

describe("Home page", () => {
  it("renders the title component", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /searching for music style\?/i })).toHaveTextContent(
      "Searching for music style?"
    );
  });

  it("renders search autocomplete component", () => {
    render(<SearchAutocomplete type="primary" />);
    expect(screen.getByRole("combobox")).toBeVisible();
  });

  it("allows to type in the search input", async () => {
    render(<SearchAutocomplete type="primary" />);
    userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByRole("combobox"), "Hatfield & The North");
    expect(screen.getByRole("combobox")).toHaveValue("Hatfield & The North");
  });
});
