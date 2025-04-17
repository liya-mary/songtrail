import React, { useEffect } from "react";
import { useState } from "react";
import spotifyService from "../spotifyService";

export function SearchBar () {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);


  //how to get the accessToken here?

  useEffect(() => {
    setAccessToken(spotifyService.getAccessToken()) // fix this
  }, [])

  return (
      <div className="search">
        <div className="search-container">
          <div className="search-box">
            <input
              className="search-input"
              placeholder="Search For Songs"
              type="text"
              onChange={event => setSearchInput(event.target.value)}
            />
            <button className="search-button" onClick={setTracks(spotifyService.searchSong())}> 
              Search
            </button>
          </div>
        </div>

        <div className="results-container">
          <div className="track-list">
            {tracks.map((track, i) => (
              <div className="track-item" key={i}>
                <img
                  src={track.album.images[0]?.url || "#"}
                  alt={track.name}
                  className="track-image"
                />
                <div className="track-info">
                  <h3 className="track-name">{track.name}</h3>
                  <p className="track-artists">
                    {track.artists.map(artist => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default SearchBar