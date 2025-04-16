import React from 'react';
import { useState } from 'react';
import './App.css'
import Map from './components/Map';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { tracks } from './data/playlist';



function App() {

  const [position, setPosition] = useState([51.505, -0.09]);
  const [wasPaused, setWasPaused] = useState(false);
  const [tagList, setTagList] = useState([]);


  // Ensure that a Tag is only added once per track
  function handlePlay() {
    if (!wasPaused) {
      addTag();
    }
    setWasPaused(false);
  }

  function handlePause() {
    setWasPaused(true);
  }

  function handleEnded() {
    setWasPaused(false);
  }

// Add the tag on the map
  function addTag() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      const tagCoord = [crd.latitude, crd.longitude]
      console.log(tagCoord)
      setPosition(tagCoord)
      // Add tagCoord to the Tag json which should contain the music data too
      // Still need to ensure that a list of tags is  created
      setTagList((tag) => ([...tag, tagCoord]))
    }



    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  return (
    <>
   <AudioPlayer
    // Need to be able to change the src when clicking on next
      src="./Audio/callmemaybe.mp3"
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    />
    <Map
    handleClick={addTag}
    position={position}
    tagList={tagList}/>
    </>
  )
}

export default App
