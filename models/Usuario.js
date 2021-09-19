const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    objetivo: {type: Number, default: 0}
})

const Usuario = mongoose.model('usuario', userSchema)

module.exports = Usuario