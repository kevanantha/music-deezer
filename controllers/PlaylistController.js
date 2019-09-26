const { Playlist } = require('../models')
const { Song } = require('../models')
const { User } = require('../models')

class PlaylistController {
  static findAll(req, res) {
    let id = req.params.id
    let obj = {}
    obj['id'] = id
    console.log(id)
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
        res.send(err)
      })
  }

  static create(req, res) {
    Playlist.create({
      UserId: req.params.id,
      SongId: req.body.SongId,
    })
      .then(result => {
        res.redirect()
      })
      .catch(err => {
        res.redirect()
      })
  }

  static delete(req, res) {
    Playlist.destroy({
      where: {
        id: req.params.SongId,
      },
    })
      .then(() => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

// PlaylistController.findAll(req,res)
module.exports = PlaylistController
