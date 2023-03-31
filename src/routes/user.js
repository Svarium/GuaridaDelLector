const express = require('express');
<<<<<<< HEAD
const { login, register, processRegister, processLogin, logout, perfilDeUsuario, editarUsuario, editarU } = require('../controllers/usersController');
=======
const { login, register, processRegister, processLogin, logout, perfil } = require('../controllers/usersController');
>>>>>>> develop
const { uploadIconImage } = require('../middlewares/iconProfile');
const checkUser = require('../middlewares/CheckUser')
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const checkUserLogin = require('../middlewares/checkUserLogin');
const router = express.Router();


/*llego con:    /user/ */

router.get('/register', checkUser, register)
router.post('/register', uploadIconImage.single('icon'), registerValidator, processRegister)
router.get('/login', checkUser, login)
router.post('/login', loginValidator, processLogin)
router.get('/logout', logout)
<<<<<<< HEAD
router.get('/perfilDeUsuario', perfilDeUsuario)
router.get('/editarUsuario/:id', editarU)
router.put('/editarUsuario/:id', uploadIconImage.single('icon'), editarUsuario)

=======
router.get('/perfil', checkUserLogin, perfil)
>>>>>>> develop

/* Registrar Usuario */



module.exports = router