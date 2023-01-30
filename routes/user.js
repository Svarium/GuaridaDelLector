const express = require('express');
const { login, register } = require('../controllers/usersController');
const router = express.Router();

router.get('/register', register)
router.get('/login', login)

module.exports = router