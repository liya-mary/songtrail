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
    // console.log(newTag);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

module.exports = {getTags, addTag}