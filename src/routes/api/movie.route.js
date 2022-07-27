const express = require('express')
const router = express.Router()
const movieController = require('../../controllers/movie.controller')
const { create } = require('../../validations/admin.validation')
const validator = require('express-validation')
const auth = require('../../middlewares/authorization')

router
  .route('/')
  .get(auth(), movieController.getMovies)

router
  .route('/:movieId')
  .get(auth(), movieController.getMovieDetails)

router
  .route('/shows/:showId')
  .get(auth(), movieController.getSeatStatus)

module.exports = router
