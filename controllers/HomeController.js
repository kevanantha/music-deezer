const axios = require('axios')

class HomeController {
  static index(req, res) {
    axios
      .get(`https://api.deezer.com/chart/0/tracks`)
      .then(data => {
        res.send(data.data)
        // res.render('home/index', {
        //   title: 'Home',
        //   topTracks: data.data,
        // })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
}

module.exports = HomeController
