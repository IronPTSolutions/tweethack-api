const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

// Auth
router.post('/login', authController.login);

// Users
router.post('/users', usersController.create);

module.exports = router;