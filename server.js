const express = require('express')
const router = require('./routes/')

const app = express()

app.use(express.static('public'))

app.use('/', router)

app.listen(4000, () => console.log("Server listening"))