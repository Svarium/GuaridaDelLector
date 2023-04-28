var express = require('express');
var router = express.Router();
const {index,detail, store, update, destroy}= require('../../controllers/api/productApiController');
const { uploadProductImages } = require('../../middlewares/upload');
const addLibroValidator = require('../../validations/addLibroValidator');

/* llego con: /api/libros */
router.get('/', index);
router.get('/:id',detail)
router.post('/',uploadProductImages.single('image'),addLibroValidator,store)
router.put('/:id', uploadProductImages.single('image'), addLibroValidator, update)
router.delete('/:id', destroy)


module.exports = router;