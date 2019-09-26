require('dotenv').config()
var express = require('express')
var app = express()
const axios = require('axios')
const session = require('express-session')
const PORT = process.env.PORT || 3000

const { userRoutes, homeRoutes, playlistRoutes } = require('./routes')
const { AuthController } = require('./controllers')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/signup', AuthController.signUpForm)
app.post('/signup', AuthController.signUp)
app.get('/signin', AuthController.signInForm)
app.post('/signin', AuthController.signIn)

app.get('/search', (req, res) => {
  axios
    .get(`https://api.deezer.com/search?q=${req.query.q}`)
    .then(data => {
      res.send(data.data)
    })
    .catch(err => {
      res.send(err.message)
    })
})

app.use('/', homeRoutes)
// app.use('/users', userRoutes)
app.use('/users', playlistRoutes)

app.listen(PORT, console.log(`Server runs on PORT ${PORT}`))
