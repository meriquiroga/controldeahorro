const mongoose = require('mongoose')

const movimientoSchema = new mongoose.Schema({
    date: {type: String},
    description: {type: String},
    number: {type: Number},
    userId: {type: mongoose.Types.ObjectId, ref: 'usuario'}
})

const Movimiento = mongoose.model('movimiento', movimientoSchema)

module.exports = Movimiento 