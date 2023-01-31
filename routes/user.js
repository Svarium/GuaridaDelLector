const express = require('express');
const { login, register } = require('../controllers/usersController');
const router = express.Router();


/*llego con:    /users/ */

router.get('/register', register)
router.get('/login', login)

module.exports = router