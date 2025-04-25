import React from "react";

export function SearchResults({tracks, handleTrackClick}) {

  return (
     <div className="results-container">
     <div className="track-list">
       {tracks.map((track) => (
         <div className="track-item"
         key={track.id}
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
  )
}

export default SearchResults;
