const express = require('express')
const router = require('./routes/')
const session = require('express-session')
require('dotenv').config()
require('./config/database')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.FRASE,
    resave: false,
    saveUninitialized:  false
}))

app.use('/', router)

app.listen(4000, () => console.log("Server listening"))