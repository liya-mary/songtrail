
# SongTrail

SongTrail is the web app that charts your music-listening history in real time and pin it on a map.
- Play Spotify tracks seamlessly within the app.
- Automatically record your location when a song plays.
- View your personal music map, with connected markers tracing your listening journey.

Functionnalities to implement in future versions:
- Queue
- Playlists
- Trails history
- Start songs with tags
- Extensive listening datas
- Concert recommendations
- Friend system
- Android/iOS version

Please note that the documentation from Spotify for their APIs is pretty outdated (Checked on April 2025).


## Tech Stack

**Client:** React, Vite, Leaflet

**Server:** Node, Express, MongoDB, Mongoose

**API:** Spotify Web Playback SDK, Spotify Web API

**Important:** A Spotify premium membership and Spotify Dev account are required.

## Installation

- Install dependencies.

**Spotify Dev Website:**

- Create a [Spotify Dev Account](https://developer.spotify.com/dashboard) and enter your app name and description.

- Add http://127.0.0.1:3000/auth/callback to your Redirect URIs.

**Project files:**

- Update the .env.example variables in /server folder with your Spotify Client ID and Spotify Client Secret and use them in your .env file.







## Usage/Examples

1. Run the project locally (Client, Server, Database).
1. On the starting page, if there's a certificate security warning proceed anyway (we're local), authorize location tracking and Login to Spotify.
1. If not already listening to Spotify on a separate device, search for a song in the search box and click on the magnifying glass. (Click on the cross button if you want to reset your search.)
1. Click on a song. When the song plays, a pin should appear on the map and the view should re-position on it.
1. Repeat the process and you should see a new pin appearing on the map linked to the first one by a line.
1. Click on a tag and you should see the data attached to it.

## Documentation

[Spotify Web API](https://developer.spotify.com/documentation/web-api)

[Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) (pretty outdated)

[Spotify Dev Account](https://developer.spotify.com/dashboard)

[Leaflet API](https://leafletjs.com/reference.html)

[React-Leaflet](https://react-leaflet.js.org/)


## Authors

- [@eric-gebus](https://www.github.com/-eric-gebus)

