import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import { Header } from './components/Header';
import tagService from './tagService';
import { NowPlaying } from './components/NowPlaying';
import spotifyService from './spotifyService';
import Login from './components/Login';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Radio from './components/Radio';


const DEFAULT_POSITION = [51.505, -0.09];

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function App() {

  //Geolocation + Tags
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [tagList, setTagList] = useState([]);

  //Search UI
  const [searchInput, setSearchInput] = useState("");
  const [tracks, setTracks] = useState([]);
  const [showResults, setShowResults] = useState(false);

  //Spotify Auth
  const [accessToken, setAccessToken] = useState("");
  const [authToken, setAuthToken] = useState('');

  // Webplayer
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [lastPlayedTrack, setLastPlayedTrack] = useState(null);
  const [device_id, setDeviceId] = useState('');


  // UseEffect section

  useEffect(() => {

    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setPosition(DEFAULT_POSITION);
    };

    navigator.geolocation.getCurrentPosition(success, error, GEOLOCATION_OPTIONS);

    (async () => {
      try {
        setTagList(await tagService.getTags());
        setAccessToken(await spotifyService.getAccessToken());
        setAuthToken((await spotifyService.getAuthToken()).access_token);
      }
      catch (err) { console.error(err); }
    })();

  }, []);

  useEffect(() => {
    if (current_track && !isPaused) {

      if (lastPlayedTrack !== current_track.id) {
        addTag(current_track);
        setLastPlayedTrack(current_track.id);
      }
    }
  }, [current_track, isPaused]);

  useEffect(() => {
    let script;

    if (authToken) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Song Trail',
          getOAuthToken: cb => { cb(authToken); },
          volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);

          fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              device_ids: [device_id],
              play: false
            })
          });
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (state) => {
          if (!state) {
            setTrack(null);
            return;
          }
          setTrack(state.track_window.current_track);
          // setIsPaused(state.paused);
        });

        player.connect()

          // player.addListener('initialization_error', ({ message }) => {
          //   console.error('Init Error:', message);
          // });
          // player.addListener('authentication_error', ({ message }) => {
          //   console.error('Auth Error:', message);
          // });
          // player.addListener('account_error', ({ message }) => {
          //   console.error('Account Error:', message);
          // });
          // player.addListener('playback_error', ({ message }) => {
          //   console.error('Playback Error:', message);
          // });
          .then(success => {
            if (!success) {
              console.log('Failed to connect player');
            }
          });

      };
    }

    return () => {
      if (player) {
        player.disconnect();
      }

      if (script) {
        document.body.removeChild(script);
      }

      delete window.onSpotifyWebPlaybackSDKReady;
    };
  }, [authToken]);

  // Clickhandle section

  const playerFunction = async (functionality) => {
    console.log("functionality: ", functionality);
    if (!(player && player[functionality])) return;
    const playerFnality = await player[functionality]();
    if (functionality === "resume") {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }

    console.log("playerfunctionality: ", playerFnality);
    if (functionality === "resume" && current_track) addTag(current_track);
  };

  // Search section
  async function handleSearch() {
    if (!searchInput.trim()) return;
    const foundTracks = await spotifyService.searchSong(searchInput, accessToken);
    setTracks(foundTracks.tracks.items);
    setShowResults(true);
  }

  function handleCancel() {
    setSearchInput("");
    setShowResults(false);
  }

  function handleTrackClick(track) {
    if (!player || !authToken) return;

    setShowResults(false);

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: [track.uri],
        position_ms: 0
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to play track');
        }
        console.log('Track started playing');
        setTrack(track);
        setIsPaused(false);
      })
      .catch(error => {
        console.error('Error playing track:', error);
      });
  }

  // Tag system
  async function addTag(track) {
    if (!track) return;

    async function success(pos) {
      const crd = pos.coords;
      const tagCoord = [crd.latitude, crd.longitude]
      console.log(tagCoord);
      setPosition(tagCoord);

      let newTag = await tagService.addTag({
        title: track.name,
        src: track.uri,
        artist: track.artists.map(a => a.name).join(', '),
        coordinates: tagCoord,
        timestamp: Date.now(),
      })
        .catch((err) => { console.err(err); return null; });

      if (newTag) setTagList((prevTagList) => ([...prevTagList, newTag]));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, GEOLOCATION_OPTIONS);
  }

  return (
    <>

      {!authToken && <Login />}

      <div className='overall'>
        {authToken && (
          <>
            <Header />
            <div className="search">
              <Search searchInput={searchInput} setSearchInput={setSearchInput} handleSearch={handleSearch} handleCancel={handleCancel} />
              {showResults && <SearchResults tracks={tracks} handleTrackClick={handleTrackClick} />}
            </div>

            {!showResults && (
              <>
                <Radio current_track={current_track} player={player} playerFunction={playerFunction} isPaused={isPaused} />
                <Map handleClick={addTag} position={position} tagList={tagList} />
              </>
            )}

          </>
        )}
      </div>
    </>
  )
}

export default App;