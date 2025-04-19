import React from "react";


export function NowPlaying({track}) {

console.log(track)
  return (
    <>
      <div className="now-playing-container">
        <img
          src={track?.album?.images[0]?.url || "#"}
          className="now-playing-image"
        />
        <div className="song-details">
          <p className="track-title">{track.name || track.title}</p>
          <p className="track-artist">{track.artists ? track.artists.map(a => a.name).join(', ') : track.artist}</p>
        </div>
      </div>
    </>
  )
}

export default Map
