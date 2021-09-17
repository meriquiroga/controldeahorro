const User = require('../models/User')


const usersControllers = {
    ingresar: (req, res) => {
        res.render('ingresar', {
            title: 'Ingresar',
            error: null,
            logueado: req.session.logueado, 
            name: req.session.name || ''
        })
    },

    crearCuenta: (req, res) => {
        res.render('crear-cuenta', {
            title: 'Crear cuenta',
            error: null,
            logueado: req.session.logueado, 
            name: req.session.name || ''
        })
    },

    ingresarForm: async (req, res) => {
        const {name, email, password} = req.body
        let usuario = await User.findOne({email})
        if (usuario.password === password) {
            req.session.logueado = true
            req.session.name = name
            return res.redirect('/balance')
        }
        res.render('ingresar', {
            title: 'Ingresar',
            error: 'E-mail o contraseña incorrectos'
            /* logueado: req.session.logueado, 
            name: req.session.name || '' */
        })
    },

    crearCuentaForm: async (req, res) => {
        const {name, email, password} = req.body
        await new User({name, email, password}).save()
        req.session.logueado = true
        req.session.name = name
        res.redirect('/balance')
    },

    salir: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}

module.exports = usersControllers