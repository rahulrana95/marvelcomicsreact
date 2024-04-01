import React, { useCallback, useMemo, useState } from "react";
import useFetchCharacters from "./useFetchCharacters";
import config from "../constants";
import Carosuel from "../components/carosuel/carosuel";
import "./marvel-app.css";
import ComicsFilter from "../components/comics/comics-filter";
import useMarvelApp from "./useMarvelApp";
import Comics from "../components/comics/comics";
import Header from "../components/header/header";
import Spinner from "../components/spinner/spinner";

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
  const marvelApp = useMarvelApp();
  const { setSelectedCharacter, selectedCharacters } = marvelApp;

  const debouncedGetCharsCallback = useCallback(
    debounce(marvelApp.setTitleQuery, 400),
    []
  );

  const onCharacterSelect = (id: string, newState: boolean) => {
    setSelectedCharacter((selectedCharacters: any) => ({
      ...selectedCharacters,
      [id]: newState,
    }));
  };

  const onClickFilters = () => {
    setSelectedCharacter({});
  };

  const onClickNext = () => {
    if (marvelApp.pageNum >= marvelApp.totalPages) return;
    marvelApp.setPageNum((pageNum) => pageNum + 1);
  };
  const onClickPrev = () => {
    if (marvelApp.pageNum <= 0) return;
    marvelApp.setPageNum((pageNum) => pageNum - 1);
  };

  const onClickPage = (page: number) => {
    marvelApp.setPageNum((pageNum) => page);
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

  console.log(marvelApp);

  const fetchNext = () => {
    characters.setPage((page) => page + 1);
  };

  const onCloseClick = (id: string | number) => {
    setSelectedCharacter((selectedCharacters: any) => ({
      ...selectedCharacters,
      [id]: false,
    }));
  };
  return (
    <div className="marvelapp">
      <Header onTitleQueryChange={onTitleQueryChange} />
      <Carosuel
        characters={characters?.chars || []}
        selectedCharacters={selectedCharacters}
        onCharacterSelect={onCharacterSelect}
        fetchNext={fetchNext}
      />
      <div className="comics-area-wrapper">
        <div className="comics-area">
          <ComicsFilter
            names={filteredChars}
            onClickFilters={onClickFilters}
            onCloseClick={onCloseClick}
          />
          {marvelApp.isLoading && (
            <div className="comics-area__spinner">
              <Spinner />
            </div>
          )}
          {!marvelApp.isLoading && marvelApp.count > 0 && (
            <>
              <Comics
                comics={marvelApp.result}
                totalPages={marvelApp.totalPages}
                currentPage={marvelApp.pageNum}
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                onClickPage={onClickPage}
              />
            </>
          )}
          {!marvelApp.isLoading && marvelApp.count === 0 && (
            <div className="comics-area__no-msg">
              There are no comics for current search and filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarvelApp;
