const express = require('express')
const router = express.Router()
let {listUser, detail} = require('../../controllers/api/apiUserControllers')

router.get('/', listUser)
router.get('/:id',detail)

module.exports = router