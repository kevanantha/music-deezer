const router = require('express').Router()
const { PlaylistController } = require('../controllers')

router.get('/:id/playlist', PlaylistController.findAll)
router.get('/:id/playlist/:SongId', PlaylistController.delete)
module.exports = router
