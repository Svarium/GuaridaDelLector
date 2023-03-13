var express = require('express');
const { index, listar, search,admin} = require('../controllers/indexController');
var router = express.Router();

/* llego con: / */
router.get('/', index);
router.get('/admin',admin)
router.get('/libros', listar)
router.get('/search', search)

module.exports = router;
