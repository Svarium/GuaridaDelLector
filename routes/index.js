var express = require('express');
const { index } = require('../controllers/indexController');
var router = express.Router();

/* llego con: / */
router.get('/', index)

module.exports = router;
