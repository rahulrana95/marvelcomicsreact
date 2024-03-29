import React from "react";
import { Character } from "../containers/useFetchCharacters";

type PropsT = {
  names: Character[];
  onClickFilters: () => void;
};

const ComicsFilter = ({ names: characters, onClickFilters }: PropsT) => {
  return (
    <div className="comics-filter">
      <div className="comics-filter__filter-names">
        {!!characters.length && <span>Explore: </span>}
        {characters.map((character, index) => {
          return (
            <div>
              {character.name}
              {index < characters.length - 1 ? ", " : ""}
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
