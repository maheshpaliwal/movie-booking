const Theater = require('../models/theater.model')
const Movie = require('../models/movie.model')
const Category = require('../models/category.model')
const Show = require('../models/show.model')

exports.get = async (req, res, next) => {
  try {
    const theaters = await Theater.find({
      ownerId: req.user._id
    })
    return res.json(theaters)
  } catch (error) {
    return next(error)
  }
}

exports.addTheater = async (req, res, next) => {
  try {
    const {coordinates} = req.body
    delete req.body.coordinates
    const theater = new Theater(req.body)
    theater.location = {
      type: 'Point',
      coordinates
    }
    theater.ownerId = req.user._id

    await theater.save()
    return res.json(theater)
  } catch (error) {
    return next(error)
  }
}

exports.getMovies = async (req, res, next) => {
  try {
    const theaters = await Movie.find({
      ownerId: req.user._id
    })
    return res.json(theaters)
  } catch (error) {
    return next(error)
  }
}

exports.addMovie = async (req, res, next) => {
  try {
    const movie = new Movie(req.body)

    await movie.save()
    return res.json(movie)
  } catch (error) {
    return next(error)
  }
}

exports.getCategories = async (req, res, next) => {
  try {
    const category = await Category.find({
    })
    return res.json(category)
  } catch (error) {
    return next(error)
  }
}

exports.addCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body)

    await category.save()
    return res.json(category)
  } catch (error) {
    return next(error)
  }
}

exports.getShows = async (req, res, next) => {
  try {
    const theaterIds = await Theater.find({
      ownerId: req.user._id
    }, {
      _id: 1
    })
    const shows = await Show.find({
      theaterId: {
        $in: theaterIds
      }
    })
    return res.json(shows)
  } catch (error) {
    return next(error)
  }
}

exports.addShow = async (req, res, next) => {
  try {
    const theaterData = await Theater.findOne({
      ownerId: req.user._id,
      theaterCode: req.body.theaterCode
    })
    if (!theaterData) {
      return res.status(404).json({
        message: 'No theater found'
      })
    }
    const movieData = await Movie.findOne({
      movieCode: req.body.movieCode
    })
    if (!movieData) {
      return res.status(404).json({
        message: 'No Movies Found'
      })
    }
    const show = new Show(req.body)
    show.theaterId = theaterData._id
    show.movieId = movieData._id

    await show.save()
    return res.json(show)
  } catch (error) {
    return next(error)
  }
}
