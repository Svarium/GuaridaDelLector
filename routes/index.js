var express = require('express');
const { index, listar } = require('../controllers/indexController');
var router = express.Router();

/* llego con: / */
router.get('/', index);
router.get('/libros', listar)

module.exports = router;
