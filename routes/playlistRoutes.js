const router = require('express').Router()
const { PlaylistController } = require('../controllers')
const loginMiddleware = require('../middlewares/login')

router.get('/playlist', loginMiddleware, PlaylistController.findAll)
router.get('/playlist/:SongId', loginMiddleware, PlaylistController.delete)

module.exports = router
