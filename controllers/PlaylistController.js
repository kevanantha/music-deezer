const { Playlist } = require('../models')
const { Song } = require('../models')
const { User } = require('../models')

class PlaylistController {
  static findAll(req, res) {
    let id = req.params.id
    let obj = {}
    obj['id'] = id
    // console.log(id)
    User.findByPk(req.params.id, {
      include: [
        {
          model: Song,
        },
      ],
    })
      .then(result => {
        obj = result

        //   res.send(obj)
        res.render('viewPlaylist', { pageName: 'View Playlist', obj })
      })
      .catch(err => {
        res.redirect(`/users/${id}/playlist/?error=${err}`)
      })
  }

  static delete(req, res) {
    Playlist.destroy({
      where: {
        SongId: req.params.SongId,
        UserId: req.params.id,
      },
    })
      .then(() => {
        res.redirect('/')
      })
      .catch(err => {
        res.redirect(`/users/${req.params.id}/playlist/?error=${err}`)
      })
  }
}

// PlaylistController.findAll(req,res)
module.exports = PlaylistController
