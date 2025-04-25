import React from "react";
import cancel from "../assets/cancel-button-2.png";
import search from "../assets/search-button-black.png";

export function Search({searchInput, setSearchInput, handleSearch, handleCancel}) {

  return (
     <div className="search-container">
          <div className="search-box">
          <input
          className="search-input"
          placeholder="What do you want to listen to?"
          type="text"
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
          <img src={search}
          width="25px"
          length="25px"/>
          </button>
          <button className="search-button" onClick={handleCancel}>
          <img
               src={cancel}
               width="20px"
               length="20px"
          />
          </button>
          </div>
     </div>
  )
}

export default Search;
