const router = require('express').Router()
const { UserController } = require('../controllers')
const loginMiddleware = require('../middlewares/login')

router.get('/edit', loginMiddleware, UserController.formEdit)
router.post('/edit', loginMiddleware, UserController.update)

module.exports = router
