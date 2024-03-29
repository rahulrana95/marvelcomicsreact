import React, { ChangeEvent, useState } from "react";
import "./header.css";

type PropsT = {
  titleQuery: string;
  onTitleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ titleQuery, onTitleQueryChange }: PropsT) => {
  const [val, setValue] = useState("");

  return (
    <div className="header">
      <h1>MARVEL</h1>
      <div className="search-wrapper">
        <input
          type="text"
          value={val}
          placeholder="Search by title"
          onChange={(e) => {
            setValue(e.target.value);
            onTitleQueryChange(e);
          }}
        />
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.26c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        {val && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="cross-icon"
            onClick={() => {
              setValue("");
              // @ts-expect-error
              onTitleQueryChange({ target: { value: "" } });
            }}
          >
            <path d="M12 10.586l4.95-4.95a1 1 0 0 1 1.414 1.414l-4.95 4.95 4.95 4.95a1 1 0 1 1-1.414 1.414l-4.95-4.95-4.95 4.95a1 1 0 1 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 1 1 1.414-1.414l4.95 4.95z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Header;
