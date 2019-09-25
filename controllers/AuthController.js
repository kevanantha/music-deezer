const { User } = require('../models')

class AuthController {
  static signUpForm(req, res) {
    res.render('auths/signUpForm', {
      pageName: 'Sign Up',
    })
  }

  static signUp(req, res) {
    User.findOrCreate({
      where: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    })
      .then(([user, created]) => {
        if (created) {
          res.redirect('/')
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
