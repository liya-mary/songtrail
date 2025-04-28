const BASE_URL = 'http://localhost:3000/trails'

interface tag {
  artist: string;
  coordinates: number[];
  src: string;
  timestamp: number;
  title: string;
}

export default {
  getTags: async function () {
    const response = await fetch(BASE_URL);
    return await response.json();
  },

  addTag: async function (tag: tag) {
    console.log('Sending Tag:', {tag})
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag)
    })

    if (!response.ok) {
      console.log(`Failed to create Tag. Response status: ${response.status}`);
      return null;
    }
    return await response.json()
  },
}