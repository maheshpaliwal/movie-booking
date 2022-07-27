const Booking = require('../models/booking.model')

exports.get = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user._id
    })
    const userBookings = {}

    for (let booking of bookings) {
      console.log(booking, 'booking')
      if (!userBookings[booking.bookingId]) {
        userBookings[booking.bookingId] = booking.toObject()
        delete userBookings[booking.bookingId].seatNumber
        userBookings[booking.bookingId].seats = []
        userBookings[booking.bookingId].seats.push(booking.seatNumber)
      } else {
        userBookings[booking.bookingId].seats.push(booking.seatNumber)
      }
    }

    return res.json(Object.values(userBookings))
  } catch (error) {
    return next(error)
  }
}
