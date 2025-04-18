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
    const newTag = await Tags.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

async function getToken (req, res) {
  try {
    const { CLIENT_ID, CLIENT_SECRET } = process.env;
    console.log(CLIENT_ID, CLIENT_SECRET)
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    })
    const tokenObject = await response.json()
    res.status(200).json(tokenObject)

  } catch (err) {
    console.log(err);
      res.status(500).json(err)
  }
}


module.exports = {getTags, addTag, getToken}