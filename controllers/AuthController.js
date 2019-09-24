const { User } = require('../models')

class AuthController {
  static signUpForm(req, res) {
    res.render('auths/signUpForm')
  }

  static signUp(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(([user, created]) => {
        if (created) {
          res.redirect('/signup')
        } else {
          throw { type: 'USER_EXIST', message: 'User already exist' }
        }
      })
      .catch(err => {
        if (err.type === 'USER_EXIST') {
          res.redirect(`/signup?err=${err.message}`)
        } else {
          res.redirect(`/signup?err=${err.message}`)
        }
      })
  }
}

module.exports = AuthController
