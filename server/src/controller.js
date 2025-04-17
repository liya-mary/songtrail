const Events = require('./models.js')

async function getTags (req, res) {
  try {
    const tags = await Events.find();
    res.status(500).json(tags);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function addTag (req, res) {
  try {
    const newTag = await Events.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
}

module.exports = {getTags, addTag}