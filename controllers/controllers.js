const path = require('path')

const allControllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'))

    },

    balance: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/balance.html'))
    },

    nuevoMovimiento: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/nuevoMovimiento.html'))
    },

    
}

module.exports = allControllers