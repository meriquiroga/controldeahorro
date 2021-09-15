const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO)
.then(() => console.log("DB connected"))
.catch(error => console.log(error))