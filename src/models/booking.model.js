const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User'
  },
  showId: {
    type: Schema.Types.ObjectId,
    ref: 'Show',
    index: true
  },
  seatNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAYMENT_FAILED', 'BOOKED', 'CANCELLED'],
    index: true
  },
  bookingId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Booking', bookingSchema)
