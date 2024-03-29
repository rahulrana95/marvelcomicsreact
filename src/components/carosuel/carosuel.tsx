import React, { useRef } from "react";
import "./carosuel.css";
import tickImage from "../../images/tick.png";
import { Character } from "../../containers/useFetchCharacters";

const CheckSvg = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="#66ccff"
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </svg>
);

type PropsT = {
  characters: Character[];
  selectedCharacters: {
    [key: string]: boolean;
  };
  onCharacterSelect: (id: string, newState: boolean) => void;
  fetchNext: () => void;
};

const Carosuel = ({
  characters,
  selectedCharacters,
  onCharacterSelect,
  fetchNext,
}: PropsT) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (elementRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = elementRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

      if (isAtEnd) {
        fetchNext();
      }
    }
  };
  return (
    <div
      className="character__wrapper"
      ref={elementRef}
      onScroll={handleScroll}
    >
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
              className={`character__img ${
                isCharacterSelected ? "character__img-selected" : ""
              } `}
            />
            {isCharacterSelected && <CheckSvg className="tick-image" />}
          </div>
        );
      })}
    </div>
  );
};

export default Carosuel;
