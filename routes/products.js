const express = require('express');
const { listCategory, detail } = require('../controllers/productController');
const router = express.Router();

/* GET users listing. */
router.get('/category', listCategory);
router.get('/detail/:id', detail );

module.exports = router;
