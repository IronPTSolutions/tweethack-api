const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const User = require("../models/User.model")

module.exports.create = (req, res, next) => {
  User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
    .then(user => {
      if (user) {
        next(createError(StatusCodes.BAD_REQUEST, 'Username or email already in use'));
      } else {
        User.create(req.body)
          .then(userCreated => {
            res.status(StatusCodes.CREATED).json(userCreated)
          })
          .catch(next)
      }
    })
}