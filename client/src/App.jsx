import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import Map from './components/Map';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import { Playlist } from './components/playlist';
import { Header } from './components/Header';
import tagService from './tagService';
import { NowPlaying } from './components/NowPlaying';
import { metadata } from './metadataService';
import SearchBar from './components/SearchBar';


function App() {

  const [position, setPosition] = useState([51.505, -0.09]);
  const [wasPaused, setWasPaused] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [tagList, setTagList] = useState([]);
  const [lastPlayedTrack, setLastPlayedTrack] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const track = tracks[currentTrack]


  useEffect(() => {
    tagService.getTags()
    .then(setTagList);
    metadata()
    .then(setTracks);
  }, []);

  function handlePlay() {
    if (!wasPaused || lastPlayedTrack !== currentTrack) {
      addTag(track);
    }
    setWasPaused(false);
    setLastPlayedTrack(currentTrack);
  }

  function handlePause() {
    setWasPaused(true);
  }

  function handleEnded() {
    setWasPaused(false);
  }

  function handleNext() {
    setWasPaused(false);
    setCurrentTrack((prevIndex) => {
      let newIndex;
      if (prevIndex < tracks.length - 1) {
        newIndex = prevIndex + 1;
      } else {
        newIndex = 0;
      }
      return newIndex;
    });
  }

  function handlePrevious() {
    setWasPaused(false);
    setCurrentTrack((prevIndex) => {
      let newIndex;
      if (prevIndex > 0) {
        newIndex = prevIndex - 1;
      } else {
        newIndex = tracks.length - 1;
      }
      addTag(tracks[newIndex]);
      return newIndex;
    });
  }

// Add the tag on the map
  function addTag(track) {
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
      const newTag = {
        title: track.title,
        src: track.src,
        artist: track.artist,
        coordinates: tagCoord,
        timestamp: Date.now(),
      }

      tagService.addTag(newTag)
        .then(newTag => {
          setTagList((prevTagList) => ([...prevTagList, newTag]))
        })
        .catch(error => {
          console.log('Could not add a newTag', error)
        })

      // setPositionList((prevPositionList) => ([...prevPositionList, tagCoord])) // FIX ME
      console.log(tagList)
    }


    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const handleFirstInteraction = () => {
    setHasUserInteracted(true);
  };

  return (
    <>
   <Header/>
   <SearchBar/>
   <NowPlaying track={track || { title: "No track selected", artist: "" }} />
   <div onClick={handleFirstInteraction}>
    <AudioPlayer
      src={tracks[currentTrack]?.src || null}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onClickNext={handleNext}
      onClickPrevious={handlePrevious}
      showSkipControls={true}
      autoPlayAfterSrcChange={hasUserInteracted}
      showJumpControls={false}
    />
    </div>
    {/* <Playlist currentTrack={currentTrack}/> */}
    <Map
    handleClick={addTag}
    position={position}
    tagList={tagList}/>
    </>
  )
}

export default App
