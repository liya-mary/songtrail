
export default {
  getAccessToken: async function () {
    try {
      const response = await fetch('http://localhost:3000/spotify/token');

      if (!response.ok) {
        console.error(`Failed to retrieve an accessToken: ${response.status}`);
        return null;
      }

      const tokenObject = await response.json();
      const accessToken = tokenObject.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error in getAccessToken:', error);
      return null;
    }
  },

  searchSong: async function (searchInput, accessToken) {
    try {
      if (!searchInput || !accessToken) throw new Error('Missing parameters');

      const searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
      };

      const params = new URLSearchParams({ q: searchInput, type: 'track', limit: '5' });
      const url = `https://api.spotify.com/v1/search?${params.toString()}`;
      console.log(url);

      const response = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&limit=5', searchParameters);
      console.log('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track&limit=5', searchParameters)
      return await response.json();
    } catch (error) {
      console.error('Error in searchSong:', error);
      throw error;
    }
  },


  getAuthToken: async function () {
    try {
      const response = await fetch('/auth/token');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error in getAuthToken:', error);
      throw error;
    }
  },
};