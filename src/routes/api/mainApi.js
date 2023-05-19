var express = require('express');
const { metrics, lastBookStore, getDataSession } = require('../../controllers/api/mainApiControllers');
const { allGenres } = require('../../controllers/api/genresApiControllers');
var router = express.Router();

/* llego con: /api */

router.get('/metrics', metrics);
router.get('/genres', allGenres)
router.get('/lastBook', lastBookStore)
/* router.get('/session', getDataSession) */




module.exports = router;


