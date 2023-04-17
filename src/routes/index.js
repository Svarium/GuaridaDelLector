var express = require('express');
const { index, listar, search,admin, nosotros, listUsers, preguntasFrecuentes} = require('../controllers/indexController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
var router = express.Router();

/* llego con: / */
router.get('/', index);
router.get('/admin',checkUserAdmin ,admin)
router.get('/usuarios', checkUserAdmin, listUsers)
router.get('/libros', listar)
router.get('/search', search)
router.get('/nosotros', nosotros)
router.get('/preguntasFrecuentes', preguntasFrecuentes)

module.exports = router;
