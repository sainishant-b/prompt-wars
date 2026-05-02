import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LANGUAGES } from "@/lib/language";

describe("<LanguageSelector />", () => {
  it("renders a radio button for every supported language", () => {
    render(<LanguageSelector value="en" onChange={() => {}} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(Object.keys(LANGUAGES).length);
    for (const lang of Object.values(LANGUAGES)) {
      const matches = screen.getAllByText(lang.nativeName);
      expect(matches.length).toBeGreaterThan(0);
    }
  });

  it("marks the selected language as aria-checked", () => {
    render(<LanguageSelector value="hi" onChange={() => {}} />);
    const hindi = screen.getByRole("radio", { checked: true });
    expect(hindi).toHaveTextContent("हिन्दी");
  });

  it("calls onChange when a language button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<LanguageSelector value="en" onChange={onChange} />);
    const tamilButton = screen
      .getByText("தமிழ்")
      .closest("button") as HTMLButtonElement;
    await user.click(tamilButton);
    expect(onChange).toHaveBeenCalledWith("ta");
  });

  it("renders compact variant as a select element", () => {
    render(<LanguageSelector value="en" onChange={() => {}} variant="compact" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
