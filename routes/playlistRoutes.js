const router = require('express').Router()
const { PlaylistController } = require('../controllers')

const loginMiddleware = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect(`/signin?err=You need to sign in before add playlist`)
  }
}

router.get('/playlist', loginMiddleware, PlaylistController.findAll)
router.get('/playlist/:SongId', loginMiddleware, PlaylistController.delete)
module.exports = router
