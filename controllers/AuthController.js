const { User } = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
  static signUpForm(req, res) {
    res.render('auths/signUpForm', {
      pageName: 'Sign Up',
      err: req.query.err,
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

  static signInForm(req, res) {
    res.render('auths/signInForm', {
      pageName: 'Sign In',
      err: req.query.err,
    })
  }

  static signIn(req, res) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(user => {
        if (user) {
          return bcrypt.compare(req.body.password, user.dataValues.password)
        } else {
          throw { type: 'UNREGISTERED', message: 'No data, please sign up' }
        }
      })
      .then(res => {
        if (res) {
          return User.update(
            { isLogin: true },
            {
              where: {
                username: req.body.username,
              },
            },
          )
        } else {
          throw { type: 'USERNAME_PASSWORD_WRONG', message: 'Username / password wrong' }
        }
      })
      .then(() => {
        res.redirect('/?isLogin=true')
      })
      .catch(err => {
        res.redirect(`/signup?err=${err.message}`)
      })
  }
}

module.exports = AuthController
