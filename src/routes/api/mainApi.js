var express = require('express');
const { metrics, lastBookStore } = require('../../controllers/api/mainApiControllers');
const { allGenres } = require('../../controllers/api/genresApiControllers');
var router = express.Router();

/* llego con: /api */

router.get('/metrics', metrics);
router.get('/genres', allGenres)
router.get('/lastBook', lastBookStore)



module.exports = router;