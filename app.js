require('dotenv').config()
var express = require('express')
var app = express()
const axios = require('axios')
const session = require('express-session')
const PORT = process.env.PORT || 3000
const { homeRoutes, authRoutes, playlistRoutes, trackRoutes, userRoutes } = require('./routes')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)
app.locals.duration = require('./helpers/duration')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/users', playlistRoutes)
app.use('/tracks', trackRoutes)
app.use('/users/', userRoutes)

app.listen(PORT, console.log(`Server runs on PORT ${PORT}`))
