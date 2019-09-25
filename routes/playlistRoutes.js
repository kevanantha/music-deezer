const router = require('express').Router()
const { PlaylistController } = require('../controllers')

router.get('/:id/playlist', PlaylistController.findAll)
module.exports = router
