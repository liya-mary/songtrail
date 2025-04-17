const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: String,
    author: String,
    src: String,
    coordinates: Array,
    timestamp: Number,
  }
)

const Tags = mongoose.model('Tags', tagSchema);

module.exports = Tags;