const router = require('express').Router()
const { HomeController } = require('../controllers')

router.get('/', HomeController.index)
router.post('/users/:id/add-to-playlist', HomeController.addToPlaylist)

module.exports = router
