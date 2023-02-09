const express = require('express');
const { listCategory, detail, agregar, editar, store, update,remove} = require('../controllers/productController');
const router = express.Router();

/*llego con:   /products/ */

/* todos los productos por categoría */
router.get('/category', listCategory);

/* detalle de un producto */
router.get('/detail/:id', detail );

/* agregar nuevo producto */
router.get('/agregar/', agregar)
router.post('/', store)

/* editar un producto */
router.get('/editar/:id', editar);
router.put('/editar/:id', update) 

/* eliminar un producto */
router.delete('/delete/:id',remove) 

module.exports = router;
