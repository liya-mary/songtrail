import React from "react";


export function NowPlaying({track}) {


  return (
    <>
      <div className="nowPlaying">
        <h3>Now Playing:</h3>
        <div className="playlistSong">
          <p>{track.title} - {track.artist}</p>
        </div>
      </div>
    </>
  )
}

export default Map
