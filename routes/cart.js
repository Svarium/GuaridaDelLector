const express = require('express');
const { cart } = require('../controllers/cartController');
const router = express.Router();

/* GET users listing. */
router.get('/cart', cart);

module.exports = router;
