const BASE_URL = 'https://localhost:3000/trails'

export default {
  getTags: async function () {
    const response = await fetch(BASE_URL);
    return await response.json;
  },

  addTag: async function (tag) {
    console.log('Sending Tag:', {tag})
    const response = await fetch(BASE_URL, {
      method: "POST",
      header: {
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