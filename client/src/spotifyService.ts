
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

  searchSong: async function (searchInput: string, accessToken: string) {
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

  getFavoritedSongs: async function (accessToken: string, offset: number) {
    try {
      if (!accessToken) throw new Error('Missing parameters');

      const searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
      };

      const params = new URLSearchParams({ limit: '15', offset: offset.toString() });
      const url = `https://api.spotify.com/v1/me/tracks?${params.toString()}`;

      const response = await fetch(url, searchParameters);
      const responseJson = await response.json();

      console.log(responseJson);

      return responseJson.items.map((item: any) => item.track);
    } catch (error) {
      console.error('Error in getFavoritedSongs:', error);
      throw error;
    }
  },

  addFavoriteSong: async function (accessToken: string, trackId: string | number) {
    try {
      if (!accessToken) throw new Error('Missing parameters');

      const searchParameters = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
          ids: [trackId]
        })
      };

      //const params = new URLSearchParams({ ids: `${trackId}` });
      const url = "https://api.spotify.com/v1/me/tracks"; //?${params.toString()}`;

      const response = await fetch(url, searchParameters);

      return response;
    } catch (error) {
      console.error('Error in addFavoriteSong:', error);
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
      return json.access_token;
    } catch (error) {
      console.error('Error in getAuthToken:', error);
      throw error;
    }
  },
};