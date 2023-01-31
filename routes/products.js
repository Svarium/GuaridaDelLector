const express = require('express');
const { listCategory, detail, agregar, editar } = require('../controllers/productController');
const router = express.Router();

/*llego con:   /products/ */
router.get('/category', listCategory);
router.get('/detail/:id', detail );
router.get('/agregar', agregar)
router.get('/editar', editar)

module.exports = router;
