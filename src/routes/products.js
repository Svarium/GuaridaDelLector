const express = require('express');
const { listCategory, detail, agregar, editar, store, update,remove} = require('../controllers/productController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { uploadProductImages } = require('../middlewares/upload');
const addLibroValidator = require('../validations/addLibroValidator');


const router = express.Router();

/*llego con:   /products/ */

/* todos los productos por categoría */
router.get('/category', listCategory);

/* detalle de un producto */
router.get('/detail/:id', detail );

/* agregar nuevo producto */
router.get('/agregar/' /* checkUserAdmin */, agregar)
router.post('/', uploadProductImages.single('image'), addLibroValidator,  store)

/* editar un producto */
router.get('/editar/:id'/* , checkUserAdmin */, editar);
router.put('/editar/:id',uploadProductImages.single('image'), addLibroValidator,  update) 

/* eliminar un producto */
router.delete('/delete/:id',checkUserAdmin ,remove) 

module.exports = router;
