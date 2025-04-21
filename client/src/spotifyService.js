
export default {
  getAccessToken: async function () {
    const response = await fetch('http://localhost:3000/spotify/token');

    if (!response.ok) {
      console.error(`Failed to retrieve an accessToken: ${response.status}`);
      return null;
    }

    const tokenObject = await response.json();
    const accessToken = tokenObject.access_token;

    return accessToken

  },
  
  searchSong: async function (searchInput, accessToken) {
    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    }

    const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&limit=5', searchParameters)
    return await response.json()
  },


 getAuthToken: async function () {
    const response = await fetch('/auth/token');
    const json = await response.json();
    return json
  },

}