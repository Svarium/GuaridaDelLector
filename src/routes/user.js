const express = require('express');
const { login, register, processRegister, processLogin, logout, perfilDeUsuario, editarUsuario, editarU } = require('../controllers/usersController');
const { uploadIconImage } = require('../middlewares/iconProfile');
const checkUser = require('../middlewares/CheckUser')
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const router = express.Router();


/*llego con:    /user/ */

router.get('/register', checkUser, register)
router.post('/register', uploadIconImage.single('icon'), registerValidator, processRegister)
router.get('/login', checkUser, login)
router.post('/login', loginValidator, processLogin)
router.get('/logout', logout)
router.get('/perfilDeUsuario', perfilDeUsuario)
router.get('/editarUsuario/:id', editarU)
router.put('/editarUsuario/:id', uploadIconImage.single('icon'), editarUsuario)


/* Registrar Usuario */



module.exports = router