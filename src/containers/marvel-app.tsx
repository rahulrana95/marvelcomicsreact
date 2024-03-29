import React, { useState } from "react";
import useFetchCharacters from "./useFetchCharacters";
import config from "../constants";
import Carosuel from "../components/carosuel";
import "./marvel-app.css";
import ComicsFilter from "../components/comics-filter";
import useFetchComicsByTitle from "./useFetchComisByTitle";
import Comics from "../components/comics";

const MarvelApp = () => {
  const characters = useFetchCharacters();
  const fetchByTitle = useFetchComicsByTitle();
  const [selectedCharacters, setSelectedCharacter] = useState({});
  const onCharacterSelect = (id: string, newState: boolean) => {
    setSelectedCharacter((selectedCharacters) => ({
      ...selectedCharacters,
      [id]: newState,
    }));
  };

  const onClickFilters = () => {
    setSelectedCharacter({});
  };

  const onClickNext = () => {
    if (fetchByTitle.pageNum >= fetchByTitle.totalPages) return;
    fetchByTitle.setPageNum((pageNum) => pageNum + 1);
  };
  const onClickPrev = () => {
    if (fetchByTitle.pageNum <= 0) return;
    fetchByTitle.setPageNum((pageNum) => pageNum - 1);
  };

  const onClickPage = (page: number) => {
    fetchByTitle.setPageNum((pageNum) => page);
  };

  console.log(characters.idToCharMap);

  const filteresChars = Object.entries(selectedCharacters)
    .filter(([, val]) => !!val)
    .map(([id, val]) => {
      return characters.idToCharMap[String(id)];
    });

  return (
    <div className="marvelapp">
      <Carosuel
        characters={characters?.result?.results || []}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />
      <div className="comics-area">
        <ComicsFilter names={filteresChars} onClickFilters={onClickFilters} />
        <Comics
          comics={fetchByTitle.result}
          totalPages={fetchByTitle.totalPages}
          currentPage={fetchByTitle.offset / fetchByTitle.count}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          onClickPage={onClickPage}
        />
      </div>
    </div>
  );
};

export default MarvelApp;
