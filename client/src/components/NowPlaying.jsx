import React from "react";


export function NowPlaying({track}) {


  return (
    <>
      <div className="now-playing">
      <h3>{track.name || track.title}</h3>
      <p>{track.artists ? track.artists.map(a => a.name).join(', ') : track.artist}</p>
    </div>
    </>
  )
}

export default Map
