const { User } = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
  static signUpForm(req, res) {
    res.render('auths/signUpForm', {
      pageName: 'Sign Up',
      err: req.query.err,
      user: req.session.user,
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
          req.session.user = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
          }
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
      user: req.session.user,
    })
  }

  static signIn(req, res) {
    let userData
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(user => {
        if (user) {
          userData = user
          return bcrypt.compare(req.body.password, user.dataValues.password)
        } else {
          throw { type: 'UNREGISTERED', message: 'No data, please sign up' }
        }
      })
      .then(response => {
        if (response) {
          req.session.user = {
            userId: userData.dataValues.id,
            username: userData.dataValues.username,
          }
          res.redirect('/')
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

  static signOut(req, res) {
    req.session.destroy(err => {
      if (err) res.redirect(`/?err=${err.message}`)
      res.redirect('/')
    })
  }
}

module.exports = AuthController
