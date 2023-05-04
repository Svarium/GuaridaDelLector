const express = require('express')
const router = express.Router()
let {listUser, detail, store, update, destroy, verifyEmail, verifyPass} = require('../../controllers/api/apiUserControllers')
const { uploadIconImage } = require('../../middlewares/iconProfile')
const registerValidator = require('../../validations/registerValidator')
const updateValidator = require('../../validations/updateValidator')



/* LLEGO CON /api/users */

router.get('/', listUser)
router.get('/:id',detail)
router.post('/verify-email', verifyEmail)
router.post('/verify-pass', verifyPass)
router.post('/', uploadIconImage.single('icon'), registerValidator, store)
router.put('/:id', uploadIconImage.single('icon'),updateValidator, update )
router.delete('/:id', destroy)


module.exports = router