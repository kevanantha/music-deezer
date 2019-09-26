const { Playlist } = require('../models')
const { Song } = require('../models')
const { User } = require('../models')

class PlaylistController {
  static findAll(req, res) {
    let id = req.session.user.userId
    let obj = {}
    obj['id'] = id
    User.findByPk(id, {
      include: [
        {
          model: Song,
        },
      ],
    })
      .then(result => {
        obj = result
        // res.send(result)
        //   res.send(obj)
        res.render('viewPlaylist', { pageName: 'View Playlist', obj, user: req.session.user })
      })
      .catch(err => {
        res.redirect(`/users/playlist/?error=${err}`)
      })
  }

  static delete(req, res) {
    Playlist.destroy({
      where: {
        SongId: req.params.SongId,
        UserId: req.session.user.userId,
      },
    })
      .then(() => {
        res.redirect('/users/playlist')
      })
      .catch(err => {
        res.redirect(`/users/playlist/?error=${err}`)
      })
  }
}

// PlaylistController.findAll(req,res)
module.exports = PlaylistController
