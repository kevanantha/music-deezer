const router = require('express').Router()
const { TrackController } = require('../controllers')

router.get('/:trackId', TrackController.show)

module.exports = router
