const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const auth = require('../../middlewares/authorization')

router
  .route('/bookings')
  .get(auth(), userController.get)

module.exports = router
