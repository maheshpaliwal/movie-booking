const mongoose = require('mongoose')
const Schema = mongoose.Schema

const theaterSchema = new Schema({
  name: {
    type: String,
    maxlength: 50
  },
  city: {
    type: String,
    maxlength: 50,
    required: true
  },
  location: {
    type: {
      type: String
    },
    coordinates: []
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  theaterCode: {
    type: String
  }
}, {
  timestamps: true
})
theaterSchema.index({location: '2dsphere'})
theaterSchema.index({ownerId: 1, theaterCode: 1}, {unique: true})

module.exports = mongoose.model('Theater', theaterSchema)
