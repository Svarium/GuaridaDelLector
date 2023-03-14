const express = require('express');
const { cart } = require('../controllers/cartController');
const CheckUser = require('../middlewares/CheckUser');
const router = express.Router();


/* /cart */
router.get('/cart', CheckUser ,  cart);
router.get('/cart/:id', CheckUser, cart);

module.exports = router;
