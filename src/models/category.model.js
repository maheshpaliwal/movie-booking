const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    maxlength: 250,
    unique: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)
