const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: String,
    artist: String,
    src: String,
    coordinates: Array,
    timestamp: Number,
  }
)

const Tags = mongoose.model('Tags', tagSchema);

module.exports = Tags;