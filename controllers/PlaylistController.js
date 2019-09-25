const { Playlist } = require('../models')
const { Song } = require('../models')
const { User } = require('../models')

class PlaylistController {
  static findAll(req, res) {
    let id = req.params.id
    let obj = {}
    obj['id'] = id
    console.log(id)
    User.findByPk(id)
      .then(result => {
        console.log(result)
        // res.render("addStudentSubject", {id, result})
        return (obj['result'] = result)
        // res.render("editStudent", {id, result});
      })
      .then(() => {
        return Song.findAll()
          .then(Songs => {
            console.log(Songs)
            return (obj['Songs'] = Songs)
          })
          .catch(err => {
            return err
          })
      })
      .then(() => {
        res.send(obj)
        // res.render("addStudentSong", {obj})
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
    Playlist.delete({
      where: {},
    })
  }
}

// PlaylistController.findAll(req,res)
module.exports = PlaylistController
