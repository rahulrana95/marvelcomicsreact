import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carosuel from "../carosuel";
import charactersMockJsonArray from "../../../mock-data/characters.json";
describe("Carousel component", () => {
  const characters = charactersMockJsonArray;

  const selectedCharacters = {
    "1011334": true,
    "1017100": true,
    "1009144": true,
  };

  const onCharacterSelectMock = jest.fn();
  const fetchNextMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders character images and checks for selection", () => {
    const { getByAltText, getByTestId } = render(
      <Carosuel
        characters={characters}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelectMock}
        fetchNext={fetchNextMock}
      />
    );

    // Check if character images are rendered
    characters.forEach((character) => {
      const imgElement = getByAltText(
        `Character ${character.id}`
      ) as HTMLImageElement;
      expect(imgElement).toBeInTheDocument();
      expect(imgElement.src).toBe(
        `${character.thumbnail.path}.${character.thumbnail.extension}`
      );
    });

    // Check if selected characters have the checkmark image
    characters.forEach((character) => {
      const characterWrapper = getByTestId(`character-${character.id}`);
      const checkmark = characterWrapper.querySelector(".tick-image");
      // @ts-expect-error
      if (selectedCharacters[character.id]) {
        expect(checkmark).toBeInTheDocument();
      } else {
        expect(checkmark).not.toBeInTheDocument();
      }
    });
  });

  it("calls onCharacterSelect when a character is clicked", () => {
    const { getByTestId } = render(
      <Carosuel
        characters={characters}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelectMock}
        fetchNext={fetchNextMock}
      />
    );

    // Simulate clicking on a character
    const characterId = characters[0].id;
    const characterWrapper = getByTestId(`character-${characterId}`);
    fireEvent.click(characterWrapper);

    // Check if onCharacterSelect is called with the correct parameters
    expect(onCharacterSelectMock).toHaveBeenCalledWith(
      characterId.toString(),
      false
    );
  });

  it("calls fetchNext when scrolled to the end", () => {
    const { getByTestId } = render(
      <Carosuel
        characters={characters}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelectMock}
        fetchNext={fetchNextMock}
      />
    );

    // Simulate scrolling to the end
    const characterWrapper = getByTestId("character-wrapper");
    characterWrapper.scrollLeft = 100;
    fireEvent.scroll(characterWrapper);

    // Check if fetchNext is called
    expect(fetchNextMock).toHaveBeenCalled();
  });
});
