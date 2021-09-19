const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

const usersControllers = {
  ingresar: (req, res) => {
    res.render("ingresar", {
      title: "Ingresar",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      userId: req.session.userId,
    });
  },

  crearCuenta: (req, res) => {
    res.render("crear-cuenta", {
      title: "Crear cuenta",
      error: null,
      logueado: req.session.logueado,
      name: req.session.name,
      userId: req.session.userId,
    });
  },

  ingresarForm: async (req, res) => {
    const { email, password } = req.body;
    try {
      let usuario = await Usuario.findOne({ email });
      if (bcryptjs.compareSync(password, usuario.password)) {
        req.session.logueado = true;
        req.session.name = usuario.name;
        req.session.userId = usuario._id;
        return res.redirect("/balance");
      } else {
         return res.render("ingresar", {
          title: "Ingresar",
          error: "E-mail o contraseña incorrectos",
          logueado: req.session.logueado,
          name: req.session.name,
          userId: req.session.userId,
        });
      }
    } catch (error) {
      alert(error);
    }
  },
  /* ingresarForm: async (req, res) => {
    const { email, password } = req.body;
    try {
      let usuario = await Usuario.findOne({ email });
      if (bcryptjs.compareSync(password, usuario.password)) {
        req.session.logueado = true;
        req.session.name = usuario.name;
        req.session.userId = usuario._id;
        return res.redirect("/balance");
      } else {
         res.render("ingresar", {
          title: "Ingresar",
          error: "E-mail o contraseña incorrectos",
          logueado: req.session.logueado,
          name: req.session.name,
          userId: req.session.userId,
        });
      }
    } catch (error) {
      alert(error);
    }
  }, */

  crearCuentaForm: async (req, res) => {
    const { name, email, password } = req.body;
    let hashedPass = bcryptjs.hashSync(password);
    const nuevoUser = new Usuario({
      name,
      email,
      password: hashedPass,
    });
    try {
      let existeUser = await Usuario.findOne({ email });
      if (!existeUser) {
        let agregarUser = await nuevoUser.save();
        req.session.logueado = true;
        req.session.name = agregarUser.name;
        req.session.userId = agregarUser._id;
        req.session.movimiento = null;
        return res.redirect("/balance");
      } else {
        return res.render("crear-cuenta", {
          title: "Crear cuenta",
          error:
            "E-mail de registro en uso. Por favor, ingresá o creá tu cuenta con uno diferente",
          logueado: req.session.logueado,
          name: req.session.name,
          userId: req.session.userId,
        });
      }
    } catch (error) {
      alert(error);
    }
  },

  salir: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
};

module.exports = usersControllers;
