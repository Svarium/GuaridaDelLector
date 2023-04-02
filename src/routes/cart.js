const express = require('express');
const { cart } = require('../controllers/cartController');

const checkUserLogin = require('../middlewares/checkUserLogin');
const router = express.Router();


/* /cart */

router.get('/cart', checkUserLogin ,  cart);
router.get('/cart/:id', checkUserLogin, cart);

module.exports = router;
