const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')
const adminRouter = require('./admin.route')
const movieRouter = require('./movie.route')
const bookingRouter = require('./booking.route')
const userRouter = require('./user.route');

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths

router.use('/admin', adminRouter)
router.use('/movies', movieRouter)
router.use('/bookings', bookingRouter)
router.use('/users', userRouter)

module.exports = router
