const router = require('express').Router()
const { PlaylistController } = require('../controllers')

router.get('/playlist', PlaylistController.findAll)
router.get('/playlist/:SongId', PlaylistController.delete)
module.exports = router
