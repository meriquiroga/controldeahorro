const path = require("path");
const Movimiento = require("../models/Movimiento");

const movimientosControllers = {
  home: (req, res) => {
    res.render("index", {
      title: "Home",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      userId: req.session.userId,
    });
  },

  balance: async (req, res) => {
    if (req.session.logueado) {
      try {
        const movimientos = await Movimiento.find({
          userId: req.session.userId,
        });
        return res.render("balance", {
          title: "Balance",
          movimientos,
          error: null,
          logueado: req.session.logueado,
          name: req.session.name,
          userId: req.session.userId,
        });
      } catch (error) {
        alert(error);
      }
    }
    return res.redirect("/crear-cuenta");
  },
  
  /* balance: async (req, res) => {
    if (req.session.logueado) {
      try {
        const movimientos = await Movimiento.find({
          userId: req.session.userId,
        });
        res.render("balance", {
          title: "Balance",
          movimientos,
          error: null,
          logueado: req.session.logueado,
          name: req.session.name,
          userId: req.session.userId,
        });
      } catch (error) {
        alert(error);
      }
    }
    res.redirect("/crear-cuenta");
  }, */

  guardarMovimiento: async (req, res) => {
    const { date, description, number, userId } = req.body;
    let newMovimiento = new Movimiento({
      date,
      description,
      number,
      userId,
    });
    try {
      await newMovimiento.save();
      res.redirect("/balance");
      
    } catch (error) {
      res.render("editar", {
        title: "Editar movimiento",
        error: error,
        logueado: req.session.logueado,
        name: req.session.name,
        userId: req.session.userId,
      });
    }
  },

  eliminar: async (req, res) => {
    await Movimiento.findOneAndDelete({ _id: req.params._id });
    res.redirect("/balance");
  },
  
  editar: async (req, res) => {
    try {
        let movimiento = await Movimiento.findOne({ _id: req.params._id });
        res.render("editar", {
            title: "Editar movimiento",
            error: null,
            logueado: req.session.logueado,
            name: req.session.name,
            userId: req.session.userId,
            movimientoId: req.params._id,
            movimiento
       });
    } catch(error) {
      console.log(error, 'Soy el error del editar')
    }
  },

  guardarEditado: async (req, res) => {
    await Movimiento.findOneAndUpdate({ _id: req.params._id }, { ...req.body }, { new: true });
    res.redirect("/balance");
  },

};

module.exports = movimientosControllers;
