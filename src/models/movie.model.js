const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: {
    type: String,
    maxlength: 250
  },
  description: {
    type: String
  },
  movieCode: {
    type: String,
    index: true,
    unique: true,
    require: true
  },
  categories: []
}, {
  timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)
