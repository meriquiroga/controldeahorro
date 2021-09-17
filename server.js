const express = require('express')
const router = require('./routes/')
require('dotenv').config()
require('./config/database')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/', router)

app.listen(4000, () => console.log("Server listening"))