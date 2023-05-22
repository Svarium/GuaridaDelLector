var express = require('express');
const { metrics, lastBookStore, getDataSession } = require('../../controllers/api/mainApiControllers');
const { allGenres } = require('../../controllers/api/genresApiControllers');
const { allAutors } = require('../../controllers/api/autorsApiController');
const { allEditorial } = require('../../controllers/api/editorialApiControllers');
var router = express.Router();

/* llego con: /api */

router.get('/metrics', metrics);
router.get('/lastBook', lastBookStore)
router.get('/genres', allGenres)
router.get('/editoriales', allEditorial)
router.get('/autores', allAutors)






module.exports = router;


