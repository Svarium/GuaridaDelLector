const express = require('express');
const { login, register, processRegister, processLogin, logout, perfil, editarPerfil, editRol } = require('../controllers/usersController');
const { uploadIconImage } = require('../middlewares/iconProfile');
const checkUser = require('../middlewares/CheckUser')
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
const checkUserLogin = require('../middlewares/checkUserLogin');
const updateValidator = require('../validations/updateValidator');
const router = express.Router();


/*llego con:    /user/ */
router.get('/logout', logout)
router.get('/perfil', checkUserLogin, perfil)


/* Registrar Usuario */
router.get('/register', checkUser, register)
router.post('/register', uploadIconImage.single('icon'), registerValidator , processRegister)


/* Loguear usuario */
router.get('/login', checkUser, login)
router.post('/login', loginValidator, processLogin)

/* Editar usuario */
router.put('/update/:id',uploadIconImage.single('icon'),updateValidator, editarPerfil)

/* Editar Rol de usuario */
router.post('/rol', editRol)



module.exports = router