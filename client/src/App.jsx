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
  // const [positionList, setPositionList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [tagList, setTagList] = useState([])



  // tagList = [
  //   {
  //     title: '360',
  //     src: charli,
  //     author: 'Charli XCX',
  //     coordinates: [51.505, -0.09],
  //     timestamp:
  //   },



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

  function handleNext() {
    setWasPaused(true);
    setCurrentTrack((prevIndex) => {
      if (prevIndex < tracks.length - 1) {
        return prevIndex + 1
      }
      return 0
    })
    addTag()
  }

  function handlePrevious() {
    setCurrentTrack((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return tracks.length - 1;
    })
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
      // Still need to ensure that a list of tags is  created

      setTagList((prevTagList) => ([...prevTagList,
        {
          title: tracks[currentTrack].title,
          src: tracks[currentTrack].src,
          author: tracks[currentTrack].author,
          coordinates: tagCoord,
          timestamp: Date.now(),
        }
      ]))

      // setPositionList((prevPositionList) => ([...prevPositionList, tagCoord])) // FIX ME
      console.log(tagList)
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
      src={tracks[currentTrack].src}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onClickNext={handleNext}
      onClickPrevious={handlePrevious}
      showSkipControls={true}
      autoPlayAfterSrcChange={true}
      showJumpControls={false}
    />
    <Map
    handleClick={addTag}
    position={position}
    tagList={tagList}/>
    </>
  )
}

export default App
