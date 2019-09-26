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
          success: req.query.success,
          topTracks: data.data,
          user: req.session.user,
          signedOut: req.query.signedOut,
          signedIn: req.query.signedIn,
        })
      })
      .catch(err => {
        res.redirect(`/?err=${err.message}`)
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
          UserId: req.session.user.userId,
          SongId: req.body.trackId,
        })
        return Promise.all([song, playlist])
      })
      .then(promise => {
        res.redirect(`/?success=Successfully added to playlist`)
      })
      .catch(err => {
        res.redirect(`/?err=${err.message}`)
      })
  }

  static search(req, res) {
    axios
      .get(`https://api.deezer.com/search?q=${req.body.q}`)
      .then(data => {
        res.render('home/search', {
          search: data.data,
          pageName: 'Search',
          user: req.session.user,
          err: req.query.err,
        })
      })
      .catch(err => {
        res.send(err.message)
        res.redirect(`/?err=${err.message}`)
      })
  }
}

module.exports = HomeController
