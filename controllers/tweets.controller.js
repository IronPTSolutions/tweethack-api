const { StatusCodes } = require('http-status-codes');
const Tweet = require("../models/Tweet.model")

module.exports.create = (req, res, next) => {
  Tweet.create({ content: req.body.content, user: req.currentUserId })
    .then(createdTweet => {
      res.status(StatusCodes.CREATED).json(createdTweet);
    })
    .catch(next)
}

module.exports.getCurrentUserTweets = (req, res, next) => {
  Tweet.find({ user: req.currentUserId }).sort({ createdAt: 'desc' })
    .populate('user')
    .then(tweets => {
      res.json(tweets);
    })
    .catch(next)
}