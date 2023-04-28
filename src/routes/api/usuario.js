const express = require('express')
const router = express.Router()
let {listUser, detail, store, update} = require('../../controllers/api/apiUserControllers')
const { uploadIconImage } = require('../../middlewares/iconProfile')
const registerValidator = require('../../validations/registerValidator')
const updateValidator = require('../../validations/updateValidator')


/* LLEGO CON /api/users */

router.get('/', listUser)
router.get('/:id',detail)
router.post('/', uploadIconImage.single('icon'), registerValidator, store)
router.put('/:id', uploadIconImage.single('icon'),updateValidator, update )

module.exports = router