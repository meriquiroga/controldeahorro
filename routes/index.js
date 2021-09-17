const express = require('express')
const router = express.Router()
const movimientosControllers = require('../controllers/controllers')
const usersControllers = require('../controllers/usersControllers')

router.route('/')
.get(movimientosControllers.home)

router.route('/balance')
.get(movimientosControllers.balance)
.post(movimientosControllers.guardarMovimiento)

router.route('/editar')
.get(movimientosControllers.editarPanel)

router.route('/eliminar/:_id')
.get(movimientosControllers.eliminar)

router.route('/editar/:_id')
.get(movimientosControllers.editar)

router.route('/ingresar')
.get(usersControllers.ingresar)
.post(usersControllers.ingresarForm)

router.route('/crear-cuenta')
.get(usersControllers.crearCuenta)
.post(usersControllers.crearCuentaForm)

module.exports = router