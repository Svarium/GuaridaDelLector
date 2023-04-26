const express = require('express')
const router = express.Router()
let {listUser} = require('../../controllers/api/apiUserControllers')

router.get('/', listUser)
module.exports = router