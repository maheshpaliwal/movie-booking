const mongoose = require('mongoose')
const Schema = mongoose.Schema
const showsSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    index: true
  },
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: 'Theater',
    index: true
  },

  start: {
    type: Date,
    index: true
  },
  end: {
    type: Date,
    index: true
  },
  seats: {
    type: Number
  }

}, {
  timestamps: true
})

showsSchema.index({movieId: 1, theaterId: 1, start: 1}, {unique: true})
showsSchema.index({movieId: 1, theaterId: 1, start: 1, end: true}, {unique: true})

module.exports = mongoose.model('Show', showsSchema)
