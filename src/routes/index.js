var express = require('express');
const { index, listar, search } = require('../controllers/indexController');
var router = express.Router();

/* llego con: / */
router.get('/', index);
router.get('/libros', listar)
router.get('/search', search)

module.exports = router;
