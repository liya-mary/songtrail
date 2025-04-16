import React from "react";
import { tracks } from "../data/playlist";


export function Playlist() {


  return (
    <>
      <h2>Playlist</h2>
      <div className="songList">
        {tracks.map((track, index) => (
        <div className="songTitle" key={index}>{track.title}</div>
        ))}
      </div>
    </>
  )
}

export default Map
