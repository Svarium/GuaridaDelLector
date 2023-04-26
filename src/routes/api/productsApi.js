var express = require('express');
var router = express.Router();
const {index,detail}= require('../../controllers/api/productApiController')

/* llego con: /api/libros */
router.get('/', index);
router.get('/:id',detail)

module.exports = router;