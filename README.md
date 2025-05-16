# 🎵 SongTrail

**SongTrail** is a web application that visualizes your music-listening history in real time by pinning each song you play on a map.

### ✨ Features

- Seamless Spotify playback within the app
- Automatic location tracking for each played song
- Interactive personal music map with connected markers that trace your listening journey

### 🚧 Upcoming Features

- Song queue support
- Playlist integration
- Listening trail history
- Start songs with custom tags
- Rich listening statistics
- Concert recommendations based on taste
- Friend system & social integration
- Mobile apps (Android/iOS)

> ⚠️ *Note: Spotify's API documentation is somewhat outdated (as of April 2025).*

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, Leaflet  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**API:** Spotify Web Playback SDK, Spotify Web API  
**Testing:** Vitest, React Testing Library

> 🔐 *Requires a Spotify Premium account and a Spotify Developer account.*

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/songtrail.git
cd songtrail
```

### 2. Install Dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Configure Spotify Developer Account

- Create a [Spotify Developer Account](https://developer.spotify.com/dashboard).
- Register a new app and set the following Redirect URI:
  ```
  http://127.0.0.1:3000/auth/callback
  ```

### 4. Environment Variables

- Copy the `.env.example` in `/server` to `.env` and update it with:
  - `SPOTIFY_CLIENT_ID`
  - `SPOTIFY_CLIENT_SECRET`

---

## 💻 Running the App

### Start the Client

```bash
cd client
npm run dev
```

### Start the Server

```bash
cd server
nodemon index.js
```

---

## 🧪 How to Use

1. Open the app in your browser.
2. Accept any local certificate warning, enable location tracking, and log in with Spotify.
3. If not already listening elsewhere, search for a song and click the play icon.
4. A pin will appear on the map at your location.
5. Each new song creates a new pin connected with a line, showing your musical path.
6. Click tags to view associated metadata.

---

## 📚 Documentation

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) *(outdated)*
- [Spotify Dev Account](https://developer.spotify.com/dashboard)
- [Leaflet API](https://leafletjs.com/reference.html)
- [React-Leaflet](https://react-leaflet.js.org/)

---

## 👩‍💻 Author

- [@liya-mary](https://github.com/liya-mary)
- [@tylaur](https://github.com/tylaur)
- [@eric-gebus](https://www.github.com/-eric-gebus)
