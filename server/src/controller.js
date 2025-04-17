const Tags = require('./models.js')

async function getTags (req, res) {
  try {
    const tags = await Tags.find();
    res.status(200).json(tags);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addTag (req, res) {
  try {
    console.log(req.body);
    const newTag = await Tags.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

async function getToken (req, res) {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + SPOTIFY_CLIENT_ID + '&client_secret=' + SPOTIFY_CLIENT_SECRET
    })
    const accessToken = await response.json()
    res.status(200).json(accessToken)

  } catch (err) {
    console.log(err);
      res.status(500).json(err)
  }
}


module.exports = {getTags, addTag, getToken}