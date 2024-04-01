import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ComicsFilter from "../comics-filter";
import charactersMockJsonArray from "../../../mock-data/characters.json";

describe("ComicsFilter component", () => {
  const mockCharacters = charactersMockJsonArray.slice(0, 4);

  const onClickFiltersMock = jest.fn();
  const onCloseClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter names and handles onCloseClick", () => {
    const { getByText, getAllByText } = render(
      <ComicsFilter
        names={mockCharacters}
        onClickFilters={onClickFiltersMock}
        onCloseClick={onCloseClickMock}
      />
    );

    // Check if filter names are rendered
    mockCharacters.forEach((character, index) => {
      if (index === mockCharacters.length - 1) {
        const nameElement = getByText(`${character.name}`);
        expect(nameElement).toBeInTheDocument();
      } else {
        const nameElement = getByText(`${character.name},`);
        expect(nameElement).toBeInTheDocument();
      }
    });

    // Simulate click on close button for each filter name
    mockCharacters.forEach((character, index) => {
      const closeButton = getAllByText("X", {
        selector: `.char-filter-name__cross`,
      });
      fireEvent.click(closeButton[index]);
      expect(onCloseClickMock).toHaveBeenCalledWith(character.id);
    });
  });

  it("renders 'Clear all filters' button and handles onClickFilters", () => {
    const { getByText } = render(
      <ComicsFilter
        names={mockCharacters}
        onClickFilters={onClickFiltersMock}
        onCloseClick={onCloseClickMock}
      />
    );

    // Check if 'Clear all filters' button is rendered
    const clearAllFiltersButton = getByText("Clear all filters");
    expect(clearAllFiltersButton).toBeInTheDocument();

    // Simulate click on 'Clear all filters' button
    fireEvent.click(clearAllFiltersButton);
    expect(onClickFiltersMock).toHaveBeenCalled();
  });
});
