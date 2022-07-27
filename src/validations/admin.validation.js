const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: {
      name: Joi.string().min(3).max(50).required(),
      city: Joi.string().min(3).max(50).required(),
      coordinates: Joi.array().items(Joi.number()),
      theaterCode: Joi.string().min(3).max(50).required(),
      seats: Joi.number().required()
    }
  },
  createMovie: {
    body: {
      name: Joi.string().min(3).max(250).required(),
      movieCode: Joi.string().min(3).required()
    }
  }
}
