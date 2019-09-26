const router = require('express').Router()
const { AuthController } = require('../controllers')

router.get('/signup', AuthController.signUpForm)
router.post('/signup', AuthController.signUp)
router.get('/signin', AuthController.signInForm)
router.post('/signin', AuthController.signIn)

module.exports = router
