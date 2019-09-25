const router = require('express').Router()
const { PlaylistController } = require('../controllers')

router.get('/users/:id/playlist', () => {
  PlaylistController.findAll
})
