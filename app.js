require('dotenv').config()
var express = require('express')
var app = express()
const PORT = process.env.PORT || 3000

const { userRoutes } = require('./routes')
const { AuthController } = require('./controllers')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/signup', AuthController.signUpForm)
app.post('/signup', AuthController.signUp)

// app.use('/users', userRoutes)

app.listen(PORT, console.log(`Server runs on PORT ${PORT}`))
