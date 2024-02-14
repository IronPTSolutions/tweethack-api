const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const tweetsController = require('../controllers/tweets.controller');
const followsController = require('../controllers/follows.controller');
const likesController = require('../controllers/likes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth
router.post('/login', authController.login);

// Users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', usersController.getUser)
router.post('/users', usersController.create);

// Tweets
router.post('/tweets', authMiddleware.isAuthenticated, tweetsController.create);
router.get('/tweets/me', authMiddleware.isAuthenticated, tweetsController.getCurrentUserTweets)

// Follows
router.post('/follows/:followedId', authMiddleware.isAuthenticated, followsController.toggleFollow);
router.get('/following/me', authMiddleware.isAuthenticated, followsController.getCurrentUserFollowing);
router.get('/following/:id', followsController.getUserFollowing);
router.get('/followed/me', authMiddleware.isAuthenticated, followsController.getCurrentUserFollowed);
router.get('/followed/:id', followsController.getUserFollowed);

// Likes
router.post('/likes/:tweetOwner/:tweet', authMiddleware.isAuthenticated, likesController.toggleLike);

module.exports = router;