import React from "react";
import { Character } from "../../containers/useFetchCharacters";

type PropsT = {
  names: Character[];
  onClickFilters: () => void;
  onCloseClick: (id: string | number) => void;
};

const ComicsFilter = ({
  names: characters,
  onClickFilters,
  onCloseClick,
}: PropsT) => {
  return (
    <div className="comics-filter">
      <div className="comics-filter__filter-names">
        {!!characters.length && <span className="explore-text">Explore: </span>}
        {characters.map((character, index) => {
          return (
            <div className="char-filter-name">
              <span>
                {character.name}
                {index < characters.length - 1 ? ", " : ""}
              </span>
              <span
                className="char-filter-name__cross"
                onClick={() => onCloseClick(character.id)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
      <button className="clear-all-filters-btn" onClick={onClickFilters}>
        Clear all filters
      </button>
    </div>
  );
};

export default ComicsFilter;
