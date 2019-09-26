const axios = require('axios')

class TrackController {
  static show(req, res) {
    axios
      .get(`https://api.deezer.com/track/${Number(req.params.trackId)}`)
      .then(data => {
        // res.send(data.data)
        res.render('tracks/show', {
          track: data.data,
          err: req.query.err,
          user: req.session.user,
          pageName: `${data.data.title}`,
        })
      })
      .catch(err => {
        res.redirect(`/?err=${err.message}`)
      })
  }
}

module.exports = TrackController
