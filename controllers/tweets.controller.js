const { StatusCodes } = require('http-status-codes');
const Tweet = require("../models/Tweet.model");
const Like = require('../models/Like.model');

module.exports.create = (req, res, next) => {
  Tweet.create({ content: req.body.content, user: req.currentUserId })
    .then(createdTweet => {
      res.status(StatusCodes.CREATED).json(createdTweet);
    })
    .catch(next)
}

const getUserTweetsById = (id, req, res, next) => {
  Tweet.find({ user: id }).sort({ createdAt: 'desc' })
    .populate('user')
    .then(tweets => {
      // const tweetsWithLikes = []   // { tweet: {}, likes: 20 }
      const tweetLikePromises = tweets.map(tweet => {
        return Like.countDocuments({ tweet: tweet.id }) // [3, 0, 50, 100]
      })

      return Promise.all(tweetLikePromises)
        .then(likesPerTweet => { // [3, 0, 50, 100]
          const response = likesPerTweet.map((numLikes, index) => {
            return {
              tweet: tweets[index],
              likes: numLikes,
            }
          })

          res.json(response)
        })

      // res.json(tweets);
    })
    .catch(next)
}

module.exports.getCurrentUserTweets = (req, res, next) => {
  getUserTweetsById(req.currentUserId, req, res, next)
}

module.exports.getUserTweets = (req, res, next) => {
  getUserTweetsById(req.params.id, req, res, next)
}