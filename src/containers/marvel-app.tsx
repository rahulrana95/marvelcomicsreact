import React, { useCallback, useMemo, useState } from "react";
import useFetchCharacters from "./useFetchCharacters";
import config from "../constants";
import Carosuel from "../components/carosuel";
import "./marvel-app.css";
import ComicsFilter from "../components/comics-filter";
import useFetchComicsByTitle from "./useFetchComisByTitle";
import Comics from "../components/comics";
import Header from "../components/header/header";
import Spinner from "../components/spinner";

const debounce = (func: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const MarvelApp = () => {
  const characters = useFetchCharacters();
  const fetchByTitle = useFetchComicsByTitle();
  const { setSelectedCharacter, selectedCharacters } = fetchByTitle;

  const debouncedGetCharsCallback = useCallback(
    debounce(fetchByTitle.setTitleQuery, 400),
    []
  );

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

  const onTitleQueryChange = (e: any) => {
    const value = e.target.value;
    debouncedGetCharsCallback(value);
  };

  const filteredChars = useMemo(() => {
    return Object.entries(selectedCharacters)
      .filter(([, val]) => !!val)
      .map(([id, val]) => characters.idToCharMap[String(id)]);
  }, [selectedCharacters, characters]);

  console.log(fetchByTitle);
  return (
    <div className="marvelapp">
      <Header
        titleQuery={fetchByTitle.titleQuery}
        onTitleQueryChange={onTitleQueryChange}
      />
      <Carosuel
        characters={characters?.result?.results || []}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
      />
      <div className="comics-area">
        <ComicsFilter names={filteredChars} onClickFilters={onClickFilters} />
        {fetchByTitle.isLoading && (
          <div className="comics-area__spinner">
            <Spinner />
          </div>
        )}
        {!fetchByTitle.isLoading && fetchByTitle.count > 0 && (
          <>
            <Comics
              comics={fetchByTitle.result}
              totalPages={fetchByTitle.totalPages}
              currentPage={fetchByTitle.offset / fetchByTitle.count}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              onClickPage={onClickPage}
            />
          </>
        )}
        {!fetchByTitle.isLoading && fetchByTitle.count === 0 && (
          <div className="comics-area__no-msg">
            There are no comics for current search and filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarvelApp;