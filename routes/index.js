const express = require('express')
const router = express.Router()
const allControllers = require('../controllers/controllers')

router.route('/')
.get(allControllers.home)

router.route('/balance')
.get(allControllers.balance)

router.route('/nuevo-movimiento')
.get(allControllers.nuevoMovimiento)

module.exports = router