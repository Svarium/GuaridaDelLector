const express = require('express')
const router = express.Router()
let {listUser, detail, UserById} = require('../../controllers/api/apiUserControllers')

router.get('/', listUser)
router.get('/UserById/:id', UserById)
router.get('/:id',detail)

module.exports = router