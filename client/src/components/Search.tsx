import React from "react";
import cancel from "../assets/cancel-button-2.png";
import search from "../assets/search-button-black.png";

interface searchProps {
     searchInput: string;
     setSearchInput: React.Dispatch<React.SetStateAction<string>>;
     handleSearch: () => Promise<void>;
     handleCancel: () => void;
}

export function Search({searchInput, setSearchInput, handleSearch, handleCancel}: searchProps) {

  return (
     <div className="search-container">
          <div className="search-box">
          <input
          className="search-input"
          data-testid="search-input"
          placeholder="What do you want to listen to?"
          type="text"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
          />
          <button className="search-button" data-testid="search-button" onClick={handleSearch}>
          <img src={search}
          width="25px"
          height="25px"/>
          </button>
          <button className="search-button" data-testid="cancel-button" onClick={handleCancel}>
          <img
               src={cancel}
               width="20px"
               height="20px"
          />
          </button>
          </div>
     </div>
  )
}

export default Search;
