const mongoose = require('mongoose')

const movimientoSchema = new mongoose.Schema({
    description: {type: String},
    number: {type: Number},
    userId: {type: mongoose.Types.ObjectId, ref: 'user'}
})

const Movimiento = mongoose.model('movimiento', movimientoSchema)

module.exports = Movimiento 