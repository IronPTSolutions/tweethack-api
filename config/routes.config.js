const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const tweetsController = require('../controllers/tweets.controller');
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

module.exports = router;