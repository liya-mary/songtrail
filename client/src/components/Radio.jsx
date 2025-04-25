import React from "react";
import NowPlaying from "./NowPlaying";
import { playIcon, pauseIcon, previousIcon, nextIcon } from '../assets/player';

export function Radio({ current_track, player, playerFunction, isPaused }) {

     return (
          <div className='radio'>
               <NowPlaying track={current_track || { name: "No track selected", artists: [{ name: "" }] }} />
               <div className="container">
                    <div className="main-wrapper"></div>
               </div>
               <div className='player'>
                    {player && (
                         <div className="player-controls">
                              <button onClick={() => playerFunction("previousTrack")}>
                                   <img
                                        src={previousIcon}
                                        width="24px"
                                        length="24px"
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
                                        length="30px"
                                   />
                              </button>
                              <button onClick={() => playerFunction("nextTrack")}>
                                   <img
                                        src={nextIcon}
                                        width="24px"
                                        length="24px"
                                   />
                              </button>
                         </div>
                    )}
               </div>
          </div>
     )
}

export default Radio;