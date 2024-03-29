import React from "react";
import "./carosuel.css";
import tickImage from "../images/tick.png";
import { Character } from "../containers/useFetchCharacters";

type PropsT = {
  characters: Character[];
  selectedCharacters: {
    [key: string]: boolean;
  };
  onCharacterSelect: (id: string, newState: boolean) => void;
};

const Carosuel = ({
  characters,
  selectedCharacters,
  onCharacterSelect,
}: PropsT) => {
  console.log(characters);
  return (
    <div className="character__wrapper">
      {characters.map((character) => {
        const isCharacterSelected = selectedCharacters[character.id];
        return (
          <div
            className="character__top"
            onClick={() =>
              onCharacterSelect(String(character.id), !isCharacterSelected)
            }
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              className="character__img character__img-selected"
            />
            {isCharacterSelected && (
              <img src={tickImage} className="tick-image" alt="Tick" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Carosuel;
