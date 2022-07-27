const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin.controller')
const { create } = require('../../validations/admin.validation')
const validator = require('express-validation')
const auth = require('../../middlewares/authorization')

router
  .route('/theaters')
  .get(auth(['admin']), adminController.get)
  .post(auth(['admin']), validator(create), adminController.addTheater)

router
  .route('/movies')
  .get(auth(['admin']), adminController.getMovies)
  .post(auth(['admin']), adminController.addMovie)
router
  .route('/categories')
  .get(auth(['admin']), adminController.getCategories)
  .post(auth(['admin']), adminController.addCategory)

router
  .route('/shows')
  .get(auth(['admin']), adminController.getShows)
  .post(auth(['admin']), adminController.addShow)

module.exports = router
