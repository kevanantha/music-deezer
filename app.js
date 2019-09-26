require('dotenv').config()
var express = require('express')
var app = express()
const axios = require('axios')
const session = require('express-session')
const PORT = process.env.PORT || 3000

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)

const { homeRoutes, authRoutes, playlistRoutes } = require('./routes')

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

app.use('/', homeRoutes)
app.use('/users', playlistRoutes)

app.listen(PORT, console.log(`Server runs on PORT ${PORT}`))
