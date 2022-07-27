const Theater = require('../models/theater.model')
const Movie = require('../models/movie.model')
const Booking = require('../models/booking.model')
const Category = require('../models/category.model')
const Show = require('../models/show.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.getMovies = async (req, res, next) => {
  try {
    const { city, longitude, latitude } = req.query
    let theaterData = []
    if (city) {
      theaterData = await Theater.find({
        city
      }, {
        _id: 1
      })
    } else if (longitude && latitude) {
      const coordinates = [longitude, latitude]
      theaterData = await Theater.find({
        location: {
          $near: {
            $maxDistance: 15000,
            $geometry: {
              type: 'Point',
              coordinates
            }
          }
        }
      })
    } else {
      return res.status(400).json({
        message: 'Please specify city or location'
      })
    }
    const theaterIds = theaterData.map(theater => theater._id)
    const shows = await Show.find({
      theaterId: {
        $in: theaterIds
      },
      start: {
        $gte: new Date()
      }
    }, {
      movieId: 1,
      theaterId: 1
    })
    const movieTheaterMap = {}
    const movieIds = shows.map(show => {
      if (!movieTheaterMap[`${show.movieId}`]) {
        movieTheaterMap[`${show.movieId}`] = [
          show.theaterId
        ]
      } else {
        movieTheaterMap[`${show.movieId}`].push(show.theaterId)
      }
      return show.movieId
    })
    let movies = await Movie.find({
      _id: {
        $in: movieIds
      }
    })

    movies = movies.map(movie => {
      movie = movie.toObject()
      movie.theaters = movieTheaterMap[`${movie._id}`]
      return movie
    })

    return res.json(movies)
  } catch (error) {
    return next(error)
  }
}

exports.getMovieDetails = async (req, res, next) => {
  try {
    const { movieId } = req.params
    const {city, longitude, latitude} = req.query
    let theaterData = []
    if (!movieId) {
      return res.status(400).json({
        message: 'Please provide movie id'
      })
    }
    const movieData = {
      details: '',
      shows: []

    }

    const movieDetails = await Movie.findOne({
      movieId
    })
    if (!movieDetails) {
      return res.status(404).json({
        message: 'No movies found'
      })
    }
    movieData.details = movieDetails
    if (city) {
      theaterData = await Theater.find({
        city
      }, {
        _id: 1
      })
    } else if (longitude && latitude) {
      const coordinates = [longitude, latitude]
      theaterData = await Theater.find({
        location: {
          $near: {
            $maxDistance: 15000,
            $geometry: {
              type: 'Point',
              coordinates
            }
          }
        }
      })
    } else {
      return res.status(400).json({
        message: 'Please specify city or location'
      })
    }
    const theaterIds = theaterData.map(theater => theater._id)
    const shows = await Show.find({
      theaterId: {
        $in: theaterIds
      },
      movieId,
      start: {
        $gte: new Date()
      }
    })

    movieData.shows = shows
    return res.json(movieData)
  } catch (error) {
    return next(error)
  }
}
exports.getSeatStatus = async (req, res, next) => {
  try {
    const { showId } = req.params
    const bookedSeats = await Booking.find({
      showId,
      status: {
        $in: ['BOOKED']
      }
    }, {
      seatNumber: true
    })
    const bookedSeatMap = {

    }

    for (let seat of bookedSeats) {
      bookedSeatMap[`${seat.seatNumber}`] = true
    }

    const showData = await Show.findOne({
      _id: showId
    })
    const seats = []
    let seatNumber = 1
    while (seatNumber <= showData.seats) {
      if (!bookedSeatMap[seatNumber]) {
        seats.push({
          seatNumber,
          status: 'Not Booked'
        })
      } else {
        seats.push({
          seatNumber,
          status: 'Booked'
        })
      }

      seatNumber += 1
    }

    return res.json(seats)
  } catch (error) {
    return next(error)
  }
}
