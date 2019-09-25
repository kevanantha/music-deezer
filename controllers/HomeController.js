const axios = require('axios')
const { Song, Playlist } = require('../models')

class HomeController {
  static index(req, res) {
    axios
      .get(`https://api.deezer.com/chart/0/tracks`)
      .then(data => {
        res.render('home/index', {
          pageName: 'Home',
          err: req.query.err,
          topTracks: data.data,
          userId: 2,
        })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static addToPlaylist(req, res) {
    axios
      .get(`https://api.deezer.com/track/${Number(req.body.trackId)}`)
      .then(res => {
        const song = Song.findOrCreate({
          where: {
            id: res.data.id,
            name: res.data.title,
            link: res.data.link,
            preview: res.data.preview,
            artist: res.data.artist.name,
            picture: res.data.artist.picture_big,
          },
        })
        const playlist = Playlist.create({
          UserId: req.params.id,
          SongId: req.body.trackId,
        })
        return Promise.all([song, playlist])
      })
      .then(promise => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(`/?err=${err.message}`)
      })
  }
}

module.exports = HomeController
