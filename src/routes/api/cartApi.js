const express = require('express');
const { getOrderPending, addProduct, removeProduct, moreQuantity, lessQuantity, clearCart, statusOrder } = require('../../controllers/api/cartApiController');
const router = express.Router()

/* /api/cart */

router.get('/getOrderPending', getOrderPending)
router.post('/addProduct', addProduct)
router.delete('/removeProduct', removeProduct)
router.put('/moreQuantity', moreQuantity)
router.put('/lessQuantity', lessQuantity)
router.delete('/clearCart', clearCart)
router.put('/statusOrder', statusOrder)



module.exports = router;