const router = require('express').Router()
const { UserController } = require('./controllers')

router.get('/', UserController.index)

module.exports = router
