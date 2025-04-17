import React from "react";


export function NowPlaying({track}) {


  return (
    <>
      <div className="nowPlaying">
        <h3>Now Playing:</h3>
        <div className="playlistSong active">
          <p>{track.title} - {track.author}</p>
        </div>
      </div>
    </>
  )
}

export default Map
