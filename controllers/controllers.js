const path = require('path')
const Movimiento = require('../models/Movimiento')

const movimientosControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'Home',
            logueado: req.session.logueado, 
            name: req.session.name || ''
        })
    },

    balance: async (req, res) => {
        if (req.session.logueado) {
            const movimientos = await Movimiento.find()
            res.render('balance', {
                title: 'Balance',
                movimientos,
                error: null,
                logueado: req.session.logueado, 
                name: req.session.name || ''
        })
        }
        res.redirect('/crear-cuenta')
    },
    // Ese crear cuenta debería ir a no autorizado y con botón que cree cuenta
    // Andando antes de sessions
    /* balance: async (req, res) => {
        const movimientos = await Movimiento.find()
        res.render('balance', {
            title: 'Balance',
            movimientos,
            error: null
        })
    }, */

    editarPanel: (req, res) => {
        res.render('editar', {
            title: 'Editar movimiento',
            error: null,
            logueado: req.session.logueado, 
            name: req.session.name || ''
        })
    },

    guardarMovimiento: async (req, res) => {
        const {description, number} = req.body
        let newMovimiento = new Movimiento({
            description,
            number 
        })
        try {
            await newMovimiento.save()
            res.redirect('/balance')
        } catch(error) {
            res.render('editar', {
                title: 'Editar movimiento',
                error: error,
                logueado: req.session.logueado, 
                name: req.session.name || ''
            })

        }
    }, 


    // Este de abajo anda perfecto, lo comento para probar el editar ahí mismo
    /* guardarMovimiento: async (req, res) => {
        const {description, number} = req.body
        let newMovimiento = new Movimiento({
            description,
            number
        })
        try {
            await newMovimiento.save()
            res.redirect('/balance')
        } catch(error) {
            res.render('nuevo-movimiento', {
                title: 'Nuevo movimiento',
                error: error
            })

        }
    },  */

    eliminar: async (req, res) => {
        await Movimiento.findOneAndDelete({_id: req.params._id})
        res.redirect('/balance')
    }, 

    /* editar: async (req, res) => {
        const {description, number, _id} = req.body
        let movimiento = await Movimiento.findOne({_id})
        movimiento.description = description
        movimiento.number = number
        try {
            await movimiento.save()
            res.redirect('/balance')
        } catch(error) {
            res.render('editar', {
                title: 'Editar movimiento',
                error: null,
                editando: false
            })
        }
    } */

    editar: async (req, res) => {
        let movimiento = await Movimiento.findOne({_id: req.params._id})
        res.render('editar', {
            title: 'Editar movimiento',
            error: null,
            editando: movimiento,
            logueado: req.session.logueado, 
            name: req.session.name || ''
        })
    }

    /* editar: async (req, res) => {
        let movimiento = await Movimiento.findOne({_id: req.params._id})
        res.render('editar', {
            title: 'Editar movimiento',
            error: null,
            editando: movimiento
        })
    } */

     // nuevoMovimiento es el que se podría eliminar.
     /* editarMovimiento: (req, res) => {
        res.render('editarMovimiento', {
            title: 'Editar movimiento',
            error: null,
            editando: false
        })
    }, */
}

module.exports = movimientosControllers