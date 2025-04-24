import React from "react";
import placeholderImage from '../assets/pin.png'

export function NowPlaying({track}) {

  return (
    <>
      <div className="now-playing-container">
        <img
          src={track?.album?.images[0]?.url || placeholderImage}
          className="now-playing-image"
        />
        <div className="now-playing-track-details">
          <p className="track-title">{track.name}</p>
          <p className="track-artist">{track.artists ? track.artists.map(a => a.name).join(', ') : track.artist}</p>
        </div>
      </div>
    </>
  )
}

export default NowPlaying;
