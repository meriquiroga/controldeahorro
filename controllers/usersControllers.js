const User = require('../models/User')


const usersControllers = {
    ingresar: (req, res) => {
        res.render('ingresar', {
            title: 'Ingresar',
            error: null
        })
    },

    crearCuenta: (req, res) => {
        res.render('crear-cuenta', {
            title: 'Crear cuenta',
            error: null
        })
    },

    ingresarForm: async (req, res) => {
        const {email, password} = req.body
        let usuario = await User.findOne({email})
        if (usuario.password === password) {
        res.redirect('/balance')
        }
        res.render('ingresar', {
            title: 'Ingresar',
            error: 'E-mail o contraseña incorrectos'
        })
    },

    crearCuentaForm: async (req, res) => {
        const {name, email, password} = req.body
        await new User({name, email, password}).save()
        res.redirect('/balance')
    },
}

module.exports = usersControllers