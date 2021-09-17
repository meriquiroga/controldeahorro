const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
})

const Usuario = mongoose.model('usuario', userSchema)

module.exports = Usuario