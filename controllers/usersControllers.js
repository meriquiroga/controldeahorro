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
  },

  // Andando hasta hasheo de password
  /* ingresarForm: async (req, res) => {
        const {email, password} = req.body
        let usuario = await Usuario.findOne({email})
        if (usuario.password === password) {
            req.session.logueado = true
            req.session.name = usuario.name
            req.session.userId = usuario._id 
            return res.redirect('/balance')
        }
        console.log(usuario.name)
        console.log(usuario._id)
        res.render('ingresar', {
            title: 'Ingresar',
            error: 'E-mail o contraseña incorrectos',
            logueado: req.session.logueado, 
            name: req.session.name,
            userId: req.session.userId
        })
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
        return res.redirect("/balance");
      } else {
        res.render("crear-cuenta", {
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

  /* addUser: async (req, res) => {
        const { name, surname, email, password, img, country, google } = req.body;
        let hashedPass = bcryptjs.hashSync(password);
        const userInfo = new User({
          name,
          surname,
          email,
          password: hashedPass,
          img,
          country,
          google,
        });
        try {
          let userExists = await User.findOne({ email: email });
          if (userExists)
            throw new Error(
              "Sign up e-mail already in use, please try again with a different one."
            );
          await userInfo.save();
          const token = jwt.sign({ ...userInfo }, process.env.SECRETORKEY);
          res.json({
            success: true,
            response: { name: userInfo.name, img: userInfo.img, token },
            error: null,
          });
        } catch (error) {
          res.json({ success: false, response: null, error: error.message });
        } //de acá sale el error de conexión de back y bd.
      }, */

  // Anda sin loguear
  /* crearCuentaForm: async (req, res) => {
        const {name, email, password} = req.body
        await new Usuario({name, email, password}).save()
        req.session.logueado = true
        req.session.name = name
        res.redirect('/balance')
    }, */

  salir: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
};

module.exports = usersControllers;
