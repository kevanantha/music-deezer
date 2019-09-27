const { User } = require('../models')

class UserController {
  static formEdit(req, res) {
    User.findByPk(req.session.user.userId)
      .then(user => {
        res.render('users/formEdit', {
          u: user,
          err: req.query.err,
          user: req.session.user,
          pageName: 'Edit Profile',
        })
      })
      .catch(err => {
        res.redirect(`/users/edit?err=${err.message}`)
      })
  }

  static update(req, res) {
    User.update(
      {
        username: req.body.username,
      },
      {
        where: {
          id: req.session.user.userId,
        },
        individualHooks: true,
      },
    )
      .then(() => {
        req.session.user.username = req.body.username
        res.redirect('/')
      })
      .catch(err => {
        res.redirect(`/users/edit?err=${err.message}`)
      })
  }
}

module.exports = UserController
