require('./config/config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


//se importa y utiliza las rutas para usuario
app.use(require('./routes/usuario'));


mongoose.connect(process.env.URLBD, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex : true }, (error, res) => {
    if(error) throw error;

    console.log("DB online");
});

  app.listen(process.env.PORT, () => {
      console.log("escuchando puerto: ", 3000);
  });