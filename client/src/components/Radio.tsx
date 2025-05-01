import React, { useEffect, useState } from "react";
import NowPlaying from "./NowPlaying";
import { playIcon, pauseIcon, previousIcon, nextIcon, star, star2 } from '../assets/player';

interface RadioProps {
     current_track: any;
     player: any;
     playerFunction: any;
     isPaused: any;
     onFavorite: any;
     onUnfavorite: any;
     favorites: any;
}

export function Radio({ current_track, player, playerFunction, isPaused, onFavorite, onUnfavorite, favorites }: RadioProps) {

     const [favorited, setFavorited] = useState(false);

     useEffect(() => {
          if (!(favorites && current_track)) return;
          let set = false;
          favorites.forEach((track: any) => {
               if (track.id === current_track.id) set = true;
          });
          setFavorited(set);
     }, [current_track, favorites]);

     return (
          <div className='radio'>
               <div className='radio-wrapper'>
                    <NowPlaying track={current_track || { name: "No track selected", artists: [{ name: "" }] }} />

               </div>
               <div className="container">
                    <div className="main-wrapper"></div>
               </div>
               <div className='player'>
                    {player && (
                         <div className="player-controls" data-testid="player-controls">
                              <button onClick={() => playerFunction("previousTrack")}>
                                   <img
                                        src={previousIcon}
                                        width="24px"
                                        height="24px"
                                   />
                              </button>
                              <button onClick={() => {
                                   console.log("clicked...");
                                   console.log("ispaused...", isPaused);

                                   isPaused ? playerFunction("resume") : playerFunction("pause");
                              }}>
                                   <img
                                        src={isPaused ? playIcon : pauseIcon}
                                        width="30px"
                                        height="30px"
                                   />
                              </button>
                              <button onClick={() => playerFunction("nextTrack")}>
                                   <img
                                        src={nextIcon}
                                        width="24px"
                                        height="24px"
                                   />
                              </button>
                              <button onClick={() => {favorited ? setFavorited(false) : setFavorited(true); favorited ? onUnfavorite(current_track) : onFavorite(current_track)}}>
                                   <img
                                        src={favorited ? star : star2}
                                        width="24px"
                                        height="24px"
                                   />
                              </button>
                         </div>
                    )}
               </div>
          </div>
     )
}

export default Radio;