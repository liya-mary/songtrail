import React from "react";

interface favoritesProps {
     tracks: Track[];
}

export function Favorites({tracks}: favoritesProps) {

  return (
     <div className="favorites-container">
          <h1>Favorites</h1>
          {tracks.map((track, index) => (
               <div className="individual-favorite" key={index}>
                    <img width="50px" height="50px" src={track.album.images[0].url}></img>
                    <div>
                         <h4>{track.name} - {track.artists[0].name}</h4>
                    </div>
               </div>
          ))}
     </div>
  )
}

export default Favorites;