const Theater = require('../models/theater.model')
const Movie = require('../models/movie.model')
const Booking = require('../models/booking.model')
const Category = require('../models/category.model')
const Show = require('../models/show.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.create = async (req, res, next) => {
  try {
    const {showId, seats} = req.body

    const bookings = await Booking.find({
      showId,
      status: 'BOOKED',
      seatNumber: {
        $in: seats
      }
    })

    if (bookings.length) {
      return res.status(400).json({
        message: 'seat/seats not available for booking'
      })
    }
    const newBookings = []
    const bookingId = uuidv1()
    for (let seat of seats) {
      newBookings.push({
        showId,
        status: 'PENDING',
        bookingId,
        userId: req.user._id,
        seatNumber: seat
      })
    }
    const booked = await Booking.insertMany(newBookings)
    return res.json(booked)
  } catch (error) {
    return next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    const { bookingId } = req.body
    let bookings = await Booking.find({
      bookingId,
      userId: req.user._id
    })
    if (!bookings.length) {
      return res.status(404).json({
        message: 'NO booking found'
      })
    }
    const seats = []
    for (let booking of bookings) {
      seats.push(booking.seatNumber)
    }
    const showId = bookings[0].showId
    bookings = await Booking.find({
      showId,
      status: 'BOOKED',
      seatNumber: {
        $in: seats
      }
    })
    if (bookings.length) {
      return res.status(400).json({
        message: 'seats already booked'
      })
    }
    const booked = await Booking.update({
      bookingId
    }, {
      status: 'BOOKED'
    })
    return res.json(booked)
  } catch (error) {
    return next(error)
  }
}

exports.cancel = async (req, res, next) => {
  try {
    const { bookingId } = req.body
    let bookings = await Booking.find({
      bookingId,
      userId: req.user._id
    })
    if (!bookings.length) {
      return res.status(404).json({
        message: 'NO booking found'
      })
    }

    const booked = await Booking.update({
      bookingId
    }, {
      status: 'CANCELLED'
    })
    return res.json(booked)
  } catch (error) {
    return next(error)
  }
}
