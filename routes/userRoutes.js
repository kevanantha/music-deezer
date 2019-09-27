const router = require('express').Router()
const { UserController } = require('../controllers')

router.get('/edit', UserController.formEdit)
router.post('/edit', UserController.update)

module.exports = router
