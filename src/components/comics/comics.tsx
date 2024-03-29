import React from "react";
import { Comic } from "../../containers/useFetchComisByTitle";
import "./comics.css";
import ImageWithPlaceholder from "../image-placeholder/image-with-placeholdet";

type PropsT = {
  comics: Comic[];
  totalPages: number;
  currentPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickPage: (page: number) => void;
};
const Comics = ({
  comics,
  currentPage,
  totalPages,
  onClickNext,
  onClickPrev,
  onClickPage,
}: PropsT) => {
  function generatePaginationButtons(totalPages: number, currentPage: number) {
    const buttons = [];
    const maxButtons = 10;

    // Calculate the start and end page numbers for rendering
    let startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Add buttons to the array
    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <button
          className={`${i === currentPage ? "current-page-active" : ""}`}
          onClick={() => onClickPage(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  }

  return (
    <div className="comics-wrapper">
      <div className="comics__comic-list">
        {comics.map((comic) => {
          return (
            <div className="comics__comic" key={comic.id}>
              <ImageWithPlaceholder
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                className="comics__comic-img"
              />
              <div className="comics__comic-title-wrapper">
                <div className="comics__comic-title">{comic.title}</div>
                <span></span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="comics-footer">
        <button disabled={currentPage <= 0} onClick={onClickPrev}>
          {"<"}
        </button>
        <div className="fotter-buttons">
          {generatePaginationButtons(
            totalPages,
            isNaN(currentPage) ? 0 : currentPage
          )}
        </div>
        <button disabled={currentPage + 1 >= totalPages} onClick={onClickNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Comics;
