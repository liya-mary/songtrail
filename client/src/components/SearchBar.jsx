import React, { useEffect } from "react";
import { useState } from "react";
import spotifyService from "../spotifyService";

export function SearchBar () {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);


  useEffect(() => {
    spotifyService.getAccessToken()
      .then((accessToken) => {
        console.log(accessToken)
        setAccessToken(accessToken) 
      })
  }, [])

  async function handleSearch() {
    const foundTracks = await spotifyService.searchSong(searchInput, accessToken)
    console.log(foundTracks);
    setTracks(foundTracks.tracks.items);
  }

  function handleTrackClick(newTrack) {
    setPlaylist((prevPlaylist) => ([...prevPlaylist, newTrack]))
  }

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
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="results-container">
          <div className="track-list">
            {tracks.map((track, i) => (
              <div className="track-item"
              key={i}
              onClick={() => handleTrackClick(track)}
              style={{cursor: 'pointer'}}>
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