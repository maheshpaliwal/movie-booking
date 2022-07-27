const express = require('express')
const router = express.Router()
const bookingController = require('../../controllers/booking.controller')
const auth = require('../../middlewares/authorization')

router
  .route('/create')
  .post(auth(), bookingController.create)

router
  .route('/confirm')
  .post(auth(), bookingController.confirm)

router
  .route('/cancel')
  .post(auth(), bookingController.cancel)

module.exports = router
