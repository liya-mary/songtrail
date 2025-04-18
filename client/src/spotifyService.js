
export default {
  getAccessToken: async function () {
    const response = await fetch('http://localhost:3000/spotify/token');

    if (!response.ok) {
      console.error(`Failed to retrieve an accessToken: ${response.status}`);
      return null;
    }

    const tokenObject = await response.json();
    console.log(tokenObject)
    const accessToken = tokenObject.access_token;
    console.log(accessToken)

    return accessToken

  },
// how to make them communicate?
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
}