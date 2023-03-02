const express = require('express');
const { login, register, processRegister, processLogin } = require('../controllers/usersController');
const { uploadIconImage } = require('../middlewares/iconProfile');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const router = express.Router();


/*llego con:    /users/ */

router.get('/register', register)
router.post('/register', uploadIconImage.single('icon'), registerValidator, processRegister)
router.get('/login', login)
router.post('/login', loginValidator, processLogin)

/* Registrar Usuario */



module.exports = router