var express = require('express');
const { metrics } = require('../../controllers/api/mainApiControllers');
var router = express.Router();

/* llego con: /api */

router.get('/metrics', metrics);



module.exports = router;