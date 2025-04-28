import React from "react";


interface track {
  name: string;
  artists: { name: string; }[];
  artist: string;
  album: { images: { url: string }[] };
  id: number;
}

interface resultsProps {
  tracks: track[];
  handleTrackClick: (arg: track) => Promise<void>;
}

export function SearchResults({tracks, handleTrackClick}: resultsProps) {

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
