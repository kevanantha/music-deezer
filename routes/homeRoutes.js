const router = require('express').Router()
const { HomeController, AuthController } = require('../controllers')
const loginMiddleware = require('../middlewares/login')

router.get('/signup', AuthController.signUpForm)
router.post('/signup', AuthController.signUp)
router.get('/signin', AuthController.signInForm)
router.post('/signin', AuthController.signIn)
router.get('/signout', AuthController.signOut)
router.post('/search', HomeController.search)

router.get('/', HomeController.index)
router.post('/users/add-to-playlist', loginMiddleware, HomeController.addToPlaylist)

module.exports = router
