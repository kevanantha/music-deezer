const router = require('express').Router()
const { HomeController, AuthController } = require('../controllers')

const loginMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user
    next()
  } else {
    res.redirect('/signin')
  }
}

router.get('/signup', AuthController.signUpForm)
router.post('/signup', AuthController.signUp)
router.get('/signin', AuthController.signInForm)
router.post('/signin', AuthController.signIn)
router.get('/signout', AuthController.signOut)

router.get('/', HomeController.index)
router.post('/users/add-to-playlist', loginMiddleware, HomeController.addToPlaylist)

module.exports = router
