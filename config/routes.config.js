const router = require('express').Router();
const usersController = require('../controllers/users.controller');

// Auth

// Users
router.post('/users', usersController.create);

module.exports = router;